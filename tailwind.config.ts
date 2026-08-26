import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14231F",
        cream: "#FBF7F0",
        moss: "#2F6B4F",
        clay: "#C9622E",
        line: "#E4DCCB",
        whatsapp: "#25D366",
        "whatsapp-dark": "#1EBE5D",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        floating: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        mobile: "0 4px 20px -2px rgba(20, 35, 31, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
