export type SubjectColor = "blue" | "teal" | "amber" | "emerald" | "purple" | "rose";

export interface Subject {
  id: string;
  name: string;
  description?: string;
  color: SubjectColor;
  createdAt: string;
}

export interface Flashcard {
  id: string;
  subjectId: string;
  front: string;
  back: string;
  createdAt: string;
}

export interface Exam {
  id: string;
  subjectId: string;
  date: string;
  createdAt: string;
}