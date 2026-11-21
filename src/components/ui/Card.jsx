export default function Card({ className = "", children, ...props }) {
  return (
    <div className={`card overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ title, description, action, className = "" }) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 border-b border-line p-5 ${className}`}>
      <div>
        <h3 className="font-semibold">{title}</h3>
        {description && <p className="muted mt-0.5 text-xs leading-relaxed">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`p-5 ${className}`} {...props}>
      {children}
    </div>
  );
}
