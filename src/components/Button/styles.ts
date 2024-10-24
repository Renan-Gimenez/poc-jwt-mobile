import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    minHeight: 46,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.cyan[500],
  },
  secondary: {
    borderWidth: 2,
    padding: 2,
    borderColor: colors.cyan[500],
  },
  tertiary: {},
});
