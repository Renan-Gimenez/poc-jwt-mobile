import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

export const saveToken = async (token: string) => {
  try {
    await setItemAsync("jwt-auth-token", token);
  } catch (error) {
    console.error("Erro ao salvar item", error);
  }
};

export const getToken = async () => {
  try {
    const token = await getItemAsync("jwt-auth-token");
    return token;
  } catch (error) {
    console.error("Erro ao buscar token", error);
  }
};

export const deleteToken = async () => {
  try {
    await deleteItemAsync("jwt-auth-token");
  } catch (error) {
    console.error("Erro ao remover token", error);
  }
};
