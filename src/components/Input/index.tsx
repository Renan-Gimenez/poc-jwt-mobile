import { ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";

import { colors } from "@/styles/colors";

import { styles } from "./styles";

interface inputProps {
  children: ReactNode;
}

function Input({ children }: inputProps) {
  return <View style={styles.container}>{children}</View>;
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      autoCorrect={false}
      style={styles.textInput}
      placeholderTextColor={colors.gray[400]}
      autoCapitalize="none"
      {...rest}
    />
  );
}

Input.Field = Field;

export { Input };
