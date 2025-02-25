module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'notion-bg': '#202124',      // Dark background
      'notion-text': '#E8EAED',    // Light text color
      'notion-border': '#3C4043',  // Border color for dark mode
    }
  },
  plugins: [],
};