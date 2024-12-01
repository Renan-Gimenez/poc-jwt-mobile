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

import { z, ZodError } from "zod";

import { Button, Input } from "@/components";
import { useRef, useState } from "react";
import { colors } from "@/styles/colors";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "@react-navigation/native";

import BottomSheet from "@gorhom/bottom-sheet";

import { BottomSheetComponent } from "@/components/BottomSheet";

const signupSchema = z
  .object({
    username: z
      .string()
      .min(4, "O campo 'usuário' precisa ter pelo menos 4 caracteres")
      .max(20, "O campo 'usuário' não pode exceder 20 caracteres")
      .trim()
      .regex(
        /^[a-z0-9_.]+$/,
        "O campo 'usuário' só pode conter letras minúsculas, números, '_' e '.'"
      ),

    email: z.string().email("Formato de email inválido").trim(),

    password: z
      .string()
      .min(6, "A senha precisa ter pelo menos 6 caracteres")
      .max(100, "A senha não pode exceder 100 caracteres"),

    confirmpassword: z.string({ required_error: "Confirme sua senha" }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmpassword"],
  });

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const { signup } = useAuth();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      Keyboard.dismiss();

      signupSchema.parse({
        username: username,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
      });

      await signup({
        username: username,
        email: email,
        password: password,
      });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        setErrorMessage(error.errors[0].message);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      }
      console.log("Erro ao fazer login", error);
    } finally {
      bottomSheetRef.current?.expand();
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View
          style={{
            width: "90%",
            marginBottom: 40,
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>Crie uma conta</Text>
          <Text style={styles.subtitle}>
            Preencha seus dados e comece a explorar!
          </Text>
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

        <Text style={styles.linkText}>
          Já possui uma conta?{" "}
          <Link to="/login" style={styles.link}>
            Faça login
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
              Erro ao criar conta
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
