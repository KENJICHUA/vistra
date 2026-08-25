import {ChevronRight, FileX2} from "lucide-react";
import React, {useMemo} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {StatusBadge} from "./statusbadge.jsx";
import {avatarColor, getInitials, getTypeIcon} from "./avatar.jsx";
import {filterByQuery} from "../utils/FilterByQuery.js";
import PanelHeader from "./PanelHeader.jsx";
import {LinkButton} from "./Button.jsx";

export const RecordsTablePanel = ({
                                      name,
                                      data,
                                      columns,
                                      createRecordPath,
                                      icon: Icon,
                                      showCreate = true,
                                      createDisabled = false,
                                      renderRow = (data) => <GenericRow data={data} />,
                                  }) => {
    const { searchQuery } = useOutletContext();

    const filteredData = useMemo(
        () => filterByQuery(data, searchQuery, columns),
        [data, searchQuery, columns]
    );

    return (
        <div className="rounded-2xl border border-border bg-surface shadow-card">
            <div className="p-6">
                <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                        <PanelHeader
                            title={`${name} Records`}
                            icon={Icon}
                            action={
                                showCreate ? (
                                    <LinkButton
                                        title={`New ${name} Record`}
                                        route={createRecordPath}
                                        disabled={createDisabled}
                                    />
                                ) : null
                            }
                        />

                        <p className="mt-0.5 text-xs text-textMuted">
                            {filteredData.length}{" "}
                            {filteredData.length === 1 ? "record" : "records"}
                            {searchQuery ? ` matching "${searchQuery}"` : " on file"}
                        </p>
                    </div>
                </div>

                <div className="mt-5 border-t border-border pt-4">
                    <div className="overflow-x-auto">
                        <GenericTable
                            data={filteredData}
                            columns={columns}
                            renderRow={renderRow}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const GenericTable = ({ data, columns, renderRow }) => {
    return (
        <table className="w-full min-w-[640px] border-separate border-spacing-0">
            <GenericTableHeader columns={columns} />
            <GenericTableBody
                data={data}
                colSpan={columns.length}
                renderRow={renderRow}
                emptyState={
                    <div className="flex flex-col items-center gap-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-textMuted/10 text-textMuted">
                            <FileX2 className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <p className="text-sm text-textMuted">
                            No records match your search.
                        </p>
                    </div>
                }
            />
        </table>
    );
};

export const GenericTableBody = ({ data, colSpan, renderRow, emptyState }) => {
    if (data.length === 0) {
        return (
            <tbody>
            <tr>
                <td colSpan={colSpan}>{emptyState}</td>
            </tr>
            </tbody>
        );
    }

    return (
        <tbody>
        {data.map((record) => (
            <React.Fragment key={record.id}>
                {renderRow(record)}
            </React.Fragment>
        ))}
        </tbody>
    );
};

const GenericTableHeader = ({ columns }) => {
    return (
        <thead>
        <tr className="text-left">
            {columns.map((col) => (
                <th
                    key={col}
                    className="border-b border-border pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-textMuted"
                >
                    {col}
                </th>
            ))}
            <th className="border-b border-border pb-2" />
        </tr>
        </thead>
    );
};


export function GenericRow({ data, viewRecordPath }) {
    const navigate = useNavigate();
    const TypeIcon = getTypeIcon(data.type);

    return (
        <tr className="group transition-colors duration-150 hover:bg-primary/[0.03]">
            <td className="border-b border-border py-3 pr-4">
                <div className="flex items-center gap-2.5">
                    <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${avatarColor(
                            data.student
                        )}`}
                    >
                        {getInitials(data.student)}
                    </span>
                    <span className="text-sm font-medium text-textPrimary">
                        {data.student}
                    </span>
                </div>
            </td>

            <td className="border-b border-border py-3 pr-4 text-sm text-textSecondary">
                {data.course}
            </td>

            <td className="border-b border-border py-3 pr-4 text-sm text-textSecondary">
                {data.time}
            </td>

            <td className="border-b border-border py-3 pr-4">
                <div className="flex items-center gap-1.5 text-sm text-textSecondary">
                    <TypeIcon className="h-3.5 w-3.5 shrink-0 text-textMuted" strokeWidth={2} />
                    {data.type}
                </div>
            </td>

            <td className="border-b border-border py-3 pr-4">
                <StatusBadge status={data.status} />
            </td>

            <td className="border-b border-border py-3 text-right">
                <button
                    type="button"
                    onClick={() => navigate(viewRecordPath)}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-primary transition-colors duration-150 hover:bg-primary/10 hover:text-primaryDark"
                >
                    View
                    <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
            </td>
        </tr>
    );
}