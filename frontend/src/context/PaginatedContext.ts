import {createPaginatedContext} from "/@/context/CreatePaginatedContext";
import {PatientProfile} from "/@/api/schema/PatientSchema";
import {AppointmentSchema} from "/@/api/schema/AppointmentSchema";
import {DentalVisitSchema} from "/@/api/schema/DentalSchema";
import {MedicalVisitSchema} from "/@/api/schema/MedicalSchema";

export const {
    Provider: PatientProvider,
    usePaginatedContext: usePatientContext,
} = createPaginatedContext<PatientProfile>();

export const {
    Provider: AppointmentProvider,
    usePaginatedContext: useAppointmentContext,
} = createPaginatedContext<AppointmentSchema>()

export const {
    Provider: DentalProvider,
    usePaginatedContext: useDentalContext,
} = createPaginatedContext<DentalVisitSchema>()

export const {
    Provider: MedicalProvider,
    usePaginatedContext: useMedicalContext,
} = createPaginatedContext<MedicalVisitSchema>()