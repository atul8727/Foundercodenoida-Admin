import { Link } from "react-router-dom";
import Card from "./Card";
import { Skeleton } from "./Spinner";

export default function StatCard({ label, value = "—", icon: Icon, to, subtext, loading = false, className = "" }) {
  const content = (
    <Card className={`flex items-center gap-4 p-5 ${to ? "transition hover:border-primary/50" : ""} ${className}`}>
      {Icon && (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <Icon size={20} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="muted text-sm font-medium">{label}</p>
        {loading ? <Skeleton className="mt-1.5 h-7 w-20" /> : <p className="mt-0.5 text-2xl font-bold tracking-tight">{value}</p>}
        {subtext && <p className="muted mt-0.5 text-xs">{subtext}</p>}
      </div>
    </Card>
  );
  return to ? <Link to={to} className="block">{content}</Link> : content;
}
