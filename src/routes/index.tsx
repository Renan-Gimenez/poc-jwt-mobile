import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./stack.routes";

export default function Routes() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
