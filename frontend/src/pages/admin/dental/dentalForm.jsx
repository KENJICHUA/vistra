import React, { useState } from "react";
import { ArrowLeft, Save, Stethoscope } from "lucide-react";

import { FieldLabel } from "../../../utils/FieldLabel.jsx";
import { ToothArch, ToothNoteModal, upperTeeth, lowerTeeth } from "../../../components/teethDesign.jsx";
import { TextField } from "../../../utils/TextField.jsx";
import { CheckboxRow } from "../../../utils/CheckboxRow.jsx";
import { StudentInfoSection } from "../../../components/StudentInfoSection.jsx";
import { students } from "../medical/medicalData";

const medicalHistoryItems = [
  "Allergy",
  "Asthma",
  "Bleeder",
  "Diabetes",
  "Epilepsy",
  "Heart Disease",
  "Hypertension",
  "Others",
];

const oralStatusRows = [
  "Date of Oral Examination",
  "Dental Caries",
  "Gingivitis / Periodontal Disease",
  "Debris",
  "Calculus",
  "Cleft Lip / Palate",
  "Others (Supernumerary/Mesiodens)",
  "No. of Permanent Teeth Present",
  "No. of Permanent Sound Present",
  "No. of Decayed Teeth (D)",
  "No. of Missing Teeth (M)",
  "No. of Filled Teeth (F)",
  "No. of Teeth for Extraction (X)",
  "No. of DMFX Teeth",
  "No. of Temporary Teeth Present",
];

const dentalStudentFields = [
  { id: "age", label: "Age" },
  { id: "sex", label: "Gender" },
  { id: "yearSection", label: "Year and section / course", span: "sm:col-span-3" },
];

export default function DentalRecordForm({ onBack }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [toothRecords, setToothRecords] = useState({});

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const openTooth = (number) => setSelectedTooth(number);
  const closeModal = () => setSelectedTooth(null);

  const saveTooth = (data) => {
    setToothRecords((prev) => ({ ...prev, [selectedTooth]: data }));
    setSelectedTooth(null);
  };

  const clearTooth = () => {
    setToothRecords((prev) => {
      const next = { ...prev };
      delete next[selectedTooth];
      return next;
    });
    setSelectedTooth(null);
  };

  return (
    <form className="mx-auto w-full max-w-5xl rounded-2xl border border-border bg-surface p-8 shadow-lg">
      <div className="mb-8 flex items-center gap-3 border-b border-border pb-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Stethoscope className="h-5 w-5 text-primary" strokeWidth={2} />
        </div>
        <div>
          <h1 className="font-heading text-xl font-semibold text-primaryDark">Dental record chart</h1>
          <p className="mt-0.5 text-xs text-textMuted">University of Caloocan City — Biglang Awa St., 12th Avenue, Caloocan City</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StudentInfoSection
          students={students}
          selectedStudent={selectedStudent}
          onSelect={setSelectedStudent}
          fields={dentalStudentFields}
        />
        <TextField id="date" label="Date" type="date" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-3">
        <div>
          <FieldLabel htmlFor="lastVisit">When was the last time you visited a dentist?</FieldLabel>
          <input
            id="lastVisit"
            type="text"
            placeholder="e.g. 6 months ago"
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <FieldLabel htmlFor="floss">Do you floss?</FieldLabel>
          <div className="flex items-center gap-4 pt-1">
            <label className="flex items-center gap-1.5 text-sm text-textPrimary">
              <input type="radio" name="floss" className="h-4 w-4 border-border text-primary focus:ring-primary/30" />
              Yes
            </label>
            <label className="flex items-center gap-1.5 text-sm text-textPrimary">
              <input type="radio" name="floss" className="h-4 w-4 border-border text-primary focus:ring-primary/30" />
              No
            </label>
          </div>
        </div>

        <div>
          <FieldLabel>How often do you brush your teeth?</FieldLabel>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            {["1x", "2x", "3-4x/day"].map((option) => (
              <label key={option} className="flex items-center gap-1.5 text-sm text-textPrimary">
                <input type="radio" name="brushFrequency" className="h-4 w-4 border-border text-primary focus:ring-primary/30" />
                {option}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-primaryDark">Odontogram</h2>
        <p className="mb-4 text-xs text-textMuted">Click a tooth to record its dentition, condition, and notes.</p>

        <div className="overflow-x-auto rounded-xl border border-border bg-background/40 p-6">
          <div className="mb-2 flex justify-center">
            <ToothArch teeth={upperTeeth} flip={false} records={toothRecords} onToothClick={openTooth} />
          </div>
          <div className="mx-auto my-3 h-px w-full max-w-2xl bg-border" />
          <div className="mt-2 flex justify-center">
            <ToothArch teeth={lowerTeeth} flip={true} records={toothRecords} onToothClick={openTooth} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-6 rounded-xl border border-border p-4 text-xs">
          <div>
            <p className="mb-4 font-semibold uppercase tracking-wide text-primary">Permanent</p>
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

          <div>
            <p className="mb-4 font-semibold uppercase tracking-wide text-primary   ">Temporary</p>
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
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-2">
        <div>
          <FieldLabel>Calculus</FieldLabel>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            {["Light", "Moderate", "Heavy"].map((option) => (
              <label key={option} className="flex items-center gap-1.5 text-sm text-textPrimary">
                <input type="radio" name="calculus" className="h-4 w-4 border-border text-primary focus:ring-primary/30" />
                {option}
              </label>
            ))}
          </div>
        </div>
        <TextField id="medication" label="Medication" placeholder="List current medications" />
      </div>

      <div className="mt-6">
        <FieldLabel htmlFor="notes">Notes</FieldLabel>
        <textarea id="notes" rows={3} placeholder="Additional observations" className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary">Medical history</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          {medicalHistoryItems.map((item) => (
            <CheckboxRow key={item} label={item} />
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary">Oral health status</h2>
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
              {oralStatusRows.map((row, index) => (
                <tr key={row} className={`border-b border-border last:border-b-0 ${index % 2 === 1 ? "bg-background/40" : ""}`}>
                  <td className="p-3 text-sm text-textPrimary">{row}</td>
                  <td className="p-3"><input type="text" className="w-full rounded-lg border border-textPrimary bg-surface px-2 py-1.5 text-sm text-textPrimary focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" /></td>
                  <td className="p-3"><input type="text" className="w-full rounded-lg border border-textPrimary bg-surface px-2 py-1.5 text-sm text-textPrimary focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" /></td>
                  <td className="p-3"><input type="text" className="w-full rounded-lg border border-textPrimary bg-surface px-2 py-1.5 text-sm text-textPrimary focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" /></td>
                  <td className="p-3"><input type="text" className="w-full rounded-lg border border-textPrimary bg-surface px-2 py-1.5 text-sm text-textPrimary focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <button type="button" onClick={handleBack} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-textSecondary transition-colors duration-200 hover:bg-background hover:text-textPrimary">
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Back
        </button>

        <button
          type="submit"
          disabled={!selectedStudent}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary"
        >
          <Save className="h-4 w-4" strokeWidth={2} />
          Save Record
        </button>
      </div>

      {selectedTooth !== null && (
        <ToothNoteModal
          toothNumber={selectedTooth}
          initialRecord={toothRecords[selectedTooth]}
          onSave={saveTooth}
          onClear={clearTooth}
          onClose={closeModal}
        />
      )}
    </form>
  );
}