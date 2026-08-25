import React from "react";
import { Plus, Trash2 } from "lucide-react";

const inputClasses =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20";

function Cell({ column, row, onChangeField }) {
  const value = row[column.key] ?? "";
  const handleChange = (e) => onChangeField(row.id, column.key, e.target.value);

  if (column.type === "textarea") {
    return (
      <textarea
        rows={column.rows ?? 2}
        placeholder={column.placeholder}
        value={value}
        onChange={handleChange}
        className={`resize-none ${inputClasses}`}
      />
    );
  }

  if (column.type === "select") {
    return (
      <select value={value} onChange={handleChange} className={inputClasses}>
        <option value="" disabled>
          {column.placeholder ?? "Select..."}
        </option>
        {(column.options ?? []).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  // default: text, date, number, etc. — anything a plain <input type="..."> handles
  return (
    <input
      type={column.type ?? "text"}
      placeholder={column.placeholder}
      value={value}
      onChange={handleChange}
      className={inputClasses}
    />
  );
}

export function EditableRowsTable({
  columns,
  rows,
  onChangeField,
  onAddRow,
  onRemoveRow,
  disableAdd = false,
  disableRemove = false,
  addLabel = "Add Row",
}) {
  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onAddRow}
          disabled={disableAdd}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-textSecondary transition-colors duration-200 hover:bg-background disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          {addLabel}
        </button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border bg-background text-left">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${column.width ?? ""} p-3 text-xs font-semibold uppercase tracking-wide text-textSecondary`}
                >
                  {column.header}
                </th>
              ))}
              <th className="w-12 p-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-border last:border-b-0 ${index % 2 === 1 ? "bg-background/40" : ""}`}
              >
                {columns.map((column) => (
                  <td key={column.key} className="p-2 align-top">
                    <Cell column={column} row={row} onChangeField={onChangeField} />
                  </td>
                ))}
                <td className="p-2 align-top text-center">
                  <button
                    type="button"
                    aria-label="Remove row"
                    onClick={() => onRemoveRow(row.id)}
                    disabled={disableRemove}
                    className="rounded-lg p-2 text-textMuted transition-colors duration-200 hover:bg-background hover:text-danger disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-textMuted"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={2} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
