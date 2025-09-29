import React from "react"
import { Button, TextInput, View } from "react-native"
import { styles } from "./Ready.styles"

type Props = {
  remoteKey: string
  onChangeRemoteKey: (v: string) => void
  onHost: () => void
  onJoin: () => void
}

const Container = ({ remoteKey, onChangeRemoteKey, onHost, onJoin }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button title="Host" onPress={onHost} />

        <TextInput
          autoCapitalize="none"
          placeholder="Enter host key"
          style={styles.input}
          value={remoteKey}
          onChangeText={onChangeRemoteKey}
        />

        <Button title="Join" onPress={onJoin} />
      </View>
    </View>
  )
}

export default Container
