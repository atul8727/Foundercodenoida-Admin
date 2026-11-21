import { forwardRef, useId } from "react";
import FormField from "./FormField";

const Input = forwardRef(function Input({ label, error, hint, icon: Icon, suffix, required, className = "", ...props }, ref) {
  const id = useId();
  return (
    <FormField id={id} label={label} error={error} hint={hint} required={required}>
      <div className="relative">
        {Icon && <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />}
        <input
          id={id}
          ref={ref}
          aria-invalid={!!error}
          className={`input ${Icon ? "pl-9" : ""} ${error ? "!border-danger" : ""} ${className}`}
          {...props}
        />
        {suffix && <div className="absolute right-2.5 top-1/2 -translate-y-1/2">{suffix}</div>}
      </div>
    </FormField>
  );
});
export default Input;
