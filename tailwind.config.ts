import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    screens: {
      sm: "640px",
      md: "984px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
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
        gradient2: "var(--gradient2)",
        darkGradient: "var(--dark-gradient)",
        darkGradient2: "var(--dark-gradient2)",
      },
      borderWidth: {
        custom: "var(--border)",
      },
    },
  },
  plugins: [],
} satisfies Config;
