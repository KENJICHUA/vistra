import {FastAPIErrorResponse} from "/@/api/schema/FastApiValidationResponse";

export function getApiErrorMessage(error: any): string[] {
    if (!error) {
        return [];
    }

    if (Array.isArray(error.detail)) {
        return error.detail.map((item: any) => {
            if (typeof item === "string") {
                return item;
            }

            return item?.msg || "Validation error";
        });
    }

    if (typeof error.detail === "string") {
        return [error.detail];
    }

    if (typeof error.message === "string") {
        return [error.message];
    }

    return ["Something went wrong. Please try again."];
}

export function isFastAPIError(
    error: unknown
): error is FastAPIErrorResponse {
    if (!error || typeof error !== "object") {
        return false;
    }

    const data = error as Record<string, unknown>;

    return (
        Array.isArray(data.detail) &&
        data.detail.every(
            (item) =>
                typeof item === "object" &&
                item !== null &&
                "type" in item &&
                "loc" in item &&
                "msg" in item
        )
    );
}