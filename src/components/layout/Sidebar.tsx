import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutGrid,
  UploadCloud,
  Brain,
  Calendar,
  SlidersHorizontal,
  Sparkles,
  Menu,
  X,
  LogOut,
  User,
  Timer,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    navigate("/");   // Navigate first
    logout();        // Then clear auth
  };

  const nav = [
    { to: "/app", label: "Dashboard", icon: LayoutGrid },
    { to: "/app/upload", label: "Upload Notes", icon: UploadCloud },
    { to: "/app/review", label: "Review", icon: Brain },
    { to: "/app/exam-planner", label: "Exam Planner", icon: Calendar },
    { to: "/app/pomodoro", label: "Pomodoro", icon: Timer },
    { to: "/app/settings", label: "Settings", icon: SlidersHorizontal },
  ];

  const content = (
    <div className="flex h-full flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <Sparkles size={20} />
        </div>
        <span className="text-lg font-bold text-slate-800 dark:text-slate-100">
          NoteGenius
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active =
            location.pathname === item.to ||
            location.pathname.startsWith(item.to + "/");
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile + Logout */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
        {user && (
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              <User size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                {user.name}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 rounded-lg bg-white dark:bg-slate-800 p-2 shadow-md border border-slate-200 dark:border-slate-700"
      >
        <Menu size={20} className="text-slate-800 dark:text-slate-100" />
      </button>
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-60 z-20">
        {content}
      </aside>
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-60 h-full animate-[fadeIn_200ms_ease-out]">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 rounded-md p-1 text-slate-500"
            >
              <X size={18} />
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  );
}