import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">Settings</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">Customize your experience</p>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:bg-slate-800 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === "light" ? <Sun size={20} className="text-slate-600" /> : <Moon size={20} className="text-slate-300" />}
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-100">Theme</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{theme === "light" ? "Light mode" : "Dark mode"}</p>
            </div>
          </div>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`relative h-6 w-11 rounded-full transition-colors ${theme === "dark" ? "bg-indigo-600" : "bg-slate-300"}`}
          >
            <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${theme === "dark" ? "translate-x-5" : ""}`} />
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-8">NoteGenius v1.0.0</p>
    </div>
  );
}