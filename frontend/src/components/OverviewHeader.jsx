export default function PanelHeader({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 min-w-0">
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-4 w-4" strokeWidth={2} />
          </span>
        )}
        <div className="min-w-0">
          <h2 className="truncate font-heading text-base font-semibold text-textPrimary">{title}</h2>
          {subtitle && <p className="truncate text-xs text-textMuted">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}