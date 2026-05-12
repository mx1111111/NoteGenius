import { useState } from "react";
import { Link } from "react-router-dom";
import { UploadCloud, Brain, Calendar, Sparkles, Trash2, BookOpen, Layers } from "lucide-react";
import { useSubjects } from "../hooks/useSubjects";
import { useCards } from "../hooks/useCards";
import { useExams } from "../hooks/useExams";
import { StatCard } from "../components/ui/StatCard";
import { EmptyState } from "../components/ui/EmptyState";
import { Modal } from "../components/ui/Modal";
import type { SubjectColor } from "../types";

const colors: { name: SubjectColor; bg: string }[] = [
  { name: "blue", bg: "bg-blue-500" },
  { name: "teal", bg: "bg-teal-500" },
  { name: "amber", bg: "bg-amber-500" },
  { name: "emerald", bg: "bg-emerald-500" },
  { name: "purple", bg: "bg-purple-500" },
  { name: "rose", bg: "bg-rose-500" },
];

export function Dashboard() {
  const { subjects, add, remove } = useSubjects();
  const { cards, removeBySubject: removeCardsBySubject, countBySubject: countCardsBySubject } = useCards();
  const { exams, removeBySubject: removeExamsBySubject, countBySubject: countExamsBySubject } = useExams();
  
  const [showModal, setShowModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState<SubjectColor>("blue");

  const handleDelete = (id: string) => {
    removeCardsBySubject(id);
    removeExamsBySubject(id);
    remove(id);
    setConfirmId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">Dashboard</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">Your study workspace</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Subjects" value={subjects.length} />
        <StatCard label="Flashcards" value={cards.length} />
        <StatCard label="Exams" value={exams.length} />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link to="/app/upload" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
          <UploadCloud size={16} /> Upload Notes
        </Link>
        <Link to="/app/review" className="inline-flex items-center gap-2 rounded-lg bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 transition-colors dark:bg-indigo-950/60 dark:text-indigo-300">
          <Brain size={16} /> Start Review
        </Link>
        <Link to="/app/exam-planner" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 transition-colors dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700">
          <Calendar size={16} /> Exam Planner
        </Link>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 transition-colors dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700">
          <Sparkles size={16} /> Add Subject
        </button>
      </div>

      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Your Subjects</h2>

      {subjects.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No subjects yet"
          description="Add your first subject to get started"
          action={
            <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
              Add Subject
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((s) => {
            const colorClass = colors.find((c) => c.name === s.color)?.bg ?? "bg-slate-500";
            const cardCount = countCardsBySubject(s.id);
            const examCount = countExamsBySubject(s.id);
            
            return (
              <div key={s.id} className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow dark:bg-slate-800 dark:border-slate-700">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${colorClass}`} />
                <div className="flex items-start justify-between pl-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 truncate">{s.name}</h3>
                    {s.description && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{s.description}</p>}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Layers size={13} /> {cardCount} {cardCount === 1 ? "card" : "cards"}
                      </div>
                      {examCount > 0 && (
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Calendar size={13} /> {examCount} {examCount === 1 ? "exam" : "exams"}
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => setConfirmId(s.id)} 
                    className="text-slate-400 hover:text-rose-600 transition-colors ml-2"
                    aria-label="Delete subject"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Subject">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Subject name"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm mb-4 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
        />
        <div className="flex gap-2 mb-4">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.name)}
              className={`h-8 w-8 rounded-full ${c.bg} ${color === c.name ? "ring-2 ring-offset-2 ring-slate-700 dark:ring-offset-slate-800" : ""}`}
            />
          ))}
        </div>
        <button
          onClick={() => { 
            if (name.trim()) { 
              add({ name: name.trim(), description: "", color }); 
              setName(""); 
              setShowModal(false); 
            } 
          }}
          className="w-full rounded-lg bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
          disabled={!name.trim()}
        >
          Create
        </button>
      </Modal>

      <Modal open={!!confirmId} onClose={() => setConfirmId(null)} title="Delete Subject?">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
          This will permanently delete:
        </p>
        <ul className="text-sm text-slate-600 dark:text-slate-300 list-disc list-inside mb-4">
          <li>The subject itself</li>
          <li>All associated flashcards</li>
          <li>All scheduled exams</li>
        </ul>
        <div className="flex gap-3 justify-end">
          <button 
            onClick={() => setConfirmId(null)} 
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 transition-colors dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
          >
            Cancel
          </button>
          <button 
            onClick={() => confirmId && handleDelete(confirmId)} 
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}