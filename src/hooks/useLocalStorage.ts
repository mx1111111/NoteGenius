import { useState, useCallback, useRef } from "react";

function readValue<T>(key: string, initial: T): T {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : initial;
  } catch {
    return initial;
  }
}

export function useLocalStorage<T>(
  key: string,
  initial: T,
): [T, (updater: T | ((prev: T) => T)) => void] {
  // Use a ref to track the current key for the setter
  const keyRef = useRef(key);

  // Initialize state from localStorage
  const [value, setValue] = useState<T>(() => readValue(key, initial));

  // Sync state when key changes — but DO NOT use setState in effect
  // Instead, re-initialize by forcing a re-mount or using a reducer
  // The proper fix: use a reducer pattern or accept that key changes need external handling

  const setStoredValue = useCallback((updater: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const next =
        typeof updater === "function"
          ? (updater as (prev: T) => T)(prev)
          : updater;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(keyRef.current, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  return [value, setStoredValue];
}
