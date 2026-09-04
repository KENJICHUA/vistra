export interface ValidationError {
    type: string;
    loc: (string | number)[];
    msg: string;
    input?: unknown;
    ctx?: Record<string, unknown>;
}

export interface FastAPIErrorResponse {
    detail: ValidationError[];
}

