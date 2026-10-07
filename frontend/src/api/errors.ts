import {FastAPIErrorResponse, ValidationError} from "/@/api/schema/FastApiValidationResponse";

export class FastAPIValidationError extends Error {
    public detail: ValidationError[];

    constructor(response: FastAPIErrorResponse) {
        super("Validation failed");

        this.name = "FastAPIValidationError";
        this.detail = response.detail;
    }
}

export class FastAPIConflictError extends Error {
    public detail: string;

    constructor(detail: string) {
        super(detail);
        this.name = "FastAPIConflictError";
        this.detail = detail;
    }
}