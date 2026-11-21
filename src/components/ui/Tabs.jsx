// items: [{ key: "all", label: "All" }]   variant: "pill" | "line"
export default function Tabs({ items, value, onChange, variant = "pill", className = "" }) {
  if (variant === "line") {
    return (
      <div role="tablist" className={`flex gap-6 border-b border-line ${className}`}>
        {items.map((t) => (
          <button key={t.key} type="button" role="tab" aria-selected={value === t.key} onClick={() => onChange(t.key)}
            className={`-mb-px border-b-2 pb-2 text-sm font-semibold ${value === t.key ? "border-primary text-primary" : "muted border-transparent"}`}>
            {t.label}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div role="tablist" className={`inline-flex gap-1 rounded-lg bg-surface-2 p-1 ${className}`}>
      {items.map((t) => (
        <button key={t.key} type="button" role="tab" aria-selected={value === t.key} onClick={() => onChange(t.key)}
          className={`rounded-md px-3.5 py-1.5 text-sm font-semibold transition ${value === t.key ? "bg-surface text-primary shadow-card" : "text-muted hover:text-ink"}`}>
          {t.label}
        </button>
      ))}
    </div>
  );
}
