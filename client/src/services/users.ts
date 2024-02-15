import customAxios from "./customAxios";

type UserRes = {
  id: number;
  name: string;
  email: string;
};
export const getMyInfo = async () => {
  try {
    const { data: userRes } = await customAxios.get<UserRes>("/users/myinfo");
    return userRes;
  } catch (err) {
    return null;
  }
};

type LoginRes = {
  accessToken: string;
};
export const login = async (email: string, password: string) =>
  await customAxios.post<LoginRes>("/auth/login", {
    email,
    password,
  });

type RegisterRes = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
export const register = async (name: string, email: string, password: string) =>
  await customAxios.post<RegisterRes>("/users/register", {
    name,
    email,
    password,
  });
