import { useState } from "react";
import {CreateToothRequest} from "/@/api/schema/DentalSchema";
import {PatientProfile} from "/@/api/schema/PatientSchema";

export function useDentalRecordForm() {
    const [selectedStudent, setSelectedStudent] = useState<PatientProfile | null>(null);
    const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
    const [toothRecords, setToothRecords] = useState<
        Record<number, CreateToothRequest>
    >({});

    const openTooth = (toothNumber: number) => {
        setSelectedTooth(toothNumber);
    };

    const closeTooth = () => {
        setSelectedTooth(null);
    };

    const saveTooth = (record: CreateToothRequest) => {
        if (selectedTooth === null) return;

        setToothRecords((previous) => ({
            ...previous,
            [selectedTooth]: record,
        }));

        closeTooth();
    };

    const clearTooth = () => {
        if (selectedTooth === null) return;

        setToothRecords((previous) => {
            const next = { ...previous };

            delete next[selectedTooth];

            return next;
        });

        closeTooth();
    };

    return {
        selectedStudent,
        setSelectedStudent,

        selectedTooth,
        toothRecords,

        openTooth,
        closeTooth,
        saveTooth,
        clearTooth,
    };
}