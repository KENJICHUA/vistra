import {useState} from "react";
import {ArrowLeft, Save, Stethoscope, Info} from "lucide-react";
import {FieldLabel} from "/@/utils/FieldLabel.jsx";
import {ToothArch, upperTeeth, lowerTeeth} from "/@/components/teethDesign.jsx";
import {FormInput} from "/@/components/InputCollection.jsx";
import {CheckboxRow} from "/@/utils/CheckboxRow.jsx";
import {StudentInfoSection} from "/@/components/StudentInfoSection.jsx";
import {students} from "../medical/medicalData";
import {ToothNoteModal} from "/@/components/dental/ToothForm";
import {useDentalRecordForm} from "/@/hooks/DentalForms";
import {getFieldErrors, removeEmptyValues} from "/@/utils/Formatters";
import {useCreateDentalVisit} from "/@/hooks/DentalQuery";
import {CreateDentalVisit} from "/@/api/schema/DentalSchema";
import {sessionManager} from "/@/utils/SessionManager";
import {statusEditFields} from "/@/components/editModal.jsx";

const statusOptions = statusEditFields.find((f) => f.key === "status").options;

const medicalHistoryItems = ["Allergy", "Asthma", "Bleeder", "Diabetes", "Epilepsy", "Heart Disease", "Hypertension", "Others"];

const oralStatusRows = ["Date of Oral Examination", "Dental Caries", "Gingivitis / Periodontal Disease", "Debris", "Calculus", "Cleft Lip / Palate", "Others (Supernumerary/Mesiodens)", "No. of Permanent Teeth Present", "No. of Permanent Sound Present", "No. of Decayed Teeth (D)", "No. of Missing Teeth (M)", "No. of Filled Teeth (F)", "No. of Teeth for Extraction (X)", "No. of DMFX Teeth", "No. of Temporary Teeth Present"];

const  dentalStudentFields = [
    {id: "age", label: "Age"},
    {id: "sex", label: "Gender"},
    {id: "year_section", label: "Year and section / course / department", span: "sm:col-span-3"},
];


function DentalConditionSection() {
    return (
        <>
            <div className="mt-8 grid grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-2">
                <div>
                    <FieldLabel htmlFor="calculus_severity">Calculus</FieldLabel>
                    <div className="flex flex-wrap items-center gap-4 pt-1">
                        {["Light", "Moderate", "Heavy"].map((option) => (
                            <label key={option} className="flex items-center gap-1.5 text-sm text-textPrimary">
                                <input type="radio" name="calculus_severity" value={option}
                                       className="h-4 w-4 border-border text-primary focus:ring-primary/30"/>
                                {option}
                            </label>
                        ))}
                    </div>
                </div>

                <FormInput
                    id="current_medication"
                    name="current_medication"
                    label="Medication"
                    placeholder="List current medications"
                />
            </div>

            <div className="mt-6">
                <FieldLabel htmlFor="notes">
                    Notes
                </FieldLabel>

                <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="Additional observations"
                    className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
            </div>
        </>
    );
}

function RecordFormFooter({onBack,}: { onBack: () => void }) {
    return (
        <>
            <div className="mt-6 flex items-start justify-center gap-1.5 text-center text-xs text-info">
                <Info
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    strokeWidth={2}
                />

                <span>
                    Please ensure all information is accurate before saving.
                    This record will be stored in the system for future
                    reference.
                </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-textSecondary transition-colors duration-200 hover:bg-background hover:text-textPrimary"
                >
                    <ArrowLeft
                        className="h-4 w-4"
                        strokeWidth={2}
                    />

                    Back
                </button>

                <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primaryDark"
                >
                    <Save
                        className="h-4 w-4"
                        strokeWidth={2}
                    />

                    Save Record
                </button>
            </div>
        </>
    );
}

function OralHealthStatusSection() {
    return (
        <section className="mt-8 border-t border-border pt-6">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary">
                Oral health status
            </h2>

            <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="border-b border-border bg-background text-left">
                        <th className="p-3 text-xs font-semibold uppercase tracking-wide text-textSecondary">Item</th>
                        <th className="w-28 p-3 text-xs font-semibold uppercase tracking-wide text-textSecondary">Age</th>
                        <th className="w-28 p-3 text-xs font-semibold uppercase tracking-wide text-textSecondary">Age</th>
                        <th className="w-28 p-3 text-xs font-semibold uppercase tracking-wide text-textSecondary">Age</th>
                        <th className="w-28 p-3 text-xs font-semibold uppercase tracking-wide text-textSecondary">Age</th>
                    </tr>
                    </thead>

                    <tbody>
                    {oralStatusRows.map((row, index) => {
                        const fieldName = row
                            .toLowerCase()
                            .replace(/[()./]/g, "")
                            .replace(/[^a-z0-9]+/g, "_")
                            .replace(/^_|_$/g, "");

                        return (
                            <tr key={row}
                                className={`border-b border-border last:border-b-0 ${index % 2 === 1 ? "bg-background/40" : ""}`}>
                                <td className="p-3 text-sm text-textPrimary">{row}</td>
                                {[1, 2, 3, 4].map((column) => (
                                    <td key={column} className="p-3">
                                        <input name={`${fieldName}_${column}`} type="text"
                                               className="w-full rounded-lg border border-textPrimary bg-surface px-2 py-1.5 text-sm text-textPrimary focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"/>
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function MedicalHistorySection() {
    return (
        <section className="mt-8 border-t border-border pt-6">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary">
                Medical history
            </h2>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                {medicalHistoryItems.map((item) => (
                    <CheckboxRow
                        key={item}
                        label={item}
                    />
                ))}
            </div>
        </section>
    );
}

function TemporaryLegend() {
    return (
        <div>
            <p className="mb-4 font-semibold uppercase tracking-wide text-primary">
                Temporary
            </p>

            <ul className="space-y-1 text-textPrimary">
                <li>/</li>
                <li>d</li>
                <li>f</li>
                <li>m</li>
                <li>x</li>
                <li>un</li>
                <li>s</li>
                <li>jc</li>
                <li>p</li>
            </ul>

            <div className="mt-4 space-y-0.5 text-textSecondary">
                <p>S — Sealant</p>
                <p>PF — Permanent fill</p>
                <p>TF — Temporary fill</p>
                <p>X — Extracted</p>
            </div>
        </div>
    );
}

function PermanentLegend() {
    return (
        <div>
            <p className="mb-4 font-semibold uppercase tracking-wide text-primary">
                Permanent
            </p>

            <ul className="space-y-1 text-textPrimary">
                <li>/ — Sound</li>
                <li>D — Decayed</li>
                <li>F — Filled</li>
                <li>M — Missing</li>
                <li>X — Indicated for extraction</li>
                <li>Un — Unerupted</li>
                <li>Sn — Supernumerary tooth</li>
                <li>JC — Jacket crown</li>
                <li>P — Pontic</li>
            </ul>

            <div className="mt-4 space-y-0.5 text-textSecondary">
                <p>Decayed — red</p>
                <p>Perm. filling — blue</p>
            </div>
        </div>
    );
}

function OdontogramLegend() {
    return (
        <div className="mt-4 grid grid-cols-2 gap-6 rounded-xl border border-border p-4 text-xs">
            <PermanentLegend/>
            <TemporaryLegend/>
        </div>
    );
}

interface OdontogramSectionProps {
    records: Record<string, unknown>;
    onToothClick: (toothNumber: number) => void;
}

function OdontogramSection({
                               records,
                               onToothClick,
                           }: OdontogramSectionProps) {
    return (
        <section className="mt-8 border-t border-border pt-6">
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-primaryDark">
                Odontogram
            </h2>

            <p className="mb-4 text-xs text-textMuted">
                Click a tooth to record its dentition, condition, and notes.
            </p>

            <div className="overflow-x-auto rounded-xl border border-border bg-background/40 p-6">
                <div className="mb-2 flex justify-center">
                    <ToothArch
                        teeth={upperTeeth}
                        flip={false}
                        records={records}
                        onToothClick={onToothClick}
                    />
                </div>

                <div className="mx-auto my-3 h-px w-full max-w-2xl bg-border"/>

                <div className="mt-2 flex justify-center">
                    <ToothArch
                        teeth={lowerTeeth}
                        flip={true}
                        records={records}
                        onToothClick={onToothClick}
                    />
                </div>
            </div>

            <OdontogramLegend/>
        </section>
    );
}

function DentalRecordHeader() {
    return (
        <div className="mb-8 flex items-center gap-3 border-b border-border pb-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Stethoscope
                    className="h-5 w-5 text-primary"
                    strokeWidth={2}
                />
            </div>

            <div>
                <h1 className="font-heading text-xl font-semibold text-primaryDark">
                    Dental record chart
                </h1>

                <p className="mt-0.5 text-xs text-textMuted">
                    University of Caloocan City — Biglang Awa St., 12th Avenue,
                    Caloocan City
                </p>
            </div>
        </div>
    );
}

function DentalHabitsSection() {
    return (
        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-2">
            <div>
                <FieldLabel htmlFor="last_dental_visit">
                    When was the last time you visited a dentist?
                </FieldLabel>

                <input
                    id="last_dental_visit"
                    name="last_dental_visit"
                    type="text"
                    placeholder="e.g. 6 months ago"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
            </div>

            <div>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <select
                    id="status"
                    name="status"
                    defaultValue=""
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-textPrimary transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                    <option value="" disabled>Select Status</option>
                    {statusOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            <div>
                <FieldLabel htmlFor="floss">
                    Do you floss?
                </FieldLabel>

                <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-1.5 text-sm text-textPrimary">
                        <input
                            type="radio"
                            name="floss"
                            value="true"
                            className="h-4 w-4 border-border text-primary focus:ring-primary/30"
                        />
                        Yes
                    </label>

                    <label className="flex items-center gap-1.5 text-sm text-textPrimary">
                        <input
                            type="radio"
                            name="floss"
                            value="false"
                            className="h-4 w-4 border-border text-primary focus:ring-primary/30"
                        />
                        No
                    </label>
                </div>
            </div>

            <div>
                <FieldLabel htmlFor="brushing_frequency">
                    How often do you brush your teeth?
                </FieldLabel>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                    {["1x", "2x", "3-4x/day"].map((option) => (
                        <label
                            key={option}
                            className="flex items-center gap-1.5 text-sm text-textPrimary"
                        >
                            <input
                                type="radio"
                                name="brushing_frequency"
                                value={option}
                                className="h-4 w-4 border-border text-primary focus:ring-primary/30"
                            />

                            {option}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function DentalRecordForm() {
    const {
        selectedStudent,
        setSelectedStudent,

        selectedTooth,
        toothRecords,

        openTooth,
        closeTooth,
        saveTooth,
        clearTooth,
    } = useDentalRecordForm();

    const handleBack = () => {
        window.history.back();
    };

    const createDentalVisitMutation = useCreateDentalVisit();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedStudent === null) {
            alert("Please select a student.");
            return;
        }

        const formData = Object.fromEntries(
            new FormData(e.currentTarget).entries()
        );

        const record: CreateDentalVisit = {
            last_dental_visit: String(formData.last_dental_visit ?? ""),
            brushing_frequency: String(formData.brushing_frequency ?? ""),
            floss: formData.floss === "true",
            calculus_severity: String(formData.calculus_severity ?? ""),
            current_medication: String(formData.current_medication ?? ""),
            status: String(formData.status ?? ""),
            notes: String(formData.notes ?? ""),
            patient_id: selectedStudent.patient_id,
            tooth_records: Object.values(toothRecords),
        };
        console.log(record);
        createDentalVisitMutation.mutate(record, {
            onSuccess: (data) => {
                console.log("Dental visit created:", data);
            },
            onError: (error) => {
                console.error("Failed to create dental visit:", getFieldErrors(error));
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-5xl rounded-2xl border border-border bg-surface p-8 shadow-lg"
        >
            <DentalRecordHeader />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <StudentInfoSection
                    selectedStudent={selectedStudent}
                    onSelect={setSelectedStudent}
                    fields={dentalStudentFields}
                />

                <FormInput
                    id="date"
                    name="date"
                    label="Date"
                    type="date"
                />
            </div>

            <DentalHabitsSection />

            <OdontogramSection
                records={toothRecords}
                onToothClick={openTooth}
            />

            <DentalConditionSection />

            <MedicalHistorySection />

            <OralHealthStatusSection />

            <RecordFormFooter onBack={handleBack} />

            {selectedTooth !== null && (
                <ToothNoteModal
                    toothNumber={selectedTooth}
                    initialRecord={toothRecords[selectedTooth]}
                    onSubmit={saveTooth}
                    onClear={clearTooth}
                    onClose={closeTooth}
                />
            )}
        </form>
    );
}