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

    admin: {
        login: "/staff/auth/login",
        create_staff: "/staff/",
        getStaffById: (staffId) => `/staff/${staffId}/`,
    },

    patient: {
        // WIP
    },
};