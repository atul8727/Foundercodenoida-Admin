import { useId } from "react";
import FormField from "./FormField";

// options: ["New", "Contacted"]  or  [{ value: "new", label: "New" }]
export default function Select({ label, error, hint, required, options = [], placeholder, className = "", ...props }) {
  const id = useId();
  return (
    <FormField id={id} label={label} error={error} hint={hint} required={required}>
      <select id={id} className={`input ${error ? "!border-danger" : ""} ${className}`} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => {
          const opt = typeof o === "string" ? { value: o, label: o } : o;
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </FormField>
  );
}
