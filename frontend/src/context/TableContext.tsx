import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from "react";

export type Filters<T> =
    Partial<Record<keyof T, string | null>>;

interface TableContextValue<T> {
    search: string;
    setSearch: (value: string) => void;

    filters: Filters<T>;
    setFilter: (
        key: keyof T,
        value: string | null,
    ) => void;
    clearFilters: () => void;

    page: number;
    pageSize: number;

    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;

    nextPage: () => void;
    previousPage: () => void;
    goToPage: (page: number) => void;

    run: () => void;
}

const TableContext =
    createContext<TableContextValue<any> | undefined>(
        undefined,
    );

interface TableProviderProps<T> {
    children: React.ReactNode;

    onRun?: (
        search: string,
        filters: Filters<T>,
        page: number,
        pageSize: number,
    ) => void;
}

export function TableProvider<T>({
                                     children,
                                     onRun,
                                 }: TableProviderProps<T>) {

    const [search, setSearchState] = useState("");

    const [filters, setFilters] =
        useState<Filters<T>>({});

    const [page, setPageState] = useState(1);

    const [pageSize, setPageSizeState] =
        useState(10);

    /*
     * Latest onRun in a ref so stable callbacks below never
     * capture a stale closure. Parents pass inline closures,
     * so onRun identity changes every render.
     */
    const onRunRef = useRef(onRun);
    onRunRef.current = onRun;

    /*
     * Mirror state in refs so run() always reads current
     * values even though its identity is stable.
     */
    const searchRef = useRef(search);
    searchRef.current = search;

    const filtersRef = useRef(filters);
    filtersRef.current = filters;

    const pageRef = useRef(page);
    pageRef.current = page;

    const pageSizeRef = useRef(pageSize);
    pageSizeRef.current = pageSize;

    /*
     * Run the query using the supplied pagination values.
     *
     * This is important because React state updates are
     * asynchronous. We don't want to do:
     *
     * setPage(2);
     * run();
     *
     * because run() could still see page === 1.
     */
    const execute = useCallback(
        (
            newPage: number = page,
            newPageSize: number = pageSize,
        ) => {
            onRun?.(
                search,
                filters,
                newPage,
                newPageSize,
            );
        },
        [
            search,
            filters,
            page,
            pageSize,
            onRun,
        ],
    );

    /*
     * Search
     *
     * Changing the search resets pagination to page 1.
     */
    const setSearch = useCallback(
        (value: string) => {
            setSearchState(value);
            setPageState(1);
        },
        [],
    );

    /*
     * Filter
     *
     * Changing a filter resets pagination to page 1 and
     * immediately fires the query with the next values
     * (state updates are async, so run() would see stale state).
     */
    const setFilter = useCallback(
        (
            key: keyof T,
            value: string | null,
        ) => {
            const nextFilters = {
                ...filtersRef.current,
                [key]: value,
            };

            setFilters(nextFilters);
            setPageState(1);

            onRunRef.current?.(
                searchRef.current,
                nextFilters,
                1,
                pageSizeRef.current,
            );
        },
        [],
    );

    /*
     * Clear search + filters
     * and return to page 1.
     */
    const clearFilters = useCallback(() => {
        setFilters({});
        setSearchState("");
        setPageState(1);

        onRunRef.current?.(
            "",
            {},
            1,
            pageSizeRef.current,
        );
    }, []);

    /*
     * Go directly to a page.
     */
    const goToPage = useCallback(
        (newPage: number) => {
            if (newPage < 1) {
                return;
            }

            setPageState(newPage);

            execute(newPage, pageSize);
        },
        [
            execute,
            pageSize,
        ],
    );

    /*
     * Go to the next page.
     */
    const nextPage = useCallback(() => {
        const newPage = page + 1;

        setPageState(newPage);

        execute(newPage, pageSize);
    }, [
        page,
        pageSize,
        execute,
    ]);

    /*
     * Go to the previous page.
     */
    const previousPage = useCallback(() => {
        if (page <= 1) {
            return;
        }

        const newPage = page - 1;

        setPageState(newPage);

        execute(newPage, pageSize);
    }, [
        page,
        pageSize,
        execute,
    ]);

    /*
     * Change page size.
     *
     * Changing page size resets to page 1.
     */
    const setPageSize = useCallback(
        (newPageSize: number) => {
            if (newPageSize < 1) {
                return;
            }

            setPageSizeState(newPageSize);
            setPageState(1);

            execute(1, newPageSize);
        },
        [execute],
    );

    /*
     * Manually run the current query.
     *
     * Stable identity: reads latest state from refs.
     * Used by TableFilters / debounced search.
     */
    const run = useCallback(() => {
        onRunRef.current?.(
            searchRef.current,
            filtersRef.current,
            pageRef.current,
            pageSizeRef.current,
        );
    }, []);

    const contextValue =
        useMemo<TableContextValue<T>>(
            () => ({
                search,
                setSearch,

                filters,
                setFilter,
                clearFilters,

                page,
                pageSize,

                setPage: goToPage,
                setPageSize,

                nextPage,
                previousPage,
                goToPage,

                run,
            }),
            [
                search,
                setSearch,

                filters,
                setFilter,
                clearFilters,

                page,
                pageSize,

                setPageSize,
                nextPage,
                previousPage,
                goToPage,

                run,
            ],
        );

    return (
        <TableContext.Provider value={contextValue}>
            {children}
        </TableContext.Provider>
    );
}

export function useTableContext<T>(): TableContextValue<T> {
    const context = useContext(TableContext);

    if (!context) {
        throw new Error(
            "useTableContext must be used within a TableProvider",
        );
    }

    return context;
}