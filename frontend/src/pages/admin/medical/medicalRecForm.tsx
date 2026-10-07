import {useState, type FormEvent} from "react";
import {Save, ArrowLeft, User, ClipboardList, Info} from "lucide-react";
import {emptyDetails, type as visitTypeOptions} from "./medicalData";
import {statusEditFields} from "/@/components/editModal.jsx";
import {ReadOnlyField} from "/@/utils/ReadOnlyField";
import {StudentCombobox} from "/@/utils/StudentComboBox";
import {FieldLabel} from "/@/utils/FieldLabel";
import {EditableRowsTable} from "/@/utils/EditableRowsTable";
import {useEditableRows} from "/@/utils/useEditableRows";
import type {PatientProfile} from "/@/api/schema/PatientSchema";
import type {
    CreateMedicalVisit,
    MedicalVisitLog,
} from "/@/api/schema/MedicalSchema";
import {useCreateMedicalVisit} from "/@/hooks/query/MedicalQuery";
import {sessionManager} from "/@/utils/SessionManager";
import {getFieldErrors} from "/@/utils/Formatters";

const statusField = statusEditFields.find(
    (field: { key: string }) => field.key === "status"
);
const statusOptions: string[] = statusField?.options ?? [];

interface VisitLogColumn {
    key: string;
    header: string;
    type: string;
    width?: string;
    placeholder?: string;
}

const visitLogColumns: VisitLogColumn[] = [
    {key: "date", header: "Date", type: "date", width: "w-40"},
    {
        key: "complaint",
        header: "Complaint / Findings",
        type: "textarea",
        placeholder: "e.g. Fever, headache since morning"
    },
    {key: "treatment", header: "Treatment", type: "textarea", placeholder: "e.g. Paracetamol 500mg, rest advised"},
];

interface VisitFormRow extends MedicalVisitLog {
    date: string;
}

const emptyVisitRow = (): VisitFormRow => ({
    date: "",
    complaint: "",
    treatment: "",
});

interface PatientRecordFormProps {
    onSave?: (record: CreateMedicalVisit) => void;
}

export default function PatientRecordForm({onSave}: PatientRecordFormProps) {
    const [selectedStudent, setSelectedStudent] = useState<PatientProfile | null>(null);
    const [visitType, setVisitType] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const {rows: visitRows, addRow, removeRow, updateRow, resetRows} = useEditableRows(emptyVisitRow, 1);
    const createMedicalVisitMutation = useCreateMedicalVisit();

    const details = selectedStudent
        ? {
            course: selectedStudent.course ?? selectedStudent.department ?? "N/A",
            address: selectedStudent.complete_address ?? "N/A",
            barangay: selectedStudent.barangay ?? "N/A",
            age: selectedStudent.age != null ? String(selectedStudent.age) : "N/A",
            mobile_number: selectedStudent.contact_no ?? "N/A",
            sex: selectedStudent.sex ?? "N/A",
            birthday: selectedStudent.birthday ?? "N/A",
            civil_status: selectedStudent.civil_status ?? "N/A",
            year_section:
                [selectedStudent.school_year, selectedStudent.section]
                    .filter(Boolean)
                    .join(" - ") || "N/A",
        }
        : null;

    const handleBack = (): void => {
        if (typeof window !== "undefined") window.history.back();
    };

    const handleClear = (): void => {
        setSelectedStudent(null);
        setVisitType("");
        setStatus("");
        resetRows();
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!selectedStudent) return;

        const staffId = sessionManager.getUser()?.user_id ?? "";
        if (!staffId) {
            console.error("Failed to create medical visit: no staff session found.");
            return;
        }

        const logRows = visitRows.filter(
            (row) => row.date || row.complaint || row.treatment
        );

        const record: CreateMedicalVisit = {
            patient_id: selectedStudent.patient_id,
            staff_id: staffId,
            status,
            type: visitType,
            visit_date: logRows[0]?.date || new Date().toISOString(),
            visit_log: logRows.map((row) => ({
                complaint: row.complaint,
                treatment: row.treatment,
            })),
        };

        if (onSave) onSave(record);

        createMedicalVisitMutation.mutate(record, {
            onSuccess: (data) => {
                console.log("Medical visit created:", data);
                handleClear();
                handleBack();
            },
            onError: (error) => {
                console.error("Failed to create medical visit:", getFieldErrors(error));
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}
              className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-surface p-8 shadow-lg">
            <div className="mb-5 flex items-center gap-3 border-b border-border pb-6">
                <div>
                    <h1 className="font-heading text-xl font-semibold text-primaryDark">Patient Medical Record</h1>
                    <p className="mt-0.5 text-xs text-textMuted">To be completed by the attending doctor or nurse.</p>
                </div>
            </div>

            {!selectedStudent && (
                <div
                    className="mb-6 flex items-start gap-1.5 rounded-xl border border-info/30 bg-info/5 px-3.5 py-2.5 text-xs text-info">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2}/>
                    <span>Search and select an existing student to auto-fill their personal information. If the student is not found, please add them first.</span>
                </div>
            )}

            <div className="mb-4 flex items-center gap-2">
                <User className="h-4 w-4 text-primary" strokeWidth={2}/>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <StudentCombobox selectedStudent={selectedStudent} onSelect={setSelectedStudent}/>
                <ReadOnlyField id="course" label="Course" value={details?.course} placeholder="Select a student first"/>
                <ReadOnlyField id="address" label="Address" value={details?.address} placeholder="Select a student first"/>
                <ReadOnlyField id="barangay" label="Barangay" value={details?.barangay} placeholder="Select a student first"/>
                <ReadOnlyField id="age" label="Age" value={details?.age} placeholder="Select a student first"/>
                <ReadOnlyField id="mobile_number" label="Mobile Number" value={details?.mobile_number} placeholder="Select a student first"/>
                <ReadOnlyField id="sex" label="Sex" value={details?.sex} placeholder="Select a student first"/>
                <ReadOnlyField id="birthday" label="Birthday" value={details?.birthday} placeholder="Select a student first"/>
                <ReadOnlyField id="civil_status" label="Civil Status" value={details?.civil_status} placeholder="Select a student first"/>
                <ReadOnlyField id="year_section" label="Year and Section" value={details?.year_section} placeholder="Select a student first"/>

                <div>
                    <FieldLabel htmlFor="type">Type</FieldLabel>
                    <select
                        id="type"
                        name="type"
                        value={visitType}
                        onChange={(e) => setVisitType(e.target.value)}
                        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-textPrimary transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="" disabled>Select Type</option>
                        {visitTypeOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <FieldLabel htmlFor="status">Status</FieldLabel>
                    <select
                        id="status"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-textPrimary transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="" disabled>Select Status</option>
                        {statusOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-10">
                <div className="mb-0 flex items-center gap-2 border-t border-border pt-6">
                    <ClipboardList className="h-4 w-4 text-primaryDark" strokeWidth={2}/>
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">Visit Log</h2>
                </div>

                <EditableRowsTable
                    columns={visitLogColumns}
                    rows={visitRows}
                    onChangeField={updateRow}
                    onAddRow={addRow}
                    onRemoveRow={removeRow}
                    disableAdd={!selectedStudent}
                    disableRemove={visitRows.length === 1}
                />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
                <button type="button" onClick={handleBack}
                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-textSecondary transition-colors duration-200 hover:bg-background hover:text-textPrimary">
                    <ArrowLeft className="h-4 w-4" strokeWidth={2}/>
                    Back
                </button>

                <div className="flex items-center gap-3">
                    <button type="button" onClick={handleClear}
                            className="rounded-xl px-4 py-2.5 text-sm font-medium text-textSecondary transition-colors duration-200 hover:bg-background hover:text-textPrimary">
                        Clear
                    </button>

                    <button type="submit" disabled={!selectedStudent || createMedicalVisitMutation.isPending}
                            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary">
                        <Save className="h-4 w-4" strokeWidth={2}/>
                        {createMedicalVisitMutation.isPending ? "Saving..." : "Save Record"}
                    </button>
                </div>
            </div>

            <div className="mt-6 flex items-start justify-center gap-1.5 text-center text-xs text-info">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2}/>
                <span>Please ensure all information is accurate before saving. This record will be stored in the system for future reference.</span>
            </div>
        </form>
    );
}
