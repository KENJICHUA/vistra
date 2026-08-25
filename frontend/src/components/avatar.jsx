import {ClipboardList, HeartPulse, Pill, Scissors, Smile, Sparkles, Stethoscope, Syringe, Wrench} from "lucide-react";
const TYPE_ICONS = [
  { match: /vaccin|shot|immun/i, icon: Syringe },
  { match: /injur|accident|fall/i, icon: HeartPulse },
  { match: /medic|prescri|dose/i, icon: Pill },
  { match: /check|exam|screen/i, icon: Stethoscope },
  { match: /extract/i, icon: Scissors },
  { match: /prophylaxis|clean/i, icon: Sparkles },
  { match: /filling|repair/i, icon: Wrench },
  { match: /consult|check|exam/i, icon: Smile },

];

const AVATAR_PALETTE = [
  "bg-primary/10 text-primary",
  "bg-emerald-500/10 text-emerald-600",
  "bg-amber-500/10 text-amber-600",
  "bg-violet-500/10 text-violet-600",
  "bg-rose-500/10 text-rose-600",

];

export function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function avatarColor(name = "") {
  const sum = name
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  return AVATAR_PALETTE[sum % AVATAR_PALETTE.length];
}

export function getTypeIcon(type = "") {
  const found = TYPE_ICONS.find((entry) => entry.match.test(type));
  return found ? found.icon : ClipboardList;
}