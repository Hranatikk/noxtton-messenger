import { useEffect, useMemo } from "react"
import b4a from "b4a"
import RPC from "bare-rpc"
import { Worklet } from "react-native-bare-kit"
import bundle from "../../app.bundle.mjs"
import {
  EVT_CONNECTED,
  EVT_DISCONNECTED,
  EVT_ERROR,
  EVT_MESSAGE,
  RPC_CONNECT,
  RPC_EVENT,
  RPC_HOST,
  RPC_SEND,
} from "../../rpc-commands.mjs"

export type Msg = { author: string; id: string; text: string; ts: number }

export type PearEvent =
  | { type: "connected" }
  | { type: "disconnected" }
  | { payload: Msg; type: "message" }
  | { payload: { detail?: string; message?: string }; type: "error" }

type Listener = (e: PearEvent) => void

export class PearClient {
  private worklet: Worklet
  private rpc: RPC
  private listeners = new Set<Listener>()

  constructor(args: string[] = []) {
    this.worklet = new Worklet()
    this.worklet.start("/app.bundle", bundle, args)

    const { IPC } = this.worklet
    this.rpc = new RPC(IPC, req => {
      if (req.command !== RPC_EVENT) return

      try {
        if (!req.data) {
          this.emit({
            payload: { detail: "", message: "bad event" },
            type: "error",
          })

          return
        }

        const { payload, type } = JSON.parse(b4a.toString(req.data))
        switch (type) {
          case EVT_CONNECTED:
            this.emit({ type: "connected" })
            break
          case EVT_DISCONNECTED:
            this.emit({ type: "disconnected" })
            break
          case EVT_MESSAGE:
            this.emit({ payload, type: "message" })
            break
          case EVT_ERROR:
            this.emit({ payload, type: "error" })
            break
        }
      } catch (e) {
        this.emit({
          payload: { detail: String(e), message: "bad event" },
          type: "error",
        })
      }
    })
  }

  on(cb: Listener): () => void {
    this.listeners.add(cb)

    return () => this.listeners.delete(cb)
  }

  private emit(e: PearEvent) {
    for (const l of this.listeners) l(e)
  }

  async host(): Promise<{ publicKey: string }> {
    const req = this.rpc.request(RPC_HOST)
    req.send()
    const reply = await req.reply()

    return JSON.parse(b4a.toString(reply as Buffer))
  }

  async connect(publicKeyHex: string): Promise<void> {
    const req = this.rpc.request(RPC_CONNECT)

    req.send(b4a.from(publicKeyHex))
    await req.reply()
  }

  async sendMessage(msg: Msg): Promise<void> {
    const req = this.rpc.request(RPC_SEND)

    req.send(b4a.from(JSON.stringify(msg)))
    await req.reply()
  }

  // @TODO stop worklet
}

export function usePear(args: string[] = []) {
  const client = useMemo(() => new PearClient(args), [])

  useEffect(() => {
    return () => {
      // @TODO stop client
    }
  }, [client])

  return client
}
