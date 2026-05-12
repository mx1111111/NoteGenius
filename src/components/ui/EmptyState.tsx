import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white p-12 text-center dark:bg-slate-800 dark:border-slate-700">
      <Icon size={40} className="text-slate-300" />
      <p className="mt-4 text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}