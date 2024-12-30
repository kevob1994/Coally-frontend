import apiInstance from "./config-api";

export const loginService = async (credentials: {
  email: string;
  password: string;
}): Promise<{ token: string }> => {
  const response = await apiInstance.post("/auth/login", credentials);
  return response.data;
};
