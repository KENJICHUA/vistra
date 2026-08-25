export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}>
      {statusLabels[status]}</span>
  );
}
export const statusStyles = {
  completed: "border-success/30 bg-success/10 text-success",
  followUp: "border-warning/30 bg-warning/10 text-warning",
  referred: "border-info/30 bg-info/10 text-info",
  ongoingTreatment: "border-treatment/30 bg-treatment/10 text-treatment",
  confirmed: "border-primary/30 bg-primary/10 text-primary",
  pending: "border-warning/30 bg-warning/10 text-warning",
  declined: "border-danger/30 bg-danger/10 text-danger",
  cleared: "border-success/30 bg-success/10 text-success",
  secondOpinion: "border-warning/30 bg-warning/10 text-warning",
  recovered: "border-primary/30 bg-primary/10 text-primary",
};

export const statusLabels = {
  completed: "Completed",
  followUp: "Follow-up",
  referred: "Referred",
  ongoingTreatment: "Ongoing Treatment",
  confirmed: "Confirmed",
  pending: "Pending",
  declined: "Declined",
  cleared: "Cleared",
  secondOpinion: "Second Opinion",
  recovered: "Recovered",
};

