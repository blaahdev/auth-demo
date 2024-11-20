import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "var(--white)",
        black: "var(--black)",
        accent: "var(--accent)",
      },
      boxShadow: {
        custom: "var(--shadow)",
      },
      backgroundImage: {
        gradient: "var(--gradient)",
      },
      borderWidth: {
        custom: "var(--border)",
      },
    },
  },
  plugins: [],
} satisfies Config;
