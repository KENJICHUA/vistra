import {ClipboardList, HeartPulse, Pill, Stethoscope, Syringe} from "lucide-react";
const TYPE_ICONS = [
    { match: /vaccin|shot|immun/i, icon: Syringe },
    { match: /injur|accident|fall/i, icon: HeartPulse },
    { match: /medic|prescri|dose/i, icon: Pill },
    { match: /check|exam|screen/i, icon: Stethoscope },
];

function getTypeIcon(type = "") {
    const found = TYPE_ICONS.find((entry) => entry.match.test(type));
    return found ? found.icon : ClipboardList;
}
console.log(getTypeIcon("user"));
console.log(getTypeIcon("staff"));
console.log(getTypeIcon("guest"));
console.log(getTypeIcon(""));