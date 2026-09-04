
import  { useState } from "react";
import { ArrowLeft, Save, UserPlus, Info, Eye, EyeOff } from "lucide-react";
import { FormInput, SelectField } from "/@/components/InputCollection.jsx";
import {
  ClassificationToggle,
  COURSE_OPTIONS,
  YEAR_OPTIONS,
  SECTION_OPTIONS,
  SEX_OPTIONS,
  CIVIL_STATUS_OPTIONS,
  POSITION_OPTIONS,
  DEPARTMENT_OPTIONS,
} from "/@/utils/NewPatientUtils.jsx";

import {
  STUDENT_ID_PATTERN,
  FACULTY_ID_PATTERN,
  ADMIN_ID_PATTERN,
  validateStudentId,
  validateFacultyId,
  validateAdminId,
} from "/@/utils/NewPatientValidation.jsx";

import { usePatientContext } from "/@/context/PatientContext.tsx";

export default function NewPatientRecordForm() {
  const {
    savePatient,
    isSaving,
    saveError,
  } = usePatientContext();
  const saveErrorMessage = saveError;
  const [classification, setClassification] = useState("student");
  const [studentIdError, setStudentIdError] = useState("");
  const [facultyIdError, setFacultyIdError] = useState("");
  const [adminIdError, setAdminIdError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleStudentIdBlur = (e) => {
    setStudentIdError(validateStudentId(e.target.value));
  };

  const handleFacultyIdBlur = (e) => {
    setFacultyIdError(validateFacultyId(e.target.value));
  };

  const handleAdminIdBlur = (e) => {
    setAdminIdError(validateAdminId(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const record = Object.fromEntries(
        new FormData(e.currentTarget).entries()
    );

    try {
      await savePatient(record);

      console.log("Patient created successfully");

      window.history.back();
    } catch (error) {
      console.error("Failed to create patient:", error);
    }
  };

  const isStudent = classification === "student";
  const isFaculty = classification === "faculty";
  const isAdmin = classification === "admin";

  return (
      <form
          onSubmit={handleSubmit}
          className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-surface p-8 shadow-lg"
      >
        {/* Header */}
        <div className="mb-8 flex items-center gap-3 border-b border-border pb-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <UserPlus
                className="h-5 w-5 text-primary"
                strokeWidth={2}
            />
          </div>

          <div>
            <h1 className="font-heading text-xl font-semibold text-primaryDark">
              New patient record
            </h1>

            <p className="mt-0.5 text-xs text-textMuted">
              Enter the patient's personal and enrollment details.
            </p>
          </div>
        </div>

        {/* Classification */}
        <div className="mb-6">
          <ClassificationToggle
              value={classification}
              onChange={setClassification}
          />
        </div>

        {/* Save errors */}
        {saveErrorMessage?.length > 0 && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <ul className="list-disc space-y-1 pl-5">
                {saveErrorMessage.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
        )}

        {/* Basic Information */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">

          <div className="sm:col-span-2">
            <FormInput
                id="name"
                name="name"
                label="Name"
                placeholder="Last name, First name, Middle name"
                required
            />
          </div>

          {/* Student ID */}
          {isStudent && (
              <FormInput
                  id="studentId"
                  name="patient_id"
                  label="Student ID"
                  type="text"
                  placeholder="20230786-S"
                  pattern={STUDENT_ID_PATTERN}
                  required
                  error={studentIdError}
                  onBlur={handleStudentIdBlur}
                  onChange={() => {
                    if (studentIdError) {
                      setStudentIdError("");
                    }
                  }}
              />
          )}

          {/* Faculty ID */}
          {isFaculty && (
              <FormInput
                  id="facultyId"
                  name="patient_id"
                  label="Faculty ID"
                  type="text"
                  placeholder="F-2023-045"
                  pattern={FACULTY_ID_PATTERN}
                  required
                  error={facultyIdError}
                  onBlur={handleFacultyIdBlur}
                  onChange={() => {
                    if (facultyIdError) {
                      setFacultyIdError("");
                    }
                  }}
              />
          )}

          {/* Admin ID */}
          {isAdmin && (
              <FormInput
                  id="adminId"
                  name="patient_id"
                  label="Admin ID"
                  type="text"
                  placeholder="A-2023-045"
                  pattern={ADMIN_ID_PATTERN}
                  required
                  error={adminIdError}
                  onBlur={handleAdminIdBlur}
                  onChange={() => {
                    if (adminIdError) {
                      setAdminIdError("");
                    }
                  }}
              />
          )}

          <FormInput
              id="birthday"
              name="birthday"
              label="Birthday"
              type="date"
              required
          />

          <FormInput
              id="mobileNumber"
              name="mobile_number"
              label="Mobile number"
              type="tel"
              placeholder="09XXXXXXXXX"
              required
          />

          {/* Password */}
          <div>
            <FormInput
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                required
                minLength={8}
            />

            <button
                type="button"
                onClick={() =>
                    setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted transition-colors hover:text-textPrimary"
                aria-label={
                  showPassword
                      ? "Hide password"
                      : "Show password"
                }
            >
              {showPassword ? (
                  <EyeOff className="h-4 w-4" />
              ) : (
                  <Eye className="h-4 w-4" />
              )}
            </button>

            <p className="mt-1 text-xs text-textMuted">
              Must be at least 8 characters.
            </p>
          </div>

          <FormInput
              id="age"
              name="age"
              label="Age"
              type="number"
              placeholder="e.g. 20"
              required
          />

          <SelectField
              id="sex"
              name="sex"
              label="Sex"
              options={SEX_OPTIONS}
          />

          <SelectField
              id="civil_status"
              name="civil_status"
              label="Civil status"
              options={CIVIL_STATUS_OPTIONS}
          />
        </div>

        {/* Student Details */}
        {isStudent && (
            <div className="mt-8 border-t border-border pt-6">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary">
                Enrollment Details
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <SelectField
                    id="course"
                    name="course"
                    label="Course"
                    options={COURSE_OPTIONS}
                />

                <SelectField
                    id="year"
                    name="year"
                    label="Year"
                    options={YEAR_OPTIONS}
                />

                <SelectField
                    id="section"
                    name="section"
                    label="Section"
                    options={SECTION_OPTIONS}
                />
              </div>
            </div>
        )}

        {/* Faculty Details */}
        {isFaculty && (
            <div className="mt-8 border-t border-border pt-6">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary">
                Employment Details
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <SelectField
                    id="department"
                    name="department"
                    label="Department"
                    options={DEPARTMENT_OPTIONS}
                />

                <SelectField
                    id="position"
                    name="position"
                    label="Position"
                    options={POSITION_OPTIONS}
                />
              </div>
            </div>
        )}

        {/* Address */}
        <div className="mt-8 border-t border-border pt-6">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary">
            RESIDENTIAL ADDRESS
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <FormInput
                  id="address"
                  name="address"
                  label="Address"
                  placeholder="House no., Street"
                  required
              />
            </div>

            <FormInput
                id="barangay"
                name="barangay"
                label="Barangay"
                placeholder="e.g. Brgy. 176"
                required
            />
          </div>
        </div>

        {/* Notice */}
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

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <button
              type="button"
              onClick={handleBack}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-textSecondary transition-colors duration-200 hover:bg-background hover:text-textPrimary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowLeft
                className="h-4 w-4"
                strokeWidth={2}
            />
            Back
          </button>

          <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save
                className="h-4 w-4"
                strokeWidth={2}
            />

            {isSaving ? "Saving..." : "Save Record"}
          </button>
        </div>
      </form>

  );
}

