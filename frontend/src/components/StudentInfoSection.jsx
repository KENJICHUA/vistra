import React from "react";
import { ReadOnlyField } from "../utils/ReadOnlyField";
import { StudentCombobox } from "../utils/StudentComboBox";

export function StudentInfoSection({
  students,
  selectedStudent,
  onSelect,
  fields,
  comboboxSpan = "sm:col-span-2",
}) {
  return (
    <>
      <div className={comboboxSpan}>
        <StudentCombobox studentList={students} selectedStudent={selectedStudent} onSelect={onSelect} />
      </div>

      {fields.map(({ id, label, span }) => (
        <div key={id} className={span}>
          <ReadOnlyField
            id={id}
            label={label}
            value={selectedStudent ? selectedStudent[id] : ""}
            placeholder="Select a student first"
          />
        </div>
      ))}
    </>
  );
}