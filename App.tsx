import { View } from "react-native";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Routes from "@/routes";
import { colors } from "@/styles/colors";

import { Home } from "@/screens";

const AuthenticatedApp = () => {
  const { isAuthenticated } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: colors.gray[900] }}>
      {isAuthenticated ? <Home /> : <Routes />}
    </View>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}
