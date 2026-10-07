import React, {useRef, useState, Fragment} from "react";
import {ArrowLeft, ArrowRight, Check} from "lucide-react";
import {FieldLabel} from "/@/utils/FieldLabel.jsx";
import {SelectField} from "/@/components/InputCollection";
import {FormInput} from "/@/components/InputCollection";

const YES_NO_OPTIONS: string[] = ["Yes", "No"];
const NORMAL_ABNORMAL_OPTIONS: string[] = ["Normal", "Abnormal"];
const FAMILY_HISTORY_OPTIONS: string[] = ["Hypertension", "Asthma", "Heart Disease", "Diabetes", "Tuberculosis"];

const textareaClass =
    "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20";

const SECTIONS = [
    {key: "medicalHistory", label: "Medical History"},
    {key: "familyHistory", label: "Family History"},
    {key: "familyPlanning", label: "Family Planning"},
    {key: "vitalSigns", label: "Vital Signs"},
    {key: "results", label: "Results"},
    {key: "recommendation", label: "Recommendation"},
    {key: "examinationDetails", label: "Examination"},
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

export interface MedicalHistoryFormProps {
    /** Set an entry to false to omit that section entirely. Defaults to showing all sections. */
    sections?: Partial<Record<SectionKey, boolean>>;
}

const DEFAULT_SECTIONS: Record<SectionKey, boolean> = {
    medicalHistory: true,
    familyHistory: true,
    familyPlanning: true,
    vitalSigns: true,
    results: true,
    recommendation: true,
    examinationDetails: true,
};

/**
 * Medical / health record fields, presented as a numbered stepper of
 * sections that must be completed in order — Next validates the current
 * section's required fields (native constraint validation, plus a custom
 * check for the Family History checkbox group) before unlocking the next
 * step. Going back is always allowed. Sections stay mounted (just visually
 * hidden) so switching steps never drops entered values, and every field
 * keeps a `name` attribute so it plugs straight into a parent <form>'s
 * FormData.
 */
export default function MedicalHistoryForm({sections}: MedicalHistoryFormProps) {
    const show = {...DEFAULT_SECTIONS, ...sections};
    const visibleSections = SECTIONS.filter((s) => show[s.key]);

    const [active, setActive] = useState<SectionKey>(visibleSections[0]?.key ?? "medicalHistory");
    const [furthestUnlocked, setFurthestUnlocked] = useState(0);
    const [sectionError, setSectionError] = useState("");

    const sectionRefs = useRef<Partial<Record<SectionKey, HTMLDivElement | null>>>({});

    const activeIndex = visibleSections.findIndex((s) => s.key === active);

    function validateActiveSection(): boolean {
        const el = sectionRefs.current[active];
        if (!el) return true;

        const fields = el.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
            "input, select, textarea"
        );
        for (const field of Array.from(fields)) {
            if (typeof (field as any).checkValidity === "function" && !(field as any).checkValidity()) {
                (field as any).reportValidity?.();
                (field as HTMLElement).focus?.();
                setSectionError("Please complete the required fields before continuing.");
                return false;
            }
        }

        if (active === "familyHistory") {
            const anyChecked = el.querySelector<HTMLInputElement>('input[name="family_history"]:checked');
            const othersFilled = el.querySelector<HTMLInputElement>('input[name="family_history_others"]')?.value.trim();
            if (!anyChecked && !othersFilled) {
                setSectionError('Select at least one condition, or check "None" below.');
                return false;
            }
        }

        setSectionError("");
        return true;
    }

    const goNext = () => {
        if (!validateActiveSection()) return;
        if (activeIndex < visibleSections.length - 1) {
            const nextIndex = activeIndex + 1;
            setFurthestUnlocked((f) => Math.max(f, nextIndex));
            setActive(visibleSections[nextIndex].key);
        }
    };

    const goPrev = () => {
        setSectionError("");
        if (activeIndex > 0) setActive(visibleSections[activeIndex - 1].key);
    };

    const goToStep = (key: SectionKey, index: number) => {
        if (index > furthestUnlocked) return; // locked — must reach it via Next
        setSectionError("");
        setActive(key);
    };

    if (visibleSections.length === 0) return null;

    return (
        <div className="mt-8 border-t border-border pt-6">
            {/* Stepper — desktop / tablet */}
            <div className="mb-6 hidden items-start sm:flex">
                {visibleSections.map((s, i) => {
                    const isDone = i < furthestUnlocked;
                    const isActive = i === activeIndex;
                    const isLocked = i > furthestUnlocked;
                    return (
                        <Fragment key={s.key}>
                            <button
                                type="button"
                                onClick={() => goToStep(s.key, i)}
                                disabled={isLocked}
                                className="group flex shrink-0 flex-col items-center gap-2"
                            >
                <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-200 ${
                        isDone
                            ? "bg-primary text-white"
                            : isActive
                                ? "border-2 border-primary bg-primary/10 text-primaryDark"
                                : isLocked
                                    ? "cursor-not-allowed border border-border bg-background text-textMuted/50"
                                    : "border border-border bg-background text-textSecondary"
                    }`}
                >
                  {isDone ? <Check className="h-4 w-4" strokeWidth={2.5}/> : i + 1}
                </span>
                                <span
                                    className={`w-20 text-center text-[11px] leading-tight transition-colors duration-200 ${
                                        isActive
                                            ? "font-medium text-textPrimary"
                                            : isLocked
                                                ? "text-textMuted/50"
                                                : "text-textSecondary group-hover:text-textPrimary"
                                    }`}
                                >
                  {s.label}
                </span>
                            </button>
                            {i < visibleSections.length - 1 && (
                                <span
                                    className={`mt-4 h-px flex-1 transition-colors duration-300 ${i < furthestUnlocked ? "bg-primary" : "bg-border"}`}/>
                            )}
                        </Fragment>
                    );
                })}
            </div>

            {/* Stepper — mobile: current step + progress bar */}
            <div className="mb-6 sm:hidden">
                <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-textPrimary">
            Step {activeIndex + 1} of {visibleSections.length}
          </span>
                    <span className="text-xs text-textMuted">{visibleSections[activeIndex].label}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{width: `${((activeIndex + 1) / visibleSections.length) * 100}%`}}
                    />
                </div>
            </div>

            {sectionError && <p className="mb-4 text-xs font-medium text-red-500">{sectionError}</p>}

            {show.medicalHistory && (
                <div ref={(el) => {
                  sectionRefs.current.medicalHistory = el
                }}
                     className={active === "medicalHistory" ? "" : "hidden"}>
                    <div className="mb-4 flex items-center gap-2">
                        <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">I. Medical
                            History</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <FormInput
                            id="hospitalizationYear"
                            name="hospitalization_year"
                            label="Hospitalization / operation — year"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]{4}"
                            maxLength={4}
                            placeholder="e.g. 2022"
                        />
                        <div className="sm:col-span-2">
                            <FieldLabel htmlFor="diagnosis">Diagnosis</FieldLabel>
                            <textarea id="diagnosis" name="diagnosis" rows={2}
                                      placeholder="Reason for hospitalization or operation" className={textareaClass}/>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormInput id="allergyMedicine" name="allergy_medicine" label="Allergy — medicine"
                                   placeholder="e.g. Penicillin, or None"/>
                        <FormInput id="allergyFood" name="allergy_food" label="Allergy — food"
                                   placeholder="e.g. Shellfish, or None"/>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
                        <SelectField id="smoking" name="smoking" label="Smoking" options={YES_NO_OPTIONS} required/>
                        <SelectField id="vaping" name="vaping" label="Vaping" options={YES_NO_OPTIONS} required/>
                        <SelectField id="alcoholIntake" name="alcohol_intake" label="Alcohol intake"
                                     options={YES_NO_OPTIONS} required/>
                        <FormInput id="lastMenstrualPeriod" name="last_menstrual_period" label="Last menstrual period"
                                   type="date"/>
                    </div>
                </div>
            )}

            {show.familyHistory && (
                <div ref={(el) => {
                  sectionRefs.current.familyHistory = el
                }}
                     className={active === "familyHistory" ? "" : "hidden"}>
                    <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">Family History</h2>
                    <p className="mb-4 text-xs text-textMuted">Select any that apply, or specify "None" below.</p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {FAMILY_HISTORY_OPTIONS.map((label) => {
                            const id = `familyHistory-${label.replace(/\s+/g, "")}`;
                            return (
                                <label
                                    key={label}
                                    htmlFor={id}
                                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-textPrimary transition-colors duration-200 hover:border-primary/40"
                                >
                                    <input id={id} type="checkbox" name="family_history" value={label}
                                           className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"/>
                                    {label}
                                </label>
                            );
                        })}
                    </div>
                    <div className="mt-4">
                        <FormInput id="familyHistoryOthers" name="family_history_others"
                                   label="Others (please specify, or type None)"
                                   placeholder="e.g. None / Cancer / kidney disease"/>
                    </div>
                </div>
            )}

            {show.familyPlanning && (
                <div ref={(el) => {
                  sectionRefs.current.familyPlanning = el
                }}
                     className={active === "familyPlanning" ? "" : "hidden"}>
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary">II. Family Planning
                        Method</h2>
                    <FormInput id="familyPlanningMethod" name="family_planning_method" label="Method"
                               placeholder="e.g. None, Pills, IUD, Condom" required/>
                </div>
            )}

            {show.vitalSigns && (
                <div ref={(el) => {
                  sectionRefs.current.vitalSigns = el
                }}
                     className={active === "vitalSigns" ? "" : "hidden"}>
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary">III. Vital
                        Signs</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <FormInput
                            id="temperature"
                            name="temperature"
                            label="Temperature (°C)"
                            type="text"
                            inputMode="decimal"
                            pattern="[0-9]*\.?[0-9]*"
                            placeholder="e.g. 36.5"
                            required
                        />
                        <FormInput id="bloodPressure" name="blood_pressure" label="Blood pressure"
                                   placeholder="e.g. 120/80" required/>
                        <FormInput
                            id="heartRate"
                            name="heart_rate"
                            label="Heart rate (bpm)"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="e.g. 78"
                            required
                        />
                        <FormInput
                            id="respiratoryRate"
                            name="respiratory_rate"
                            label="Respiratory rate"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="e.g. 18"
                            required
                        />
                        <FormInput id="eyes" name="eyes" label="Eyes" placeholder="e.g. Anicteric, pink conjunctiva"
                                   required/>
                    </div>
                </div>
            )}

            {show.results && (
                <div ref={(el) => {
                  sectionRefs.current.results = el
                }} className={active === "results" ? "" : "hidden"}>
                    <div className="mb-4 flex items-center gap-2">
                        <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">IV. Results</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <SelectField id="chestXray" name="chest_xray" label="Chest X-Ray"
                                     options={NORMAL_ABNORMAL_OPTIONS} required/>
                        <SelectField id="cbc" name="cbc" label="CBC" options={NORMAL_ABNORMAL_OPTIONS} required/>
                        <SelectField id="urinalysis" name="urinalysis" label="Urinalysis"
                                     options={NORMAL_ABNORMAL_OPTIONS} required/>
                    </div>
                </div>
            )}

            {show.recommendation && (
                <div
                    ref={
                        (el) => {
                            sectionRefs.current.recommendation = el
                        }}
                    className={active === "recommendation" ? "" : "hidden"}>
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary">
                      V. Recommendation
                    </h2>
                    <textarea
                        id="recommendation"
                        name="recommendation"
                        rows={3}
                        placeholder="Examining physician's recommendation"
                        className={textareaClass} required
                    />
                </div>
            )}

            {show.examinationDetails && (
                <div
                    ref={(el) => {
                        sectionRefs.current.examinationDetails = el;
                    }}
                    className={active === "examinationDetails" ? "" : "hidden"}
                >
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary">
                        Examination Details
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormInput
                            id="examinationDate"
                            name="examination_date"
                            label="Date"
                            type="date"
                            required
                        />

                        <FormInput
                            id="examiningPhysician"
                            name="examining_physician"
                            label="Examining physician"
                            placeholder="e.g. Dr. Juan Dela Cruz"
                            required
                        />
                    </div>
                </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <button
                    type="button"
                    onClick={goPrev}
                    disabled={activeIndex === 0}
                    className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium text-textSecondary transition-colors duration-200 hover:bg-background hover:text-textPrimary disabled:pointer-events-none disabled:opacity-0"
                >
                    <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2}/>
                    Previous
                </button>
                {activeIndex < visibleSections.length - 1 ? (
                    <button
                        type="button"
                        onClick={goNext}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primaryDark transition-colors duration-200 hover:bg-primary/15"
                    >
                        Next: {visibleSections[activeIndex + 1].label}
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2}/>
                    </button>
                ) : (
                    <span className="text-xs text-textMuted">Last section — use Save Record below to submit.</span>
                )}
            </div>
        </div>
    );
}