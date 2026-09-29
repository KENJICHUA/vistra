import {CreateToothRequest} from "/@/api/schema/DentalSchema";
import {ToothModal} from "/@/components/dental/ToothModal";
import {FormInput} from "/@/components/InputCollection";
import {Dentition, ToothCondition, toothConditionOptions} from "/@/types/Dental";
import {useForm} from "/@/hooks/Form";

interface ToothNoteModalProps {
    toothNumber: number;
    initialRecord?: CreateToothRequest;
    onSubmit: (record: CreateToothRequest) => void;
    onClear: () => void;
    onClose: () => void;
}
type ToothForm = {
    dentition: Dentition;
    condition: ToothCondition;
    notes: string;
};

export function ToothNoteModal({
    toothNumber,
    initialRecord,
    onSubmit,
    onClear,
    onClose,
}: ToothNoteModalProps) {
    const { form, setField, reset } = useForm<ToothForm>({
        dentition: initialRecord?.dentition ?? "permanent",
        condition: initialRecord?.condition ?? "sound",
        notes: initialRecord?.notes ?? "",
    });

    const handleSubmit = (
        dentition: Dentition,
        condition: ToothCondition,
        notes: string,
    ) => {
    const record: CreateToothRequest = {
        tooth_number: toothNumber,
        dentition,
        condition,
        notes,
    };

    onSubmit(record);
};



    return (
        <ToothModal
            title={`Tooth ${toothNumber}`}
            onClose={onClose}
            footer={
                <>
                    <button
                        type="button"
                        onClick={onClear}
                        className="text-sm font-medium text-textSecondary hover:text-red-500"
                    >
                        Clear note
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-textSecondary hover:bg-background"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        form="tooth-note-form"
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primaryDark"
                        onClick={() => handleSubmit(form.dentition, form.condition, form.notes)}

                    >
                        Save
                    </button>
                </>
            }
        >

                {/* Dentition */}
            <fieldset>
                <legend className="mb-2 text-xs font-medium text-textMuted">
                    Dentition
                </legend>

                <div className="flex gap-5">
                    <label className="flex items-center gap-2 text-sm text-textPrimary">
                        <input
                            type="radio"
                            name="dentition"
                            value="permanent"
                            checked={form.dentition === "permanent"}
                            onChange={(event) =>
                                setField("dentition", event.target.value as Dentition)
                            }
                        />
                        Permanent
                    </label>

                    <label className="flex items-center gap-2 text-sm text-textPrimary">
                        <input
                            type="radio"
                            name="dentition"
                            value="temporary"
                            checked={form.dentition === "temporary"}
                            onChange={(event) =>
                                setField("dentition", event.target.value as Dentition)
                            }
                        />
                        Temporary
                    </label>
                </div>
            </fieldset>

                {/* Condition */}
                <div>
                    <label
                        htmlFor="tooth-condition"
                        className="mb-2 block text-xs font-medium text-textMuted"
                    >
                        Condition
                    </label>

                    <select
                        id="tooth-condition"
                        name="condition"
                        defaultValue={
                            initialRecord?.condition ?? "sound"
                        }
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-textPrimary focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        onChange={(event) => setField("condition", event.target.value as ToothCondition)}
                    >
                        {toothConditionOptions.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Notes */}
                <FormInput
                    id="tooth-notes"
                    name="notes"
                    label="Notes"
                    defaultValue={initialRecord?.notes ?? ""}
                    placeholder="Add notes for this tooth..."
                    onChange={(event) => setField("notes", event.target.value)}
                />

        </ToothModal>
    );
}
