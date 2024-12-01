import { createContext, ReactNode, useContext, useRef } from "react";
import { Pressable, TextInput, TextInputProps, View } from "react-native";

import { colors } from "@/styles/colors";

import { styles } from "./styles";

interface inputProps {
  children: ReactNode;
}

const InputContext = createContext<{ inputRef: any }>({ inputRef: null });

function Input({ children }: inputProps) {
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        inputRef.current?.focus();
      }}
    >
      <InputContext.Provider value={{ inputRef }}>
        {children}
      </InputContext.Provider>
    </Pressable>
  );
}

function Field({ ...rest }: TextInputProps) {
  const { inputRef } = useContext(InputContext);

  return (
    <TextInput
      ref={inputRef}
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
