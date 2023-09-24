/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#009444",
      },
      animation: {
        slide: "slide 0.6s ease-in-out",
      },
      boxShadow: {
        card: "0px 0px 40px rgba(0, 0, 0, 0.05)",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(150vw)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
}

