export default function PanelHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-heading text-base font-semibold text-textPrimary">
        {title}
      </h2>

      {action && action}
    </div>
  );
}