import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-primary text-on-solid hover:bg-primary-hover",
  soft: "bg-primary-soft text-primary hover:bg-primary/20",
  outline: "border border-line-strong bg-transparent text-ink hover:bg-surface-2",
  ghost: "text-ink hover:bg-surface-2",
  success: "bg-success text-on-solid hover:opacity-90",
  danger: "bg-danger text-on-solid hover:opacity-90",
};

const sizes = {
  sm: "min-h-8 px-3 py-1.5 text-xs",
  md: "min-h-10 px-4 py-2 text-sm",
  lg: "min-h-11 px-5 py-2.5 text-base",
};

export default function Button({ variant = "primary", size = "md", loading = false, icon: Icon, className = "", children, disabled, type = "button", ...props }) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-transparent font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? <Loader2 size={16} className="shrink-0 animate-spin" /> : Icon && <Icon size={16} className="shrink-0" />}
      {children}
    </button>
  );
}
