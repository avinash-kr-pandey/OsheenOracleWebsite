/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-charm)", "sans-serif"],
        subheading: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
      },
      spacing: {
        section: "4rem",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
        },
      },
      colors: {
        primary: "#1a202c",
        secondary: "#718096",
        accent: "#f6ad55",
        background: "#f7fafc",
        heading: "#2d3748",
        subheading: "#4a5568",
        body: "#2d3748",
      },
      // Add animations here
      animation: {
        float: "float 8s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
        gradient: "gradient 3s ease infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      // Add keyframes here
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-20px) rotate(180deg)",
          },
        },
        glow: {
          "0%, 100%": {
            opacity: "0.2",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.3",
            transform: "scale(1.1)",
          },
        },
        gradient: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      },
      // Add backgroundSize for gradient animation
      backgroundSize: {
        "200-auto": "200% auto",
      },
    },
  },
  plugins: [],
};
