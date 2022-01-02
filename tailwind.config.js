const colors = require('tailwindcss/colors');


module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        body: "#9CA3AF",
        heading: "#E5E7EB",
        highlight: "#0F766E",
        error: colors.red["600"]
      },
      fontFamily: {
        sans: ['Roboto', "sans-serif"],
        title: ['Inter', "sans-serif"],
        mono: ["'Roboto Mono'", "monospace"]
      },
    }
  },
}
