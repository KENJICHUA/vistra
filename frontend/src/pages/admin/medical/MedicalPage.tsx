import {useState} from "react";
import {MedicalVisitFilters} from "/@/api/schema/FilterSchemaCollection";
import {useMedicalQuery} from "/@/hooks/query/MedicalQuery";
import {MedicalProvider} from "/@/context/PaginatedContext";
import MedicalTab from "/@/pages/admin/medical/medicalTab";

export function MedicalPage() {
    const [filters, setFilters] = useState<MedicalVisitFilters>({
        page: 1,
        page_size: 10,
    });
    const medicalQuery = useMedicalQuery(filters);

    return (
        <MedicalProvider query={medicalQuery}>
            <MedicalTab setFilters={setFilters}/>
        </MedicalProvider>
    );
}
