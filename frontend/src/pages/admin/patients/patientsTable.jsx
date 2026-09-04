import React from "react";
import { GenericTable, GenericRow } from "/@/components/Table.jsx";
import { getTableColumns } from "/@/utils/TableUtils.js";
import { ROUTES } from "/@/config/RoutePaths.js";

export default function PatientsTable({ PatientRecords }) {
  return (
    <div className="overflow-x-auto">
      <GenericTable
        data={PatientRecords}
        columns={getTableColumns(PatientRecords, ["id"])}
        renderRow={(record) => (
          <GenericRow data={record} viewRecordPath={ROUTES.admin.patient.patientRecordTab} />
        )}
      />
    </div>
  );
}