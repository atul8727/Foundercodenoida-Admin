import { Inbox } from "lucide-react";

export default function EmptyState({ icon: Icon = Inbox, title = "No records found", text, action, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 px-6 py-12 text-center ${className}`}>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <Icon size={26} />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold">{title}</h3>
        {text && <p className="muted max-w-sm text-sm leading-relaxed">{text}</p>}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
