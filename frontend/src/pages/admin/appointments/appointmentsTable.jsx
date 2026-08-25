import React from "react";
import { ChevronRight } from "lucide-react";
import { getInitials, avatarColor } from "../../../components/avatar.jsx";
import { StatusBadge } from "../../../components/statusbadge.jsx";
import {GenericTable} from "../../../components/Table.jsx";
import {getTableColumns} from "../../../utils/TableUtils.js";

const defaultColumns = [
  {
    key: "student",
    label: "Student",
    render: (appointment) => (
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${avatarColor(
            appointment.student
          )}`}
        >
          {getInitials(appointment.student)}
        </span>
        <span className="text-sm font-medium text-textPrimary">{appointment.student}</span>
      </div>
    ),
  },
  { key: "course", label: "Course" },
  { key: "time", label: "Time" },
  { key: "type", label: "Type" },
  {
    key: "status",
    label: "Status",
    render: (appointment) => <StatusBadge status={appointment.status} />,
  },
];

export default function AppointmentsTable({ appointments, columns = defaultColumns }) {
  return (
    <div className="overflow-x-auto">
      <GenericTable
          data={appointments}
          columns={getTableColumns(appointments, ["id"])}
      />
    </div>
  );
}