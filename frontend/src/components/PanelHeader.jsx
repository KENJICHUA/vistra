export default function PanelHeader({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
      <div className="flex min-w-0 items-center gap-3">
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

      {action && <div className="shrink-0 self-start sm:self-center">{action}</div>}
    </div>
  );
}