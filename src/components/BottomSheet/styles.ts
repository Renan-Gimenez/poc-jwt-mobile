import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  backgroundStyle: { backgroundColor: colors.gray[800] },
  handleIndicatorStyle: { backgroundColor: colors.gray[400] },
  bottomSheetView: { flex: 1, alignItems: "center", padding: 16 },
});

// export const styles = () => {
//   return StyleSheet.create({});
// };
