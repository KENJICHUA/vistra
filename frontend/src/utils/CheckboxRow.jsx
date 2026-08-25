export function CheckboxRow({ label }) {
  return (
    <label className="flex items-center gap-2 text-sm text-textPrimary">
      <input type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-primary/30" />
      {label}
    </label>
  );
}