import type {ReactNode} from "react";

export interface ColumnFilterOption {
    value: string;
    label: string;
}

export function optionsFromValues(values: string[]): ColumnFilterOption[] {
    return values.map((value) => ({value, label: value}));
}

export function optionsFromMap<T extends Record<string, string>>(
    map: T
): ColumnFilterOption[] {
    return Object.entries(map).map(([value, label]) => ({
        value,
        label,
    }));
}

export type ColumnType =
    | "select"
    | "date";

export interface Column<T, K extends keyof T = keyof T> {
    key: K;
    label: string;

    render?: (
        value: T[K],
        record: T
    ) => ReactNode;

    filterType?: ColumnType;
    options?: ColumnFilterOption[];

    /*
     * Query param name sent to the backend.
     * Defaults to the column key. Needed when the row field
     * differs from the API filter name (e.g. column "time"
     * filters backend param "date").
     */
    filterKey?: string;
}

interface GenericTableProps {
    children: ReactNode;
    className?: string;
}

export function GenericTable({children, className = ""}: GenericTableProps) {
    return (
        <table
            className={`w-full min-w-[640px] border-separate border-spacing-0 ${className}`}
        >
            {children}
        </table>
    );
}

export const GenericTableHeader = <T, >({
                                            columns,
                                            hasAction = false,
                                        }: {
    columns: Column<T>[];
    hasAction?: boolean;
}) => {
    return (
        <thead>
        <tr className="text-left">
            {columns.map((column) => (
                <th
                    key={String(column.key)}
                    scope="col"
                    className="
                            border-b border-border
                            px-4 py-3
                            text-xs font-semibold
                            uppercase tracking-wide
                            text-textMuted
                        "
                >
                    {column.label}
                </th>
            ))}

            {hasAction && (
                <th
                    scope="col"
                    className="
                            border-b border-border
                            px-4 py-3
                            text-right
                            text-xs font-semibold
                            uppercase tracking-wide
                            text-textMuted
                        "
                >
                    Action
                </th>
            )}
        </tr>
        </thead>
    );
};

export const GenericTableBody = <T extends { id: string }>({
                                                               data,
                                                               columns,
                                                               isLoading,
                                                               renderAction,
                                                           }: {
    data: T[];
    columns: Column<T>[];
    isLoading: boolean;
    renderAction?: (record: T) => ReactNode;
}) => {
    const colSpan = columns.length + (renderAction ? 1 : 0);
    if (isLoading && data.length === 0) {
        return (
            <tbody aria-label="Loading">
            {Array.from({length: 5}).map((_, row) => (
                <tr key={row} className="animate-pulse">
                    {Array.from({length: colSpan}).map((_, col) => (
                        <td
                            key={col}
                            className="border-b border-border py-3 pr-4"
                        >
                            <div className="h-4 w-full max-w-[140px] rounded bg-border"/>
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        );
    }

    return (
        <tbody>
        {data.length === 0 ? (
            <tr>
                <td
                    colSpan={colSpan}
                    className="py-10 text-center text-sm text-textMuted"
                >
                    No records found.
                </td>
            </tr>
        ) : (
            data.map((record) => (
                <GenericRow key={record.id}>
                    {columns.map((column) => (
                        <td
                            key={String(column.key)}
                            className="border-b border-border py-3 pr-4"
                        >
                            {column.render
                                ? column.render(
                                    record[column.key],
                                    record
                                )
                                : formatCellValue(record[column.key])}
                        </td>
                    ))}

                    {renderAction && (
                        <td className="border-b border-border py-3 text-right">
                            {renderAction(record)}
                        </td>
                    )}
                </GenericRow>
            ))
        )}

        {isLoading && data.length > 0 && (
            <tr className="animate-pulse" aria-label="Loading more">
                <td
                    colSpan={colSpan}
                    className="py-3"
                >
                    <div className="mx-auto h-3 w-32 rounded bg-border"/>
                </td>
            </tr>
        )}
        </tbody>
    );
};

function formatCellValue(value: unknown): string {
    if (value === null || value === undefined || value === "") {
        return "—";
    }

    return String(value);
}

function GenericRow({children}: { children: ReactNode }) {
    return (
        <tr className="group transition-colors duration-150 hover:bg-primary/[0.03]">
            {children}
        </tr>
    );
}


