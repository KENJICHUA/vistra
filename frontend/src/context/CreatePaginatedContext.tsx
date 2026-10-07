import {
    createContext,
    useContext,
    useMemo,
    type ReactNode,
} from "react";

import type { UseQueryResult } from "@tanstack/react-query";
import type { PaginatedData } from "/@/api/schema/ApiResponseSchema";

interface PaginatedContextValue<T> {
    items: T[];

    total: number;
    page: number;
    pageSize: number;
    totalPages: number;

    isLoading: boolean;
    isFetching: boolean;
    error: Error | null;

    refetch: () => void;
}

interface PaginatedProviderProps<T> {
    children: ReactNode;
    query: UseQueryResult<PaginatedData<T>, Error>;
}

export function createPaginatedContext<T>() {

    const Context = createContext<
        PaginatedContextValue<T> | undefined
    >(undefined);

    function Provider({
                          children,
                          query,
                      }: PaginatedProviderProps<T>) {

        const {
            data,
            isLoading,
            isFetching,
            error,
            refetch,
        } = query;

        const value = useMemo(
            () => ({
                items: data?.items ?? [],

                total: data?.total ?? 0,
                page: data?.page ?? 1,
                pageSize: data?.page_size ?? 10,
                totalPages: data?.total_pages ?? 0,

                isLoading,
                isFetching,
                error,

                refetch: () => {
                    void refetch();
                },
            }),
            [
                data,
                isLoading,
                isFetching,
                error,
                refetch,
            ]
        );

        return (
            <Context.Provider value={value}>
                {children}
            </Context.Provider>
        );
    }

    function usePaginatedContext() {
        const context = useContext(Context);

        if (!context) {
            throw new Error(
                "usePaginatedContext must be used inside its Provider"
            );
        }

        return context;
    }

    return {
        Provider,
        usePaginatedContext,
    };
}