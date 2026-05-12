import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-slate-100 flex flex-col">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-800/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-900/20 blur-3xl" />
      </div>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-700/50 bg-slate-900/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
              <Sparkles size={18} />
            </div>
            <span className="text-lg font-bold text-slate-100">NoteGenius</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-500 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Study smarter with{" "}
            <span className="text-blue-400">NoteGenius</span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base text-slate-300">
            Upload notes, plan exams, and review flashcards — all in one focused
            workspace.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-white font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/40 transition-all"
            >
              Start for Free <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800 px-7 py-3 text-slate-200 font-semibold hover:bg-slate-700 transition-colors"
            >
              Sign In
            </button>
          </div>


        </div>
      </main>

      <footer className="relative z-10 py-4 text-center text-xs text-slate-500">
        NoteGenius — Built by students for students
        <br />
        Make The world a better place
      </footer>
    </div>
  );
}