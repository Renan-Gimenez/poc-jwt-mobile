import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import { Home, Login } from "@/screens";

const AuthenticatedApp = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Home /> : <Login />;
};

export default function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}
