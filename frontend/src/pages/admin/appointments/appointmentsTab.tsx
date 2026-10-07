import React, {useMemo} from "react";
import {Calendar, ChevronRight} from "lucide-react";
import {AppointmentsColumns, AppointmentTableFormat} from "./appointmentsData";
import {DefaultTablePreset} from "/@/components/table/TableDesignPreset";
import {ROUTES} from "/@/config/RoutePaths.js";
import {HyperlinkText} from "/@/components/Button";
import {AppointmentFilters} from "/@/api/schema/FilterSchemaCollection";
import {removeNullFilters} from "/@/components/Filters";
import {useAppointmentContext} from "/@/context/PaginatedContext";
import {AppointmentModel} from "/@/repository/AppointmentModel";

interface  AppointmentTadProps {
    setFilters: (filters: AppointmentFilters) => void;
}

export default function AppointmentsTab({setFilters}: AppointmentTadProps) {
    const {
        items: Appointment,
        totalPages,
        page,
        isLoading,
    } = useAppointmentContext();

    const appointments = useMemo(
        () =>
            Appointment.map((appointment) => {
                const appointmentModel = new AppointmentModel(appointment);

                return appointmentModel.UiTableFormat();
            }),
        [Appointment]
    );

    return (
        <DefaultTablePreset<AppointmentTableFormat>
            title="Appointment"
            icon={Calendar}
            data={appointments}
            isLoading={isLoading}
            columns={AppointmentsColumns}
            totalPages={totalPages}
            page={page}
            renderAction={
                (appointment) => (
                    <HyperlinkText
                        title={`View`}
                        link={`${ROUTES.staff.appointments.view.build(appointment.studentId, appointment.id)}`}
                        icon={ChevronRight}
                    />
                )}
            onRun={(search, filters, page, pageSize) =>
                setFilters({
                    search,
                    ...removeNullFilters(filters),
                    page,
                    page_size: pageSize,
                })
            }
        />
    );
}
