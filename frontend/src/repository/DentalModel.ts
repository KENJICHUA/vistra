import {DentalVisitSchema} from "/@/api/schema/DentalSchema";
import {DentalData} from "/@/pages/admin/dental/DentalData";
import {formatDate} from "/@/utils/FormatDate";

export class DentalModel {
    private DentalVisitSchema: DentalVisitSchema

    constructor(dentalVisitSchema: DentalVisitSchema) {
        this.DentalVisitSchema = dentalVisitSchema;
    }

    UiTableFormat(): DentalData {
        return {
            id: this.DentalVisitSchema.id.toString(),
            studentId: this.DentalVisitSchema.patient_id,
            student: this.DentalVisitSchema.patient_name,
            course: this.DentalVisitSchema.course,
            time: formatDate(this.DentalVisitSchema.visit_date),
            status: this.DentalVisitSchema.status
        };
    }
}