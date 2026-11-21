import { useId } from "react";
import FormField from "./FormField";

export default function Textarea({ label, error, hint, required, rows = 3, className = "", ...props }) {
  const id = useId();
  return (
    <FormField id={id} label={label} error={error} hint={hint} required={required}>
      <textarea id={id} rows={rows} className={`input ${error ? "!border-danger" : ""} ${className}`} {...props} />
    </FormField>
  );
}
