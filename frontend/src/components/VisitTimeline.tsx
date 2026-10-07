import React from "react";
import { Visit } from "/@/types/types";
import { VisitRow } from "./VisitRow";

interface VisitTimelineProps {
  visits: Visit[];
  onView: (visit: Visit) => void;
  onEdit?: (visit: Visit) => void;
  showEdit?: boolean;
}

export function VisitTimeline({ visits, onView, onEdit, showEdit = true }: VisitTimelineProps) {
  const byYear = visits.reduce<Record<string, Visit[]>>((acc, visit) => {
    const year = String(new Date(visit.date).getFullYear());
    (acc[year] ||= []).push(visit);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="space-y-8">
      {years.map((year) => (
        <div key={year}>
          <p className="mb-4 text-sm font-semibold text-textPrimary">{year}</p>
          <ol>
            {byYear[year].map((visit, index) => (
              <VisitRow
                key={visit.id}
                visit={visit}
                isLast={index === byYear[year].length - 1}
                onView={onView}
                onEdit={showEdit ? onEdit : undefined}
              />
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}