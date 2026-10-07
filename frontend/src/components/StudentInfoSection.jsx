import "react";
import {ReadOnlyField} from "../utils/ReadOnlyField";
import {StudentCombobox} from "../utils/StudentComboBox.tsx";

export function StudentInfoSection({
                                       selectedStudent,
                                       onSelect,
                                       fields,
                                       comboboxSpan = "sm:col-span-2",
                                   }) {
    return (
        <>
            <div className={comboboxSpan}>
                <StudentCombobox selectedStudent={selectedStudent} onSelect={onSelect}/>
            </div>

            {fields.map(({id, label, span}) => (
                <div key={id} className={span}>
                    <ReadOnlyField
                        id={id}
                        label={label}
                        value={
                            selectedStudent
                                ? id === "year_section"
                                    ? selectedStudent.section
                                        ? `${selectedStudent.school_year} / ${selectedStudent.section}`
                                        : selectedStudent.department || selectedStudent.course
                                    : selectedStudent[id]
                                : ""
                        }
                        placeholder="Select a student first"
                    />
                </div>
            ))}
        </>
    );
}