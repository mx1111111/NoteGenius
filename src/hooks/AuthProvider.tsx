import { useMemo, useCallback } from "react";
import type { ReactNode } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { User } from "../types";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>("notegenius-user", null);
  const [accounts, setAccounts] = useLocalStorage<User[]>(
    "notegenius-accounts",
    [],
  );

  const login = useCallback(
    (name: string, password: string) => {
      const existingAccount = accounts.find(
        (account) => account.name === name && account.password === password,
      );

      if (!existingAccount) {
        return false;
      }

      setUser(existingAccount);
      return true;
    },
    [accounts, setUser],
  );

  const register = useCallback(
    (name: string, password: string) => {
      const existingAccount = accounts.find((account) => account.name === name);

      if (existingAccount) {
        return false;
      }

      const newAccount: User = { name, password };
      setAccounts((prev) => [...prev, newAccount]);
      setUser(newAccount);
      return true;
    },
    [accounts, setAccounts, setUser],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  // Stable value object — only changes when dependencies actually change
  const value = useMemo(
    () => ({
      user,
      accounts,
      login,
      register,
      logout,
      isAuthenticated: user !== null,
    }),
    [user, accounts, login, register, logout], // login/register/logout are stable via useCallback
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}