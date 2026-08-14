import React from "react";
import { Plus, Trash2, Save, ArrowLeft, User, ClipboardList, Info } from "lucide-react";

const sexChoice = ["Male", "Female"];
const civilstatus = ["Single", "Married", "Widowed", "Separated", "Divorced"];

function FieldLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-textSecondary">
      {children}
    </label>
  );
}

function TextField({ id, label, type = "text", placeholder }) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input id={id} type={type} placeholder={placeholder} className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}

function SelectField({ id, label, options, placeholder = "Select" }) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <select id={id} defaultValue="" className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-textPrimary transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20">
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function VisitRow({ index }) {
  return (
    <tr className={`border-b border-border last:border-b-0 ${index % 2 === 1 ? "bg-background/40" : ""}`}>
      <td className="p-2 align-top">
        <input type="date" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-textPrimary transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </td>
      <td className="p-2 align-top">
        <textarea placeholder="e.g. Fever, headache since morning" rows={2} className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </td>
      <td className="p-2 align-top">
        <textarea placeholder="e.g. Paracetamol 500mg, rest advised" rows={2} className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </td>
      <td className="p-2 align-top text-center">
        <button type="button" disabled aria-label="Remove visit row" className="rounded-lg p-2 text-textMuted opacity-40 transition-colors duration-200 disabled:cursor-not-allowed">
          <Trash2 className="h-4 w-4" strokeWidth={2} />
        </button>
      </td>
    </tr>
  );
}

export default function PatientRecordForm({ onBack }) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <form className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-surface p-8 shadow-lg">
      <div className="mb-8 flex items-center gap-3 border-b border-border pb-6">
        <div>
          <h1 className="font-heading text-xl font-semibold text-primaryDark">Patient Medical Record</h1>
          <p className="mt-0.5 text-xs text-textMuted">To be completed by the attending doctor or nurse.</p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <User className="h-4 w-4 text-primary" strokeWidth={2} />
        <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <TextField id="name" label="Name" placeholder="Last name, First name, Middle name" />
        </div>

        <TextField id="address" label="Address" placeholder="House no., Street" />

        <TextField id="barangay" label="Barangay" placeholder="e.g. Barangay 1, Barangay 2" />

        <TextField id="age" label="Age" type="number" />

        <TextField id="mobileNumber" label="Mobile Number" type="tel" placeholder="09XX XXX XXXX" />

        <SelectField id="sex" label="Sex" options={sexChoice} />

        <TextField id="birthday" label="Birthday" type="date" />

        <SelectField id="civilStatus" label="Civil Status" options={civilstatus} />

        <TextField id="yearSection" label="Year and Section" placeholder="e.g. BSCS 4B or 4th Year, Section B" />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between border-t border-border pt-6">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-primaryDark" strokeWidth={2} />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">Visit Log</h2>
          </div>
          <button type="button" disabled className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-textSecondary opacity-40 transition-colors duration-200 disabled:cursor-not-allowed">
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Add Row
          </button>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-background text-left">
                <th className="w-40 p-3 text-xs font-semibold uppercase tracking-wide text-textSecondary">Date</th>
                <th className="p-3 text-xs font-semibold uppercase tracking-wide text-textSecondary">Complaint / Findings</th>
                <th className="p-3 text-xs font-semibold uppercase tracking-wide text-textSecondary">Treatment</th>
                <th className="w-12 p-3" />
              </tr>
            </thead>
            <tbody>
              <VisitRow index={0} />
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <button type="button" onClick={handleBack} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-textSecondary transition-colors duration-200 hover:bg-background hover:text-textPrimary">
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Back
        </button>

        <div className="flex items-center gap-3">
          <button type="button" disabled className="rounded-xl px-4 py-2.5 text-sm font-medium text-textSecondary opacity-40 transition-colors duration-200 disabled:cursor-not-allowed">
            Clear
          </button>

          <button type="submit" disabled className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white opacity-40 shadow-sm transition-all duration-200 disabled:cursor-not-allowed">
            <Save className="h-4 w-4" strokeWidth={2} />
            Save Record
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-start justify-center gap-1.5 text-center text-xs text-info">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} />
        <span>Please ensure all information is accurate before saving. This record will be stored in the system for future reference.</span>
      </div>
    </form>
  );
}