import { FieldLabel } from "./FieldLabel";

export function ReadOnlyField({ id, label, value, placeholder }) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        type="text"
        readOnly
        value={value || ""}
        placeholder={placeholder}
        className="w-full cursor-default rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none"
      />
    </div>
  );
}