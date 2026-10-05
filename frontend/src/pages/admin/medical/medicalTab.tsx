import React from "react";
import {ChevronRight, Plus, Stethoscope} from "lucide-react";
import {medRecords, medData, MedicalColumns} from "./medicalData";
import {ROUTES} from "/@/config/RoutePaths.js";
import {DefaultTablePreset} from "/@/components/table/TableDesignPreset";
import {HyperlinkText, LinkButton} from "/@/components/Button";

export default function MedicalTab() {
    return (
        <DefaultTablePreset<medData>
            title="Medical"
            isLoading={false}
            icon={Stethoscope}
            data={medRecords}
            columns={MedicalColumns}
            panelAddon={
                <LinkButton
                    title={`New Medical Record`}
                    route={`${ROUTES.staff.medical.createNewRecord}`}
                    icon={Plus}
                />
            }
            renderAction={
                (medical) => (
                    <HyperlinkText
                        title={`View`}
                        link={`${ROUTES.staff.medical.viewRecord}`}
                        // link={`${ROUTES.staff.medical.viewRecord}/${medical.id}`}
                        icon={ChevronRight}
                    />
                )

            }
        />

    );
}