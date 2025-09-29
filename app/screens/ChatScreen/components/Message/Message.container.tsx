import React from "react"
import { Text, View } from "react-native"
import type { Msg } from "../../../../../core/services"
import { styles } from "./Message.styles"

type Props = {
  message: Msg
  username: string
}

const Container = ({ message, username }: Props) => {
  const isMessageOwner = message.author === username

  return (
    <View
      style={[
        styles.msg,
        isMessageOwner && [styles.msgRight, styles.ownMessage],
      ]}
    >
      <Text style={[styles.msgAuthor, isMessageOwner && styles.msgRight]}>
        {isMessageOwner ? "You" : message.author}
      </Text>

      <Text style={[styles.msgText, isMessageOwner && styles.msgRight]}>
        {message.text}
      </Text>

      <Text style={[styles.msgTs, isMessageOwner && styles.msgRight]}>
        {new Date(message.ts).toLocaleTimeString()}
      </Text>
    </View>
  )
}

export default Container
