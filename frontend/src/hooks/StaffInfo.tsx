import {useQuery} from "@tanstack/react-query";
import {StaffModel} from "/@/repository/StaffModel";
import {getStaffById} from "/@/api/staff.api";


export function useStaffInfo(staffId: string) {
    const {
        data: staffData,
        isLoading,
        error,
    } = useQuery<StaffModel, Error> ({
        queryKey: ["staff", staffId],
        queryFn: ({signal}) =>getStaffById(staffId, signal),
        enabled: !!staffId,
    });
    return {
        staffData: staffData ?? null,
        isLoading,
        error: error?.message ?? null,
    }
}
