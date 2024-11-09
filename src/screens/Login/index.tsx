import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Input } from "@/components";

import { styles } from "./styles";

import { Feather } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Link } from "@react-navigation/native";

import { BottomSheetComponent } from "@/components/BottomSheet";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login, isGettingToken } = useAuth();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      Keyboard.dismiss();

      if (!username.trim() || !password.trim()) {
        throw Error("Preencha todos os campos");
      }

      console.log({ username, password });

      await login({ username: username, password: password });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Erro inesperado ao fazer login");
        console.log("Erro ao efetuar login:", error);
      }
    } finally {
      bottomSheetRef.current?.expand();
      setIsLoading(false);
    }
  };

  if (isGettingToken) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.gray[900],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={"white"} />
      </View>
    );
  }

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

        <Text style={styles.linkText}>
          Não possui uma conta?{" "}
          <Link to="/signup" style={styles.link}>
            Registre-se
          </Link>
        </Text>

        <BottomSheetComponent ref={bottomSheetRef}>
          <Feather name="alert-circle" size={64} color={colors.gray[400]} />

          <View
            style={{
              flex: 1,
              alignItems: "center",
              gap: 6,
              marginVertical: 24,
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>
              Erro ao fazer login
            </Text>
            <Text style={{ color: colors.gray[400] }}>
              {errorMessage || "Empty"}
            </Text>
          </View>

          <View style={{ width: "80%" }}>
            <Button
              variant="secondary"
              onPress={() => {
                bottomSheetRef.current?.close();
              }}
            >
              <Button.Title style={{ color: "red" }}>Fechar</Button.Title>
            </Button>
          </View>
        </BottomSheetComponent>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
