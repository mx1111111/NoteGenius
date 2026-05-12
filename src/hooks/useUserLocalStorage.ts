import { useMemo } from "react";
import { useAuth } from "./useAuth";
import { useLocalStorage } from "./useLocalStorage";

export function useUserLocalStorage<T>(key: string, initial: T) {
  const { user } = useAuth();

  // CRITICAL FIX: When no user, use a sentinel key that won't collide with real data
  // This prevents logged-out state from leaking into real account data
  const storageKey = useMemo(() => {
    if (!user?.name) return `__notegenius-anonymous-${key}`;
    return `notegenius-${user.name}-${key}`;
  }, [user?.name, key]);

  return useLocalStorage<T>(storageKey, initial);
}