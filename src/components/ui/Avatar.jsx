export default function Avatar({ name = "", size = "md", className = "" }) {
  const initial = name.trim() ? name.trim()[0].toUpperCase() : "A";
  const sizes = { sm: "h-8 w-8 text-xs", md: "h-9 w-9 text-sm", lg: "h-11 w-11 text-base" };
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-on-solid ${sizes[size]} ${className}`}>
      {initial}
    </span>
  );
}
