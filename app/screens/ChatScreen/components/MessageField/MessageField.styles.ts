import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  activeSendButton: {
    backgroundColor: "#00B2FF",
  },
  container: {
    bottom: 0,
    flex: 1,
    position: "absolute",
    width: "100%",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
  },
  row: {
    alignItems: "center",
    backgroundColor: "#E5E4E2",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    padding: 16,
  },
  sendButton: {
    alignItems: "center",
    backgroundColor: "#A9A9A9",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
})
