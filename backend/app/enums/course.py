from enum import Enum


class Course(str, Enum):
    BS_PSY = "BS PSY"
    BS_MATH = "BS MATH"
    BSCS = "BSCS"
    BSIS = "BSIS"
    BSIT = "BSIT"
    BSEMC = "BSEMC"
    BPA = "BPA"
    BPA_ECGE = "BPA ECGE"
    BA_COMM = "BA COMM"
    BA_POS = "BA POS"
    BSOAD = "BSOAD"
    BSAIS = "BSAIS"
    BSA = "BSA"
    BSTM = "BSTM"
    BSHM = "BSHM"
    BSBA_FMGT = "BSBA FMGT"
    BSBA_MKTG = "BSBA MKTG"
    BS_ENTREP = "BS ENTREP"
    BSBA_HRM = "BSBA HRM"
    BECED = "BECED"
    BSE_SCI = "BSE SCI"
    BSE_ENG = "BSE ENG"
    BSE_ENG_CHI = "BSE ENG-CHI"
    BTLED_HE = "BTLED HE"
    BS_CRIM = "BS CRIM"
    BS_CPE = "BS CPE"
    BS_IE = "BS IE"
    BS_ECE = "BS ECE"
    BS_EE = "BS EE"
    BSSW = "BSSW"
    BSISM = "BSISM"
    ABBS = "ABBS"
    JD = "JD"
    PHD = "PHD"
    MSC = "MSC"
    MATS = "MATS"
    MBA = "MBA"
    MPA = "MPA"
    MAED = "MAED"
    MAT_EG = "MAT-EG"
    CPE = "CPE"
    DPA = "DPA"

    @property
    def label(self) -> str:
        return {
            Course.BS_PSY: "BS Psychology",
            Course.BS_MATH: "BS Mathematics",
            Course.BSCS: "BS Computer Science",
            Course.BSIS: "BS Information Systems",
            Course.BSIT: "BS Information Technology",
            Course.BSEMC: "BS Entertainment and Multimedia Computing",
            Course.BPA: "Bachelor of Public Administration",
            Course.BPA_ECGE: (
                "Bachelor of Public Administration "
                "(Evening Class for Government Employees)"
            ),
            Course.BA_COMM: "BA Communication",
            Course.BA_POS: "BA Political Science",
            Course.BSOAD: "BS Office Administration",
            Course.BSAIS: "BS Accounting Information Systems",
            Course.BSA: "BS Accountancy",
            Course.BSTM: "BS Tourism Management",
            Course.BSHM: "BS Hospitality Management",
            Course.BSBA_FMGT: "BSBA Major in Financial Management",
            Course.BSBA_MKTG: "BSBA Major in Marketing Management",
            Course.BS_ENTREP: "BS Entrepreneurship",
            Course.BSBA_HRM: "BSBA Major in Human Resource Management",
            Course.BECED: "Bachelor of Early Childhood Education",
            Course.BSE_SCI: "BSE Major in Science",
            Course.BSE_ENG: "BSE Major in English",
            Course.BSE_ENG_CHI: (
                "BSE Major in English with Chinese Language and Pedagogy"
            ),
            Course.BTLED_HE: "BTLEd Major in Home Economics",
            Course.BS_CRIM: "BS Criminology",
            Course.BS_CPE: "BS Computer Engineering",
            Course.BS_IE: "BS Industrial Engineering",
            Course.BS_ECE: "BS Electronics Engineering",
            Course.BS_EE: "BS Electrical Engineering",
            Course.BSSW: "BS Social Work",
            Course.BSISM: "BS Industrial Security Management",
            Course.ABBS: "BA in Behavioural Sciences",
            Course.JD: "Juris Doctor",
            Course.PHD: "PhD in Educational Management",
            Course.MSC: "MS in Criminal Justice Major in Criminology",
            Course.MATS: "MA in Teaching Science",
            Course.MBA: "Master in Business Administration",
            Course.MPA: "Master in Public Administration",
            Course.MAED: "MA in Education Major in Educational Management",
            Course.MAT_EG: "MA in Teaching (Early Grades)",
            Course.CPE: "Certificate in Professional Education",
            Course.DPA: "Doctor in Public Administration",
        }[self]