import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sessionManager } from "../utils/SessionManager.ts";
import {ROUTES} from "../config/RoutePaths.js";
import {loginStaff} from "../api/auth.api.ts";

export function useLoginForm() {
    const [credentials, setCredentials] = useState({
        staffId: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return {
        credentials,
        handleChange,
    };
}

export function useLogin() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async (credentials) => {
        const { staffId, password } = credentials;

        if (!staffId.trim() || !password) {
            setError("Enter your staff ID and password to continue.");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const { data } = await loginStaff(credentials);

            if (!data.success) {
                setError(data.message || "Invalid staff ID or password.");
                return;
            }

            sessionManager.setLogin(
                data.access_token,
                data.user
            );

            navigate(ROUTES.admin.dashboard.overview);

        } catch (error) {
            console.error(error);
            setError("Unable to connect to the server.");

        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        isLoading,
        error,
        setError,
    };
}