const isProd = import.meta.env.VITE_IS_PROD === "true";

export const getApiUrl = () => {
    return isProd
        ? import.meta.env.VITE_PROD_API_URL
        : import.meta.env.VITE_LOCAL_API_URL;
};

export const API_ENDPOINTS = {
    public: {
        health_check: "/api/health",
    },
    auth:{
        refresh_token: "/staff/auth/refresh",
    },
    staff: {
        login: "/staff/auth/login",
        create_staff: "/staff/",
        getStaffById: (staffId) => `/staff/${staffId}/`,
    },
    patient: {
        get_patients: "/patients/",
        create_patient: "/patients/",
        get_all_patient_profile: "/patients/profiles/",
        get_patient_by_id: (patientId) => `/patients/${patientId}`,
    },
};