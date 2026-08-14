/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {

      colors: {


        primary: "#14b8a6",
        primaryDark: "#0d9488",

        background: "#f8fafc",
        surface: "#ffffff",

        border: "#e2e8f0",

        textPrimary: "#0f172a",
        textSecondary: "#475569",
        textMuted: "#94a3b8",


        height: "#3b82f6",

        weight: "#6366f1",

        temperature: "#f97316",

        heartRate: "#f43f5e",   

        spo2: "#06b6d4",

        bmi: "#a855f7",

        success: "#22c55e",

        warning: "#f59e0b",

        danger: "#ef4444",

        info: "#3b82f6",

        treatment: "#8b5cf6",

      },

      fontFamily: {

        sans: ["Inter", "sans-serif"],

        heading: ["Poppins", "sans-serif"],

        mono: ["JetBrains Mono", "monospace"],

      },

      borderRadius: {

        xl: "16px",

        "2xl": "20px",

      },

      boxShadow: {

        card: "0 4px 12px rgba(15,23,42,0.08)",

      },

    },
  },

  plugins: [],
}