import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../../hooks/useAuth";

export function AppLayout() {
  const { isAuthenticated } = useAuth();

  // If not logged in, redirect to landing page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Sidebar />
      <main className="lg:pl-60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}