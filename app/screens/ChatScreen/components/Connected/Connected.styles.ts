import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    bottom: 0,
    flex: 1,
    position: "absolute",
    width: "100%",
  },
  input: {
    borderColor: "#ddd",
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    height: 44,
    paddingHorizontal: 12,
    width: "80%",
  },
  row: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    width: "100%",
  },
})
