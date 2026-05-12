import { useUserLocalStorage } from "./useUserLocalStorage";
import type { Flashcard } from "../types";

export function useCards() {
  const [cards, setCards] = useUserLocalStorage<Flashcard[]>("cards", []);

  const add = (c: Omit<Flashcard, "id" | "createdAt">) => {
    setCards((prev) => [
      ...prev,
      { ...c, id: `c${Date.now()}`, createdAt: new Date().toISOString() },
    ]);
  };

  const remove = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const removeBySubject = (subjectId: string) => {
    setCards((prev) => prev.filter((c) => c.subjectId !== subjectId));
  };

  const countBySubject = (subjectId: string) => {
    return cards.filter((c) => c.subjectId === subjectId).length;
  };

  return { cards, add, remove, removeBySubject, countBySubject };
}
