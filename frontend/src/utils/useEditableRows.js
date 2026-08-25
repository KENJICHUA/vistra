import { useCallback, useRef, useState } from "react";

export function useEditableRows(createEmptyRow, minRows = 1) {
  const nextId = useRef(0);

  const makeRow = useCallback(() => {
    nextId.current += 1;
    return { id: `row-${nextId.current}`, ...createEmptyRow() };
  }, [createEmptyRow]);

  const [rows, setRows] = useState(() => Array.from({ length: minRows }, makeRow));

  const addRow = useCallback(() => {
    setRows((prev) => [...prev, makeRow()]);
  }, [makeRow]);

  const removeRow = useCallback(
    (id) => {
      setRows((prev) => (prev.length > minRows ? prev.filter((row) => row.id !== id) : prev));
    },
    [minRows]
  );

  const updateRow = useCallback((id, field, value) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  }, []);

  const resetRows = useCallback(() => {
    setRows(Array.from({ length: minRows }, makeRow));
  }, [makeRow, minRows]);

  return { rows, addRow, removeRow, updateRow, resetRows };
}