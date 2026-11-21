const variants = {
  ghost: "text-muted hover:bg-surface-2 hover:text-ink",
  primary: "bg-primary/15 text-primary hover:bg-primary hover:text-on-solid",
  success: "bg-success/15 text-success hover:bg-success hover:text-on-solid",
  danger: "bg-danger/15 text-danger hover:bg-danger hover:text-on-solid",
};

// `label` is required: it is the accessible name and the tooltip.
export default function IconButton({ icon: Icon, label, variant = "ghost", className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      <Icon size={18} />
    </button>
  );
}
