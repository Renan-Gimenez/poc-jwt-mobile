import { createContext, ReactNode, useContext } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { styles, variantStyles } from "./styles";
import { colors } from "@/styles/colors";

type Variants = "primary" | "secondary" | "tertiary";

interface VariantContextProps {
  variant?: Variants;
}

const VariantContext = createContext<VariantContextProps>({});

interface ButtonProps extends TouchableOpacityProps {
  variant?: Variants;
  isLoading?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

function Button({
  variant = "primary",
  isLoading,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading || disabled}
      style={[
        styles.container,
        variantStyles[variant],
        { opacity: disabled ? 0.7 : 1 },
      ]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={"white"} />
      ) : (
        <VariantContext.Provider value={{ variant }}>
          {children}
        </VariantContext.Provider>
      )}
    </TouchableOpacity>
  );
}

function Title({ children }: any) {
  const { variant } = useContext(VariantContext);

  return (
    <Text
      style={[
        styles.title,
        { color: variant === "primary" ? colors.black : colors.cyan[500] },
      ]}
    >
      {children}
    </Text>
  );
}

Button.Title = Title;

export { Button };
