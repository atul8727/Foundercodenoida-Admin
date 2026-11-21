import { Loader2 } from "lucide-react";

export default function Spinner({ size = 20 }) {
  return <Loader2 size={size} className="animate-spin text-primary" aria-label="Loading" />;
}

export function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner size={32} />
    </div>
  );
}

export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded bg-surface-2 ${className}`} />;
}
