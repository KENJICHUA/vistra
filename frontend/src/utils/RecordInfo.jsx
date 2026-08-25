export function InfoField({ label, value, span }) {
  return (
    <div className={span ? "sm:col-span-2" : undefined}>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-textMuted">{label}</p>
      <p className="text-sm text-textPrimary">{value || "—"}</p>
    </div>
  );
}

export function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}