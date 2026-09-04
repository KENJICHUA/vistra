export const ROUTES = {
    public: {
        home: "/",
    },

    admin: {
        home: "/staff",
        login: "/login",

        dashboard: {
            overview: "/staff/dashboard/overview",
            medical: "/staff/dashboard/medical",
            dental: "/staff/dashboard/dental",
            appointments: "/staff/dashboard/appointments",
            patients: "/staff/dashboard/patients",
        },
       medical: {
            viewRecord: "/staff/medical/records/view",
            createNewRecord: "/staff/medical/new",
        },
        appointment: {
            createNewRecord: "/staff/appointment/new",
            viewAppointment: "/staff/appointment/view"
        },
        dental: {
            createNewRecord: "/staff/dental/new",
            viewRecord: "/staff/dental/records/view",

        },
        patient: {
            createNewRecord: "/staff/patient/new",
            patientRecordTab: "/staff/patient/record/view",

        },
    },
};