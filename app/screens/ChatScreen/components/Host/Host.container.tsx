import React from "react"
import { Text, View } from "react-native"
import { styles } from "./Host.styles"

type Props = {
  publicKey: string
}

const Container = ({ publicKey }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mono}>Your public key (share it):</Text>

      <Text selectable style={[styles.mono, styles.keyBox]}>
        {publicKey}
      </Text>

      <Text>Waiting for peer to connect…</Text>
    </View>
  )
}

export default Container
