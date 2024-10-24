import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: colors.gray[800],
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  textInput: {
    flex: 1,
    color: colors.gray[100],
    fontSize: 14,
  },
});
