import React, {useMemo} from "react";
import {ChevronRight, Plus, UserRound} from "lucide-react";

import {ROUTES} from "/@/config/RoutePaths";

import {patientColumns, patientData} from "./patientsData";

import {DefaultTablePreset} from "/@/components/table/TableDesignPreset";
import {HyperlinkText, LinkButton} from "/@/components/Button";
import {removeNullFilters} from "/@/components/Filters";
import {PatientModel} from "/@/repository/PatientModel";
import {PatientFilters} from "/@/api/schema/FilterSchemaCollection";
import {usePatientContext} from "/@/context/PaginatedContext";


interface PatientsTabProps {
    setFilters: (filters: PatientFilters) => void;
}

export default function PatientsTab({setFilters}: PatientsTabProps) {
    const {
        items: patientProfiles,
        totalPages,
        page,
        isLoading,
    } = usePatientContext();

    const patientTableRecords = useMemo(
        () =>
            patientProfiles.map((patientProfile) => {
                const patientModel = new PatientModel(patientProfile);

                return patientModel.dataViewPatientDashboardRecord();
            }),
        [patientProfiles]
    );

    return (
        <DefaultTablePreset<patientData>
            title="Patients"
            icon={UserRound}
            data={patientTableRecords}
            isLoading={isLoading}
            columns={patientColumns}
            totalPages={totalPages}
            page={page}
            panelAddon={
                <LinkButton
                    title="New Patient Record"
                    route={ROUTES.staff.patient.createNewRecord}
                    icon={Plus}
                />
            }
            renderAction={(patient) => (
                <HyperlinkText
                    title="View"
                    link={`${ROUTES.staff.patient.patientRecordTab}/${patient.patient_id}`}
                    icon={ChevronRight}
                />
            )}
            onRun={(search, filters, page, pageSize) => {
                setFilters({
                    search,
                    ...removeNullFilters(filters),
                    page,
                    page_size: pageSize,
                });
            }}
        />
    );
}
