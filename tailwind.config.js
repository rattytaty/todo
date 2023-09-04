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
          "accent": "#f1ecec",
          "success": "#36d399",
          "secondary": "#262a2d",

          "primary": "#641ae6",
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
          "accent": "#2a2f3d",
          "success": "#36d399",
          "secondary": "#4124a0",

          "primary": "#7d3ce7",
        },
      },

    ],
  },
}
