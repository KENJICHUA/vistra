import React from "react";
import { UserRound } from "lucide-react";
import {
    RecordsTablePanel,
    PatientRow,
} from "/@/components/Table.jsx";

import { ROUTES } from "/@/config/RoutePaths.js";

import { patientColumns } from "./patientsData";

import { usePatientContext } from "/@/context/PatientContext";
import LoadingPage from "/@/components/LoadingPage";


export default function PatientsTab() {
    const { patientRecords, isLoading } = usePatientContext();
    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <RecordsTablePanel
            name="Patient"
            icon={UserRound}
            data={patientRecords}
            columns={patientColumns}
            createRecordPath={ROUTES.admin.patient.createNewRecord}
            renderRow={(record) => (
                <PatientRow
                    data={record}
                    viewRecordPath={
                        ROUTES.admin.patient.patientRecordTab
                    }
                />
            )}
        />
    );
}