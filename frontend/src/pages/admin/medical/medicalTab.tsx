import {useMemo} from "react";
import {ChevronRight, Plus, Stethoscope} from "lucide-react";
import {medData, MedicalColumns} from "./medicalData";
import {ROUTES} from "/@/config/RoutePaths.js";
import {DefaultTablePreset} from "/@/components/table/TableDesignPreset";
import {HyperlinkText, LinkButton} from "/@/components/Button";
import {MedicalVisitFilters} from "/@/api/schema/FilterSchemaCollection";
import {useMedicalContext} from "/@/context/PaginatedContext";
import {removeNullFilters} from "/@/components/Filters";
import {MedicalModel} from "/@/repository/MedicalModel";

interface MedicalTabProps {
    setFilters: (filters: MedicalVisitFilters) => void;
}

export default function MedicalTab({setFilters}: MedicalTabProps) {
    const {
        items: medical,
        totalPages,
        page,
        isLoading,
    } = useMedicalContext();

    const rows = useMemo(
        () =>
            medical.map((visit) => {
                const medicalModel = new MedicalModel(visit);

                return medicalModel.UiTableFormat();
            }),
        [medical]
    );

    return (
        <DefaultTablePreset<medData>
            title="Medical"
            icon={Stethoscope}
            isLoading={isLoading}
            data={rows}
            columns={MedicalColumns}
            totalPages={totalPages}
            page={page}
            panelAddon={
                <LinkButton
                    title={`New Medical Record`}
                    route={`${ROUTES.staff.medical.createNewRecord}`}
                    icon={Plus}
                />
            }
            renderAction={
                (record) => (
                    <HyperlinkText
                        title={`View`}
                        link={`${ROUTES.staff.medical.view.build(record.patient_id, record.id)}`}
                        icon={ChevronRight}
                    />
                )

            }
            onRun={(search, filters, page, pageSize) =>
                setFilters({
                    search,
                    ...removeNullFilters(filters),
                    page,
                    page_size: pageSize,
                })
            }
        />

    );
}
