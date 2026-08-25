export const ROUTES = {
    public: {
        home: "/",
    },

    admin: {
        home: "/admin",
        login: "/login",

        dashboard: {
            overview: "/admin/dashboard/overview",
            medical: "/admin/dashboard/medical",
            dental: "/admin/dashboard/dental",
            appointments: "/admin/dashboard/appointments",
        },

       medical: {
            viewRecord: "/admin/medical/records/view",
            createNewRecord: "/admin/medical/new",
        },
        appointment: {
            createNewRecord: "/admin/appointment/new",
        },
        dental: {
            createNewRecord: "/admin/dental/new",
            viewRecord: "/admin/dental/records/view",

        },
    },
};