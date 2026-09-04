import React from "react";
import { APPOINTMENTS } from "./appointmentsData";
import {RecordsTablePanel} from "/@/components/Table.jsx";
import {ROUTES} from "/@/config/RoutePaths.js";
import {getTableColumns} from "/@/utils/TableUtils.js";``
import { GenericRow } from "/@/components/Table.jsx";

export default function AppointmentsTab() {
 return (
     <RecordsTablePanel
         name="Appointments"
         data={APPOINTMENTS}
          showCreate={false}
         columns={getTableColumns(APPOINTMENTS, ["id"])}
         renderRow={(record) => (
                         <GenericRow data={record} viewRecordPath={ROUTES.admin.appointment.viewAppointment} />
                     )}
     />
    );
}