import React from "react";
import { GenericTable, GenericRow } from "/@/components/Table.jsx";
import { getTableColumns } from "/@/utils/TableUtils.js";
import { ROUTES } from "/@/config/RoutePaths.js";

export default function DentalTable({ dentalRecords }) {
  return (
    <div className="overflow-x-auto">
      <GenericTable
        data={dentalRecords}
        columns={getTableColumns(dentalRecords, ["id"])}
        renderRow={(record) => (
          <GenericRow data={record} viewRecordPath={ROUTES.admin.dental.viewRecord} />
        )}
      />
    </div>
  );
}