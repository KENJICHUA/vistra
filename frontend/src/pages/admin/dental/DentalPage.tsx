import {useState} from "react";
import {DentalVisitFilters} from "/@/api/schema/FilterSchemaCollection";
import {useDentalQuery} from "/@/hooks/DentalQuery";
import {DentalProvider} from "/@/context/PaginatedContext";
import DentalTab from "/@/pages/admin/dental/dentalTab";

export function DentalPage() {
    const [filters, setFilters] = useState<DentalVisitFilters>({
        page: 1,
        page_size: 10,
    });
    const dentalQuery = useDentalQuery(filters);

    return(
        <DentalProvider query={dentalQuery}>
            <DentalTab setFilters={setFilters}/>
        </DentalProvider>
    )
}
// export function AppointmentPage() {
//     const [filters, setFilters] = useState<AppointmentFilters>({
//         page: 1,
//         page_size: 10,
//     });
//     const appointmentQuery = useAppointmentQuery(filters);
//
//     return (
//         <AppointmentProvider query={appointmentQuery}>
//             <AppointmentsTab setFilters={setFilters}/>
//         </AppointmentProvider>
//     );
//
// }