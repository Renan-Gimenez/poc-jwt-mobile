import { api } from "./api";

interface LoginProps {
  username: string;
  password: string;
}

interface LoginRequestProps {
  token: string;
  user: any;
}

interface SignupProps {
  username: string;
  email: string;
  password: string;
}

interface SignupRequestProps {
  token: string;
  user: any;
}

export const loginRequest = async ({ username, password }: LoginProps) => {
  try {
    const response = await api.post<LoginRequestProps>("/login", {
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

export const signupRequest = async ({
  username,
  email,
  password,
}: SignupProps) => {
  try {
    const response = await api.post<SignupRequestProps>("/create-user", {
      username,
      password,
      email,
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
