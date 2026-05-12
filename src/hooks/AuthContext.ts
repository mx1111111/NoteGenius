import { createContext } from "react";
import type { User } from "../types";

export interface AuthContextValue {
  user: User | null;
  accounts: User[];
  login: (name: string, password: string) => boolean;
  register: (name: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
