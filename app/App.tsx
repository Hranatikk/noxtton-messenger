import React from "react"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ChatScreen } from "./screens"

export default function App() {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <ChatScreen />
      </KeyboardProvider>
    </SafeAreaProvider>
  )
}
