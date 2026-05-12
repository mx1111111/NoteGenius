import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function SignupPage() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !password) {
      setError("Please enter both name and password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    const success = register(name.trim(), password);
    if (!success) {
      setError("An account with this name already exists.");
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Top-left Back Arrow */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-50 flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
          <Sparkles size={24} />
        </div>
        <span className="text-2xl font-bold text-slate-100">NoteGenius</span>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-800/90 p-8 shadow-xl shadow-black/20 backdrop-blur-sm">
        <h1 className="text-xl font-bold text-slate-100 mb-1">
          Create account
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Get started with your learning journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1 text-left">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Add your name"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1 text-left">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1 text-left">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-rose-400">{error}</p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-white font-medium hover:bg-blue-500 shadow-md shadow-blue-600/20 transition-all"
          >
            Get Started <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}