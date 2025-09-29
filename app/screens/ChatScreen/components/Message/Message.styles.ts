import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  msg: {
    alignSelf: "flex-start",
    backgroundColor: "#168AFF",
    borderRadius: 8,
    color: "white",
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  msgRight: {
    alignSelf: "flex-end",
  },
  ownMessage: {
    backgroundColor: "#00B2FF",
  },

  msgAuthor: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  msgText: {
    color: "#FFFFFF",
    fontSize: 16,
    paddingVertical: 6,
  },

  msgTs: {
    color: "#FFFFFF",
    fontSize: 10,
    opacity: 0.5,
  },
})
