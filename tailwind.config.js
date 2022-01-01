module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', "sans-serif"],
      title: ['Inter', "sans-serif"]
    },
    extend: {
      colors: {
        body: "#9CA3AF",
        heading: "#E5E7EB",
        highlight: "#0F766E"
      }
    }
  },
}
