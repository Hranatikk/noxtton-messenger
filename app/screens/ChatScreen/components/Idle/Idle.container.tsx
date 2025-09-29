import React from "react"
import { Button, TextInput, View } from "react-native"
import { styles } from "./Idle.styles"

type Props = {
  username: string
  onChangeUsername: (n: string) => void
  onUsernameSubmit: () => void
}

const Container = ({ username, onChangeUsername, onUsernameSubmit }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          autoCapitalize="none"
          placeholder="Enter displayed username"
          style={styles.input}
          value={username}
          onChangeText={onChangeUsername}
        />

        <Button title="Submit" onPress={onUsernameSubmit} />
      </View>
    </View>
  )
}

export default Container
