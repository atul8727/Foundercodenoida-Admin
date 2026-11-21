import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

// Calls onChange only after the user stops typing (good for API search).
export default function SearchInput({ onChange, placeholder = "Search...", delay = 400, className = "" }) {
  const [text, setText] = useState("");
  const value = useDebounce(text, delay);
  useEffect(() => {
    onChange(value);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`relative ${className}`}>
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
      <input type="search" value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} aria-label={placeholder} className="input pl-9" />
    </div>
  );
}
