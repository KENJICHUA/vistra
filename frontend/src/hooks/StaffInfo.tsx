import { useEffect, useState } from "react";
import { getStaffById } from "../api/staff.api";
import type { StaffModel } from "../repository/StaffModel";
interface UseStaffInfoResult {
    staffData: StaffModel | null;
    isLoading: boolean;
    error: string;
}
export function useStaffInfo(staffId: string) {
    const [staffData, setStaffData] = useState<StaffModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    console.log(staffData)
    useEffect(() => {
        const controller = new AbortController();

        const loadStaff = async () => {
            try {
                setIsLoading(true);
                setError("");

                const data = await getStaffById(
                    staffId,
                    controller.signal
                );

                setStaffData(data);
            } catch (err) {

                if (err instanceof DOMException && err.name === "AbortError") {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load staff"
                );
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        void loadStaff();

        return () => {
            controller.abort();
        };
    }, [staffId]);

    return {
        staffData,
        isLoading,
        error,
    };
}