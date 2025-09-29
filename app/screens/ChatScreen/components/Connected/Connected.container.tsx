import React from "react"
import { Button, TextInput, View } from "react-native"
import { styles } from "./Connected.styles"

type Props = {
  text: string
  onChangeText: (v: string) => void
  onSend: () => void
}

const Container = ({ text, onChangeText, onSend }: Props) => {
  return (
    <View style={styles.row}>
      <TextInput
        placeholder="Type message"
        style={styles.input}
        value={text}
        onChangeText={onChangeText}
      />

      <Button title="Send" onPress={onSend} />
    </View>
  )
}

export default Container
