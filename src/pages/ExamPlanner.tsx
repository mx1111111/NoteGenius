import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Trash2, BookOpen } from "lucide-react";
import { useSubjects } from "../hooks/useSubjects";
import { useExams } from "../hooks/useExams";
import { EmptyState } from "../components/ui/EmptyState";

export function ExamPlanner() {
  const { subjects } = useSubjects();
  const { exams, add, remove } = useExams();
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? "");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  if (subjects.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">Exam Planner</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Schedule your exams</p>
        <EmptyState
          icon={BookOpen}
          title="No subjects yet"
          description="Add a subject from the dashboard before scheduling exams"
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
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">Exam Planner</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">Schedule exams for your subjects</p>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:bg-slate-800 dark:border-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-slate-800 dark:text-slate-100">Subject</label>
            <select value={currentId} onChange={(e) => setSubjectId(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100">
              {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-800 dark:text-slate-100">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100" />
          </div>
        </div>
        <button onClick={() => { if (date) { add(currentId, date); setDate(new Date().toISOString().split("T")[0]); } }} className="w-full rounded-lg bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700 transition-colors">Add to Schedule</button>
      </div>

      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4">Scheduled Exams ({exams.length})</h2>
      {exams.length === 0 ? (
        <EmptyState icon={Calendar} title="No exams scheduled" description="Add your first exam above" />
      ) : (
        <div className="space-y-3">
          {exams.map((e) => {
            const subject = subjects.find((s) => s.id === e.subjectId);
            const days = Math.ceil((new Date(e.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            return (
              <div key={e.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 dark:bg-slate-800 dark:border-slate-700">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{subject?.name ?? "Unknown"}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(e.date).toLocaleDateString()} — {days >= 0 ? `${days} days away` : "passed"}</p>
                </div>
                <button onClick={() => remove(e.id)} className="text-slate-400 hover:text-rose-600 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}




