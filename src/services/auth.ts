import { api } from "./api";

interface LoginProps {
  username: string;
  password: string;
}

interface RequestProps {
  token: string;
  user: any;
}

export const loginRequest = async ({ username, password }: LoginProps) => {
  try {
    const response = await api.post<RequestProps>("/login", {
      username,
      password,
    });

    return {
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw Error(error.response.data.message);
    } else {
      console.error(error.message);
    }
  }
};
