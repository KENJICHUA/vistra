import {MedicalVisitSchema} from "/@/api/schema/MedicalSchema";
import {medData} from "/@/pages/admin/medical/medicalData";
import {formatDate} from "/@/utils/FormatDate";

export class MedicalModel {
    private medicalVisitSchema: MedicalVisitSchema;

    constructor(medicalVisitSchema: MedicalVisitSchema) {
        this.medicalVisitSchema = medicalVisitSchema;
    }

    UiTableFormat(): medData {
        return {
            id: this.medicalVisitSchema.id.toString(),
            patient_id: this.medicalVisitSchema.patient_id,
            student: this.medicalVisitSchema.patient_name,
            course: this.medicalVisitSchema.course,
            time: formatDate(this.medicalVisitSchema.visit_date),
            status: this.medicalVisitSchema.status as medData["status"],
        };
    }
}
