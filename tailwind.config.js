/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background-light": "#f9fafb", // light gray
        "background-dark": "#111827", // near-black
        "foreground-light": "#111827", // dark text
        "foreground-dark": "#f9fafb", // light text
        "primary-light": "#2563eb", // blue-600
        "primary-dark": "#60a5fa", // blue-400
      },
    },
  },
};
