import React from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import { IconSend } from "@tabler/icons-react-native"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { styles } from "./MessageField.styles"

type Props = {
  text: string
  onChangeText: (v: string) => void
  onSend: () => void
}

const Container = ({ text, onChangeText, onSend }: Props) => {
  const isSendButtonEnabled = text.length > 0
  const { bottom } = useSafeAreaInsets()

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
      keyboardVerticalOffset={0}
      style={styles.container}
    >
      <View style={[styles.row, { paddingBottom: bottom === 0 ? 24 : bottom }]}>
        <TextInput
          placeholder="Type message"
          style={styles.input}
          value={text}
          onChangeText={onChangeText}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!isSendButtonEnabled}
          style={[
            styles.sendButton,
            isSendButtonEnabled && styles.activeSendButton,
          ]}
          onPress={onSend}
        >
          <IconSend color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Container
