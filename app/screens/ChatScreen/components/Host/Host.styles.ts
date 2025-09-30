import { Platform, StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  keyBox: {
    borderColor: "#ccc",
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 6,
    padding: 8,
  },
  mono: {
    fontFamily: Platform.select({ android: "monospace", ios: "Menlo" }),
  },
})
