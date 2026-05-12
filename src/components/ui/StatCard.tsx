interface StatCardProps {
  label: string;
  value: number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:bg-slate-800 dark:border-slate-700">
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
      <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{value}</div>
    </div>
  );
}