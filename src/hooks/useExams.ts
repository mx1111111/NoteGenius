import { useUserLocalStorage } from "./useUserLocalStorage";
import type { Exam } from "../types";

export function useExams() {
  const [exams, setExams] = useUserLocalStorage<Exam[]>("exams", []);

  const add = (subjectId: string, date: string) => {
    setExams((prev) => [
      ...prev,
      {
        id: `e${Date.now()}`,
        subjectId,
        date,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const remove = (id: string) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  const removeBySubject = (subjectId: string) => {
    setExams((prev) => prev.filter((e) => e.subjectId !== subjectId));
  };

  const countBySubject = (subjectId: string) => {
    return exams.filter((e) => e.subjectId === subjectId).length;
  };

  return { exams, add, remove, removeBySubject, countBySubject };
}
