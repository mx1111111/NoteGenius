import { usePomodoro } from "../hooks/usePomodoro";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

export function Pomodoro() {
  const { mode, seconds, running, sessions, progress, toggle, reset, switchMode, fmt } =
    usePomodoro();

  const ring = 52;
  const circ = 2 * Math.PI * ring;
  const offset = circ - (progress / 100) * circ;

  return (
    <div className="mx-auto max-w-sm text-center">
      <h1 className="mb-6 flex items-center justify-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100">
        <Timer size={20} className="text-indigo-600" /> Pomodoro
      </h1>

      <div className="mb-6 flex justify-center gap-2">
        {(["focus", "break"] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              mode === m
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {m === "focus" ? "Focus" : "Break"}
          </button>
        ))}
      </div>

      <div className="relative mx-auto mb-8 flex h-56 w-56 items-center justify-center">
        <svg className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="112" cy="112" r={ring} strokeWidth="6" className="text-slate-200 dark:text-slate-700" fill="none" />
          <circle
            cx="112" cy="112" r={ring} strokeWidth="6" fill="none" strokeLinecap="round"
            stroke="currentColor"
            className={mode === "focus" ? "text-indigo-600" : "text-emerald-500"}
            strokeDasharray={circ}
            strokeDashoffset={offset}
          />
        </svg>
        <div>
          <div className="text-5xl font-bold text-slate-800 dark:text-slate-100">{fmt(seconds)}</div>
          <div className="mt-1 text-xs text-slate-400">{running ? "Running" : "Paused"}</div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={toggle}
          className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md transition-colors ${
            running ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {running ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
        </button>
        <button
          onClick={reset}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="mt-8 text-sm text-slate-500 dark:text-slate-400">
        Sessions completed: <span className="font-semibold text-slate-800 dark:text-slate-100">{sessions}</span>
      </div>
    </div>
  );
}