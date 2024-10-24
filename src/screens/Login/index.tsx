import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Input } from "@/components";

import { styles } from "./styles";

import { Feather } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [username, setUsername] = useState("renan");
  const [password, setPassword] = useState("senha123");

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      Keyboard.dismiss();

      if (!username.trim() || !password.trim()) {
        throw Error("Preencha todos os campos");
      }

      console.log({ username, password });

      await login({ username: username, password: password });
    } catch (error: any) {
      alert(error.message);
      console.log("Erro ao efetuar login:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ marginBottom: 40, alignItems: "center" }}>
          <Text style={styles.title}>Login JWT</Text>
          <Text style={styles.subtitle}>Faça login e comece a usar!</Text>
        </View>

        <View style={{ width: "80%", gap: 16 }}>
          <View style={{ gap: 12 }}>
            <Text style={styles.label}>Usuário</Text>
            <Input>
              <Feather name="user" size={24} color={colors.gray[400]} />
              <Input.Field
                value={username}
                placeholder="Digite seu usuário"
                onChangeText={setUsername}
              />
            </Input>
          </View>

          <View style={{ gap: 12 }}>
            <Text style={styles.label}>Senha</Text>
            <Input>
              <Feather name="lock" size={24} color={colors.gray[400]} />
              <Input.Field
                value={password}
                placeholder="Digite sua senha"
                secureTextEntry={!isPasswordVisible}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setIsPasswordVisible(!isPasswordVisible);
                }}
              >
                <Feather
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={24}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            </Input>
          </View>

          <Button
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading}
            onPress={handleLogin}
          >
            <Button.Title>Entrar</Button.Title>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
