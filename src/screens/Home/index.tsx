import { Button as RNButton, Text, View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { styles } from "./styles";

// import { SafeAreaView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/colors";

import { Feather } from "@expo/vector-icons";

import { Button } from "@/components";

export function Home() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: colors.cyan[300] }}>Home Screen</Text>

      <Text
        style={{ color: colors.cyan[300] }}
      >{`Username: ${user?.username}`}</Text>
      <Text style={{ color: colors.cyan[300] }}>{`Email: ${user?.email}`}</Text>

      <Button onPress={logout}>
        <Feather name="log-out" color="black" size={24} />
        <Button.Title>Logout</Button.Title>
      </Button>
    </SafeAreaView>
  );
}
