export default function Checkbox({ label, className = "", ...props }) {
  return (
    <label className={`inline-flex cursor-pointer items-center gap-2 text-sm ${className}`}>
      <input type="checkbox" className="h-4 w-4 cursor-pointer rounded accent-primary" {...props} />
      {label}
    </label>
  );
}
