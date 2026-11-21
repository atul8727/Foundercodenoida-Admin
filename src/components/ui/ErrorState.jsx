import { AlertTriangle } from "lucide-react";
import Button from "./Button";

export default function ErrorState({ message = "We could not load this data.", onRetry, className = "" }) {
  return (
    <div className={`flex flex-col items-center gap-2 px-6 py-12 text-center ${className}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-danger/15 text-danger">
        <AlertTriangle size={22} />
      </div>
      <h3 className="font-semibold">Something went wrong</h3>
      <p className="muted max-w-sm text-sm">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-1">
          Try again
        </Button>
      )}
    </div>
  );
}
