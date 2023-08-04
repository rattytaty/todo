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
          "base-100": "#ffffff",
          "info": "#2b2929",
          "warning": "#fbbd23",
          "error": "#ed4242",

          "success": "#36d399",
          "primary": "#641ae6",
          "secondary": "#d926a9",
          "accent": "#1fb2a6",
        },
      },
      {
        myDarkTheme: {
          "background": "#111111",
          "neutral": "#ffffff",
          "base-100": "#181B23",
          "info": "#f1ecec",
          "warning": "#4124a0",
          "error": "#ba2626",


          "primary": "#7d3ce7",
          "secondary": "#d926a9",
          "accent": "#4f3284",
          "success": "#36d399",
        },
      },

    ],
  },
}
