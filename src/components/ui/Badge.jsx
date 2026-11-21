// Full class strings on purpose: Tailwind only builds classes it can see in the source.
const tones = {
  primary: "bg-primary/15 text-primary ring-primary/25",
  success: "bg-success/15 text-success ring-success/25",
  warning: "bg-warning/15 text-warning ring-warning/25",
  danger: "bg-danger/15 text-danger ring-danger/25",
  info: "bg-info/15 text-info ring-info/25",
  neutral: "bg-neutral/15 text-neutral ring-neutral/25",
};
const dots = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-neutral",
};

export default function Badge({ tone = "primary", dot = false, children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${tones[tone] || tones.primary} ${className}`}>
      {dot && <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dots[tone] || dots.primary}`} />}
      {children}
    </span>
  );
}
