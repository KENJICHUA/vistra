import React, {useMemo} from "react";
import {ChevronRight, Plus, Syringe} from "lucide-react";
import {dentalRecords, DentalData, DentalColumns} from "./DentalData";
import {ROUTES} from "/@/config/RoutePaths.js";
import {DefaultTablePreset} from "/@/components/table/TableDesignPreset";
import {HyperlinkText, LinkButton} from "/@/components/Button";
import {AppointmentFilters, DentalVisitFilters} from "/@/api/schema/FilterSchemaCollection";
import {useDentalContext} from "/@/context/PaginatedContext";
import {removeNullFilters} from "/@/components/Filters";
import {DentalModel} from "/@/repository/DentalModel";

interface DentalTabProps {
    setFilters: (filters: DentalVisitFilters) => void;
}

export default function DentalTab({setFilters}: DentalTabProps) {
    const {
        items: Dental,
        totalPages,
        page,
        isLoading,
    } = useDentalContext()

    const dental = useMemo(
        () =>
            Dental.map((dental) => {
                const dentalModel = new DentalModel(dental)

                return dentalModel.UiTableFormat();
            }),
        [Dental]
    );

    return (

        <DefaultTablePreset<DentalData>
            title="Dental"
            icon={Syringe}
            isLoading={isLoading}
            data={dental}
            columns={DentalColumns}
            totalPages={totalPages}
            page={page}
            panelAddon={
                <LinkButton
                    title={`New Dental Record`}
                    route={`${ROUTES.staff.dental.createNewRecord}`}
                    icon={Plus}
                />
            }
            renderAction={
                (dental) => (
                    <HyperlinkText
                        title={`View`}
                        link={`${ROUTES.staff.dental.view.build(dental.studentId, dental.id)}`}
                        // link={`${ROUTES.staff.dental.viewRecord}/${dental.id}`}
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