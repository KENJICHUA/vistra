export const STUDENT_ID_PATTERN = "^\\d{8}-[A-Za-z]$";

export const FACULTY_ID_PATTERN = "^F-\\d{4}-\\d{3}$";

export const ADMIN_ID_PATTERN = "^A-\\d{4}-\\d{3}$";

export const validateStudentId = (value) => {
  if (!value) return "";

  if (!new RegExp(STUDENT_ID_PATTERN).test(value)) {
    return "Format should be 8 digits, a dash, then a letter — e.g. 20230786-S";
  }

  return "";
};

export const validateFacultyId = (value) => {
  if (!value) return "";

  if (!new RegExp(FACULTY_ID_PATTERN).test(value)) {
    return "Format should be F, dash, 4-digit year, dash, 3-digit number — e.g. F-2023-045";
  }

  return "";
};

export const validateAdminId = (value) => {
  if (!value) return "";

  if (!new RegExp(ADMIN_ID_PATTERN).test(value)) {
    return "Format should be A, dash, 4-digit year, dash, 3-digit number — e.g. A-2023-045";
  }

  return "";
};