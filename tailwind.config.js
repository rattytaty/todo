/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans':['Nunito'],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        myLightTheme: {
          "background": "rgba(207,213,183,0.89)",
          "neutral": "#262a2d",
          "primary": "#641ae6",
          "secondary": "#d926a9",
          "accent": "#1fb2a6",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",

        },
      },
      "dark",
      "cupcake",
    ],
  },
}
