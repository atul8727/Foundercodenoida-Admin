// Label + error + hint wrapper used by Input, Select and Textarea.
export default function FormField({ id, label, error, hint, required, children }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}
      {children}
      {error ? (
        <p role="alert" className="mt-1 text-xs text-danger">{error}</p>
      ) : (
        hint && <p className="muted mt-1 text-xs">{hint}</p>
      )}
    </div>
  );
}
