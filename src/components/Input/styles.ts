import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: colors.gray[800],
    paddingHorizontal: 16,
    gap: 12,
  },
  textInput: {
    height: "100%",
    flex: 1,
    color: colors.gray[100],
    fontSize: 14,
  },
});
