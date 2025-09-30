import React from "react"
import { FlatList } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { SafeAreaView } from "react-native-safe-area-context"
import type { Msg } from "../../../core/services"
import { styles } from "./ChatScreen.styles"
import { Host, Idle, Message, MessageField, Ready } from "./components"

export type Mode = "idle" | "ready" | "hosting" | "connected"

type Props = {
  messages: Msg[]
  mode: Mode
  publicKey: string
  remoteKey: string
  text: string
  username: string
  onChangeRemoteKey: (v: string) => void
  onChangeText: (v: string) => void
  onChangeUsername: (n: string) => void
  onHost: () => void
  onJoin: () => void
  onSend: () => void
  onUsernameSubmit: () => void
}

const Component = ({
  messages,
  mode,
  publicKey,
  remoteKey,
  text,
  username,
  onChangeRemoteKey,
  onChangeText,
  onChangeUsername,
  onHost,
  onJoin,
  onSend,
  onUsernameSubmit,
}: Props) => {
  const renderItem = ({ item }: { item: Msg }) => (
    <Message message={item} username={username} />
  )

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      {mode === "idle" && (
        <Idle
          username={username}
          onChangeUsername={onChangeUsername}
          onUsernameSubmit={onUsernameSubmit}
        />
      )}

      {mode === "ready" && (
        <Ready
          remoteKey={remoteKey}
          onChangeRemoteKey={onChangeRemoteKey}
          onHost={onHost}
          onJoin={onJoin}
        />
      )}

      {mode === "hosting" && <Host publicKey={publicKey} />}

      {mode === "connected" && (
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={messages}
          keyExtractor={m => m.id}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          renderItem={renderItem}
          renderScrollComponent={props => (
            <KeyboardAwareScrollView {...props} />
          )}
        />
      )}

      {mode === "connected" && (
        <MessageField text={text} onChangeText={onChangeText} onSend={onSend} />
      )}
    </SafeAreaView>
  )
}

export default Component
