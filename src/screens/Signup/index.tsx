import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";

import { Button, Input } from "@/components";
import { useState } from "react";
import { colors } from "@/styles/colors";
import { useAuth } from "@/contexts/AuthContext";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const { signup } = useAuth();

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      Keyboard.dismiss();

      if (
        !username.trim() ||
        !email.trim() ||
        !password.trim() ||
        !confirmpassword.trim()
      ) {
        throw Error("Preencha todos os campos");
      }

      if (password !== confirmpassword) {
        throw Error("As senhas precisam ser iguais");
      }

      await signup({
        username: username,
        email: email,
        password: password,
      });
    } catch (error: any) {
      alert(error.message);
      console.log("Erro ao fazer login", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ marginBottom: 40, alignItems: "center" }}>
          <Text style={styles.title}>Crie uma conta</Text>
          <Text style={styles.subtitle}>Faça login e comece a usar!</Text>
        </View>

        <View style={{ width: "80%", gap: 16 }}>
          <View style={{ gap: 12 }}>
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
            <Input>
              <Feather name="mail" size={24} color={colors.gray[400]} />
              <Input.Field
                value={email}
                keyboardType="email-address"
                placeholder="Digite seu email"
                onChangeText={setEmail}
              />
            </Input>
          </View>

          <View style={{ gap: 12 }}>
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

          <View style={{ gap: 12 }}>
            <Input>
              <Feather name="lock" size={24} color={colors.gray[400]} />
              <Input.Field
                value={confirmpassword}
                placeholder="Confirme sua senha"
                secureTextEntry={!isConfirmPasswordVisible}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
                }}
              >
                <Feather
                  name={isConfirmPasswordVisible ? "eye" : "eye-off"}
                  size={24}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            </Input>
          </View>

          <View
            style={{
              marginTop: 16,
            }}
          >
            <Button
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
              onPress={handleSignup}
            >
              <Button.Title>Criar Conta</Button.Title>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
