import React from "react";
import {Pagination} from "@mui/material";

import PanelHeader from "/@/components/PanelHeader";
import {TableFilters} from "/@/components/Filters";
import {
    Column,
    GenericTable,
    GenericTableBody,
    GenericTableHeader,
} from "/@/components/table/Table";
import {Filters, TableProvider, useTableContext} from "/@/context/TableContext";

interface TablePresetProps<T> {
    title: string,
    icon: React.ComponentType<{ className?: string }>,
    panelAddon?: React.ReactNode,
    data: T[],
    isLoading: boolean,
    columns: Column<T>[],
    renderAction?: (row: T) => React.ReactNode,
    onRun?: (
        search: string,
        filters: Filters<T>,
        page: number,
        pageSize: number,
    ) => void,
    totalPages?: number,
    page?: number,
    showFilters?: boolean,
    showPagination?: boolean,
    fillHeight?: boolean
}

export function DefaultTablePreset<T extends { id: string }>({
                                                                 title,
                                                                 icon: Icon,
                                                                 panelAddon,
                                                                 data,
                                                                 isLoading,
                                                                 columns,
                                                                 renderAction,
                                                                 onRun,
                                                                 totalPages,
                                                                 page,
                                                                 showFilters = true,
                                                                 showPagination = true,
                                                                 fillHeight = false
                                                             }: TablePresetProps<T>) {

    return (
        <TableProvider<T> onRun={onRun}>
            <DefaultTableContent
                totalPages={totalPages}
                page={page}
                title={title}
                icon={Icon}
                isLoading={isLoading}
                panelAddon={panelAddon}
                data={data}
                columns={columns}
                renderAction={renderAction}
                showFilters={showFilters}
                showPagination={showPagination}
                fillHeight={fillHeight}
            />
        </TableProvider>
    );
}

function DefaultTableContent<T extends { id: string }>({
                                                           title,
                                                           icon: Icon,
                                                           panelAddon,
                                                           data,
                                                           isLoading,
                                                           columns,
                                                           renderAction,
                                                           page,
                                                           totalPages,
                                                           showFilters = true,
                                                           showPagination = true,
                                                           fillHeight = false
                                                       }: Omit<TablePresetProps<T>, "onRun">) {

    const {
        goToPage,
    } = useTableContext<T>();

    return (
        <div
            className={`rounded-2xl border border-border bg-surface shadow-card ${
                fillHeight ? "flex h-full flex-col overflow-hidden" : ""
            }`}
        >
            <div className={`p-6 ${fillHeight ? "flex min-h-0 flex-1 flex-col" : ""}`}>

                <PanelHeader
                    title={title}
                    icon={Icon}
                    action={panelAddon}
                />

                <div className="mt-3 border-t border-border"/>

                {showFilters && (
                    <>
                        <div className="relative overflow-visible">
                            <TableFilters
                                columns={columns}
                            />
                        </div>

                        <div className="border-t border-border"/>
                    </>
                )}

                <div className={fillHeight ? "min-h-0 flex-1 overflow-y-auto" : ""}>
                    <GenericTable>
                        <GenericTableHeader
                            columns={columns}
                            hasAction={Boolean(renderAction)}
                        />

                        <GenericTableBody
                            data={data}
                            columns={columns}
                            renderAction={renderAction}
                            isLoading={isLoading}
                        />
                    </GenericTable>
                </div>

                {showPagination && (
                    <div className="flex justify-center">
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, newPage) => goToPage(newPage)}
                            defaultPage={page}
                        />
                    </div>
                )}

            </div>
        </div>
    );
}