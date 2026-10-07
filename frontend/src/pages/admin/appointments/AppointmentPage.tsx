import {useState} from "react";
import {AppointmentFilters} from "/@/api/schema/FilterSchemaCollection";
import {useAppointmentQuery} from "/@/hooks/query/AppointmentQuery";
import {AppointmentProvider} from "/@/context/PaginatedContext";
import AppointmentsTab from "/@/pages/admin/appointments/appointmentsTab";
import AppointmentDetailView from "/@/pages/admin/appointments/appointmentView";

export function AppointmentPage() {
    const [filters, setFilters] = useState<AppointmentFilters>({
        page: 1,
        page_size: 10,
    });
    const appointmentQuery = useAppointmentQuery(filters);

    return (
        <AppointmentProvider query={appointmentQuery}>
            <AppointmentsTab setFilters={setFilters}/>
        </AppointmentProvider>
    );

}

export function AppointmentDetailPage() {
    return (
        <AppointmentDetailView/>
    )

}
