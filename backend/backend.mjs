import b4a from "b4a"
import RPC from "bare-rpc"
import DHT from "hyperdht"
import {
  EVT_CONNECTED,
  EVT_DISCONNECTED,
  EVT_ERROR,
  EVT_MESSAGE,
  RPC_CONNECT,
  RPC_EVENT,
  RPC_HOST,
  RPC_SEND,
} from "../rpc-commands.mjs"

const { IPC } = BareKit

const rpc = new RPC(IPC, onRequest)
const dht = new DHT()

let server = null
let keyPair = null
let conn = null

function sendEvent(type, payload) {
  try {
    const req = rpc.request(RPC_EVENT)
    req.send(b4a.from(JSON.stringify({ payload, type })))
  } catch (err) {
    console.warn(err)
  }
}

function safeCloseConn() {
  if (conn) {
    try {
      conn.destroy()
    } catch {}
    conn = null
  }
  sendEvent(EVT_DISCONNECTED, null)
}

let rxBuf = ""

function onConnData(chunk) {
  rxBuf += b4a.toString(chunk)
  let idx
  while ((idx = rxBuf.indexOf("\n")) !== -1) {
    const line = rxBuf.slice(0, idx)
    rxBuf = rxBuf.slice(idx + 1)
    if (!line) continue
    try {
      const msg = JSON.parse(line)
      sendEvent(EVT_MESSAGE, msg)
    } catch (e) {
      sendEvent(EVT_ERROR, { detail: String(e), message: "bad json" })
    }
  }
}

function wireConnection(c) {
  safeCloseConn()
  conn = c
  conn.once("close", () => safeCloseConn())
  conn.on("data", onConnData)
  sendEvent(EVT_CONNECTED, null)
}

async function onRequest(req) {
  try {
    if (req.command === RPC_HOST) {
      keyPair = DHT.keyPair()
      server = dht.createServer(c => {
        if (conn) {
          c.destroy()

          return
        }
        wireConnection(c)
      })

      await server.listen(keyPair)

      const pub = b4a.toString(keyPair.publicKey, "hex")
      req.reply(b4a.from(JSON.stringify({ publicKey: pub })))

      Pear.teardown(() => {
        try {
          server.close()
        } catch {}
      })

      return
    }

    if (req.command === RPC_CONNECT) {
      const keyHex = b4a.toString(req.data)
      const publicKey = b4a.from(keyHex, "hex")
      const c = dht.connect(publicKey)

      c.once("open", () => wireConnection(c))
      c.once("error", e =>
        sendEvent(EVT_ERROR, { detail: String(e), message: "connect error" })
      )
      req.reply()

      return
    }

    if (req.command === RPC_SEND) {
      if (!conn) {
        req.reply(b4a.from("no-conn"))

        return
      }
      conn.write(req.data)
      conn.write(b4a.from("\n"))
      req.reply()

      return
    }

    req.reply(b4a.from("unknown"))
  } catch (e) {
    sendEvent(EVT_ERROR, { detail: String(e), message: "rpc error" })
    try {
      req.reply(b4a.from("error"))
    } catch {}
  }
}
