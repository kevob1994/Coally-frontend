import { IUser } from "@interfaces/user.interface";
import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string): IUser | null => {
  try {
    const decoded = jwtDecode<IUser>(token);

    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };

    return null;
  } catch {
    throw new Error("An error occurred while encoding");
  }
};
