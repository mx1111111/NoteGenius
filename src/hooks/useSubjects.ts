import { useUserLocalStorage } from "./useUserLocalStorage";
import type { Subject } from "../types";

export function useSubjects() {
  const [subjects, setSubjects] = useUserLocalStorage<Subject[]>(
    "subjects",
    [],
  );

  const add = (s: Omit<Subject, "id" | "createdAt">) => {
    setSubjects((prev) => [
      ...prev,
      { ...s, id: `s${Date.now()}`, createdAt: new Date().toISOString() },
    ]);
  };

  const remove = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  return { subjects, add, remove };
}
