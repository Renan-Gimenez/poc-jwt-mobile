import { createContext, ReactNode, useContext, useState } from "react";
import { loginRequest } from "../services/auth";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: any;
  login: ({
    username,
    password,
  }: {
    username: any;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await loginRequest({ username, password });
      console.log({ response });

      if (!response?.user) {
        throw new Error("Resposta do servidor inválida");
      }

      setUser(response.user);
    } catch (error: any) {
      throw Error(error.message);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
