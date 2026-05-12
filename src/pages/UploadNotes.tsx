import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useSubjects } from "../hooks/useSubjects";
import { useCards } from "../hooks/useCards";
import { EmptyState } from "../components/ui/EmptyState";

export function UploadNotes() {
  const { subjects } = useSubjects();
  const { add } = useCards();
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? "");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  if (subjects.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">Upload Notes</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Add flashcards to your subjects</p>
        <EmptyState
          icon={BookOpen}
          title="No subjects yet"
          description="Add a subject from the dashboard before creating flashcards"
          action={
            <Link to="/app" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
              Go to Dashboard
            </Link>
          }
        />
      </div>
    );
  }

  const currentId = subjects.find((s) => s.id === subjectId) ? subjectId : subjects[0].id;

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">Upload Notes</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">Create flashcards manually</p>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:bg-slate-800 dark:border-slate-700">
        <label className="text-sm font-medium text-slate-800 dark:text-slate-100">Subject</label>
        <select value={currentId} onChange={(e) => setSubjectId(e.target.value)} className="mt-1 mb-4 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100">
          {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        <label className="text-sm font-medium text-slate-800 dark:text-slate-100">Front (Question)</label>
        <input value={front} onChange={(e) => setFront(e.target.value)} placeholder="e.g. What is a hash table?" className="mt-1 mb-4 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100" />

        <label className="text-sm font-medium text-slate-800 dark:text-slate-100">Back (Answer)</label>
        <textarea value={back} onChange={(e) => setBack(e.target.value)} rows={4} placeholder="Write the answer..." className="mt-1 mb-4 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100" />

        <button
          onClick={() => { if (front.trim() && back.trim()) { add({ subjectId: currentId, front: front.trim(), back: back.trim() }); setFront(""); setBack(""); } }}
          className="w-full rounded-lg bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
          disabled={!front.trim() || !back.trim()}
        >
          Add Flashcard
        </button>
      </div>
    </div>
  );
}