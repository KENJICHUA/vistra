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
        refresh_token: "/staff/auth/refresh/",
    },
    staff: {
        login: "/staff/auth/login/",
        create_staff: "/staff/",
        getStaffById: (staffId: string) => `/staff/${staffId}/`,
    },
    patient: {
        get_patients: "/patients/",
        create_patient: "/patients/",
        get_all_patient_profile: "/patients/profiles/",
        get_summary_record: (patientId: string) => `/patients/profiles/${patientId}/`,
        get_patient_by_id: (patientId: string) => `/patients/${patientId}/`,
    },
    appointment: {
        get_appointment: "/appointments/",
        get_appointment_by_id: (patient_id: string, appointment_id: string) => `/appointments/${patient_id}/${appointment_id}`,
    },
    dental: {
        create_dental_visit: "/dental/",
        get_dental_visit: "/dental/"
    }
};