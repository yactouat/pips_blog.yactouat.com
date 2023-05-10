/** @type {import('tailwindcss').Config} */
module.exports = {
  // `content` tells Tailwind where the markup is so that styles are built correctly
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        template: {
          altneutral: "#808080",
          dbg: "#000000",
          dneutral: "#FFFFFF",
          dneutrals1: "#E5E5E5",
          dneutrals2: "#cecece",
          dneutrals3: "#b9b9b9",
          lneutral: "#000000",
          lneutralt1: "#191919",
          lneutralt2: "#2f2f2f",
          lneutralt3: "#434343",
          lbg: "#FFFFFF",
        },
      },
      screens: {
        tallscreen: {
          // aspect ratio emphasizes that the viewport should be up to 64% taller than it is wide to apply this
          raw: "(max-aspect-ratio: 13/20)",
        },
        widescreen: {
          // aspect ratio emphasizes that the viewport should be wider than it is tall to apply this
          raw: "(min-aspect-ratio: 3/2)",
        },
      },
      keyframes: {
        "open-menu": {
          "0%": {
            transform: "scaleY(0)",
          },
          // giving up a little bounce effect for the open menu animation
          "80%": {
            transform: "scaleY(1.2)",
          },
          "100%": {
            transform: "scaleY(1)",
          },
        },
      },
      animation: {
        "open-menu": "open-menu 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
