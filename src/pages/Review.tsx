import { useState } from "react";
import { Link } from "react-router-dom";
import { Brain, BookOpen } from "lucide-react";
import { useSubjects } from "../hooks/useSubjects";
import { useCards } from "../hooks/useCards";
import { EmptyState } from "../components/ui/EmptyState";

export function Review() {
  const { subjects } = useSubjects();
  const { cards } = useCards();
  const [subjectId, setSubjectId] = useState<string>("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const filtered = subjectId === "all" ? cards : cards.filter((c) => c.subjectId === subjectId);

  if (subjects.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">Review</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Study your flashcards</p>
        <EmptyState
          icon={BookOpen}
          title="No subjects yet"
          description="Add a subject and flashcards before reviewing"
          action={
            <Link to="/app" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
              Go to Dashboard
            </Link>
          }
        />
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">Review</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Study your flashcards</p>
        <EmptyState
          icon={Brain}
          title="No flashcards yet"
          description="Upload some notes to create flashcards"
          action={
            <Link to="/app/upload" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
              Upload Notes
            </Link>
          }
        />
      </div>
    );
  }

  const safeIndex = Math.min(index, filtered.length - 1);
  const card = filtered[safeIndex];
  const subject = subjects.find((s) => s.id === card.subjectId);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">Review</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-4">Tap the card to flip</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => { setSubjectId("all"); setIndex(0); setFlipped(false); }} className={`rounded-full px-3 py-1 text-xs font-medium ${subjectId === "all" ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>All</button>
        {subjects.map((s) => (
          <button key={s.id} onClick={() => { setSubjectId(s.id); setIndex(0); setFlipped(false); }} className={`rounded-full px-3 py-1 text-xs font-medium ${subjectId === s.id ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>{s.name}</button>
        ))}
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
        Card {safeIndex + 1} of {filtered.length} {subject && `• ${subject.name}`}
      </p>

      <button onClick={() => setFlipped(!flipped)} className="w-full min-h-[200px] rounded-xl border border-slate-200 bg-white p-6 text-left hover:shadow-md transition-shadow dark:bg-slate-800 dark:border-slate-700">
        <p className="text-xs font-semibold text-slate-400 mb-2">{flipped ? "ANSWER" : "QUESTION"}</p>
        <p className="text-xl font-semibold text-slate-800 dark:text-slate-100">{flipped ? card.back : card.front}</p>
      </button>

      <div className="flex gap-3 mt-4">
        <button onClick={() => { setFlipped(false); setIndex(Math.max(0, safeIndex - 1)); }} className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700">Previous</button>
        <button onClick={() => { setFlipped(false); setIndex((safeIndex + 1) % filtered.length); }} className="flex-1 rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700">Next</button>
      </div>
    </div>
  );
}