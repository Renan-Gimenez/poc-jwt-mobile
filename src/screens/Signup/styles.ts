import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[900],

    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.gray[100],
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    color: colors.gray[400],
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray[100],
  },
  createAccountSpam: {
    color: colors.gray[400],
    textDecorationLine: "underline",

    marginTop: 24,

    fontWeight: "400",
    fontSize: 14,

    textAlign: "center",
  },
  linkText: {
    color: colors.gray[400],
    marginTop: 16,
  },
  link: {
    color: colors.cyan[500],
    fontWeight: "bold",
  },
});
