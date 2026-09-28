import PatientsTab from "/@/pages/admin/patients/patientsTab";
import {PatientProvider} from "/@/context/PaginatedContext";
import {usePatientQuery} from "/@/hooks/PatientQuery";
import ViewStudentRecord from "/@/pages/admin/patients/ViewStudentRecord";
import {PatientFilters} from "/@/api/schema/FilterSchemaCollection";
import {useState} from "react";

export function PatientsPage() {
    const [filters, setFilters] = useState<PatientFilters>({
        page: 1,
        page_size: 10,
    });
    const patientQuery = usePatientQuery(filters);

    return (
        <PatientProvider query={patientQuery}>
            <PatientsTab setFilters={setFilters} />
        </PatientProvider>
    );
}

export function ViewPatientRecord() {
    const patientQuery = usePatientQuery();

    return (
        <PatientProvider query={patientQuery}>
            <ViewStudentRecord/>
        </PatientProvider>
    )
}