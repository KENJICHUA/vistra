import {
  Heart,
  Thermometer,
  Wind,
  Apple,
  Scale,
  Stethoscope,
  Syringe,
  Brain,
  Calendar,
  FileText,
  Bell,
  Ruler,
  Fingerprint,
} from "lucide-react";

export const vitalStyles = {
  height: { text: "text-height", chip: "bg-height/10 text-height", ring: "ring-height/15" },
  weight: { text: "text-weight", chip: "bg-weight/10 text-weight", ring: "ring-weight/15" },
  temperature: { text: "text-temperature", chip: "bg-temperature/10 text-temperature", ring: "ring-temperature/15" },
  heartRate: { text: "text-heartRate", chip: "bg-heartRate/10 text-heartRate", ring: "ring-heartRate/15" },
  spo2: { text: "text-spo2", chip: "bg-spo2/10 text-spo2", ring: "ring-spo2/15" },
  bmi: { text: "text-bmi", chip: "bg-bmi/10 text-bmi", ring: "ring-bmi/15" },
};

export const vitals = [
  { key: "heartRate", label: "Heart rate", value: "72", unit: "bpm", icon: Heart },
  { key: "spo2", label: "Oxygen", value: "98", unit: "%", icon: Wind },
  { key: "temperature", label: "Temp", value: "36.6", unit: "°C", icon: Thermometer },
  { key: "bmi", label: "BMI", value: "22.4", unit: "kg/m²", icon: Scale}
];

export const services = [
  {
    key: "temperature",
    icon: Thermometer,
    title: "Fever & illness checks",
    body: "Walk-in checks for fever, colds, stomach aches, and anything that doesn't feel right.",
  },
  {
    key: "heartRate",
    icon: Stethoscope,
    title: "First aid & injuries",
    body: "Cuts, sprains, falls on the court — cleaned, treated, and documented on the spot.",
  },
  {
    key: "spo2",
    icon: Wind,
    title: "Asthma & allergy support",
    body: "Inhaler storage, allergy action plans, and a quiet room to catch your breath.",
  },
  {
    key: "weight",
    icon: Scale,
    title: "Growth & wellness checks",
    body: "Routine height, weight, and vision screenings tracked year over year.",
  },
  {
    key: "height",
    icon: Brain,
    title: "Counseling referrals",
    body: "A first, private conversation and a warm handoff to the school counselor.",
  },
  {
    key: "bmi",
    icon: Apple,
    title: "BMI & nutrition guidance",
    body: "A confidential discussion of your BMI, diet, and healthy lifestyle choices.",
  },
];

export const steps = [
  {
    number: "01",
    title: "Inform your teacher and head to the clinic",
    body: "Say you need the clinic — no form, no explanation required.",
  },
  {
    number: "02",
    title: "Check in at the clinic",
    body: "The nurse pulls up your student record at the admin website and take a quick vitals check at the kiosk.",
  },
  {
    number: "03",
    title: "Get care or a note back to class",
    body: "Treatment on the spot, a rest pass, or a call home — whichever fits.",
  },
];

export const appFeatures = [
  {
    icon: Fingerprint,
    title: "Tap in, no paper slip",
    body: "Scan the QR code at the clinic kiosk  and your record is already on screen.",
  },
  {
    icon: Calendar,
    title: "Book or reschedule in seconds",
    body: "Grab an open slot with the school nurse and get a reminder before period starts.",
  },
  {
    icon: FileText,
    title: "Your medical record, always on you",
    body: "Past visits, immunizations, and allergies in one place — ready to show a new doctor.",
  },
  {
    icon: Bell,
    title: "Cleared-to-return alert",
    body: "A push notification tells you and your teacher the moment you're cleared for class.",
  },
];