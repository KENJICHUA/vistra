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