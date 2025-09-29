import React, { useEffect, useState } from "react"
import { usePear, type Msg } from "../../../core/services"
import Component, { type Mode } from "./ChatScreen.component"

const Container = () => {
  const pear = usePear()

  const [mode, setMode] = useState<Mode>("idle")
  const [username, setUsername] = useState("")
  const [publicKey, setPublicKey] = useState("")
  const [remoteKey, setRemoteKey] = useState("")
  const [messages, setMessages] = useState<Msg[]>([])
  const [text, setText] = useState("")

  useEffect(() => {
    const off = pear.on(e => {
      if (e.type === "connected") setMode("connected")
      if (e.type === "disconnected") setMode("ready")
      if (e.type === "message") setMessages(m => [...m, e.payload])
      if (e.type === "error") console.warn("PE error:", e.payload)
    })

    return off
  }, [pear])

  const onUsernameSubmit = () => {
    setMode("ready")
  }

  const onHost = async () => {
    const { publicKey } = await pear.host()
    setPublicKey(publicKey)
    setMode("hosting")
  }

  const onJoin = async () => {
    const key = remoteKey.trim()
    if (!key) return

    await pear.connect(key)
  }

  const onSend = async () => {
    const t = text.trim()
    if (!t) return

    const msg: Msg = {
      author: username,
      id: `${Date.now()}`,
      text: t,
      ts: Date.now(),
    }

    setText("")
    setMessages(m => [...m, msg])
    await pear.sendMessage(msg)
  }

  return (
    <Component
      messages={messages}
      mode={mode}
      publicKey={publicKey}
      remoteKey={remoteKey}
      text={text}
      username={username}
      onChangeRemoteKey={setRemoteKey}
      onChangeText={setText}
      onChangeUsername={setUsername}
      onHost={onHost}
      onJoin={onJoin}
      onSend={onSend}
      onUsernameSubmit={onUsernameSubmit}
    />
  )
}

export default Container
