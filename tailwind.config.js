/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "cnx-dark-green": "#579E25",
        "cnx-green": "#6AC12B",
        "cnx-dark-blue": "#043071",
        "cnx-blue": "#115ccb",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1700px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
