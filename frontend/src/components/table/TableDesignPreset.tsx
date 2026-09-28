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
    page?: number
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
                                                                 page
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
                                                           totalPages
                                                       }: Omit<TablePresetProps<T>, "onRun">) {

    const {
        goToPage,
    } = useTableContext<T>();
    return (
        <div className="rounded-2xl border border-border bg-surface shadow-card">
            <div className="p-6">

                <PanelHeader
                    title={title}
                    icon={Icon}
                    action={panelAddon}
                />

                <div className="border-t border-border mt-3"/>

                <div className="relative overflow-visible">
                    <TableFilters
                        columns={columns}
                    />
                </div>

                <div className="border-t border-border"/>

                <GenericTable>
                    <GenericTableHeader
                        columns={columns}
                        hasAction
                    />

                    <GenericTableBody
                        data={data}
                        columns={columns}
                        renderAction={renderAction}
                        isLoading={isLoading}
                    />
                </GenericTable>

                <div className="flex justify-center">
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, newPage) => goToPage(newPage)}
                        defaultPage={page}
                    />
                </div>

            </div>
        </div>
    );
}