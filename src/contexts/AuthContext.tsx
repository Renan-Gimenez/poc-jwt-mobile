import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginRequest, signupRequest } from "../services/auth";
import { deleteToken, getToken, saveToken } from "@/services/storage";
import { api } from "@/services/api";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  isGettingToken: boolean;
  user: any;
  login: ({
    username,
    password,
  }: {
    username: any;
    password: string;
  }) => Promise<void>;
  signup: ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
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

  const [isGettingToken, setIsGettingToken] = useState(true);

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
      await saveToken(response.token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro desconhecido");
      }
    }
  };

  const signup = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await signupRequest({ username, email, password });

      if (!response?.user) {
        throw new Error("Resposta do servidor inválida");
      }

      setUser(response.user);
      await saveToken(response.token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw Error(error.message);
      } else {
        throw Error("Erro desconhecido ao realizar o cadastro");
      }
    }
  };

  const logout = async () => {
    try {
      await deleteToken();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const recoverUser = async (token: string) => {
    try {
      const response = await api.get("/recover-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro desconhecido ao recuperar o usuário pelo token");
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setIsGettingToken(true);

        const token = await getToken();

        if (!token) {
          return console.log("Token não encontrado");
        }

        await recoverUser(token);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error);
        } else {
          console.error("Erro desconhecido ao recuperar o usuário");
        }
      } finally {
        setIsGettingToken(false);
      }
    })();
  }, []);

  const value = {
    isAuthenticated,
    isGettingToken,
    user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
