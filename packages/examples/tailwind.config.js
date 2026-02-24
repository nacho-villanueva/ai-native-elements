const baseConfig = require("@ai-native-elements/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../elements/src/**/*.{js,jsx,ts,tsx}",
    "../elements/dist/**/*.{js,mjs}",
    "../shadcn-ui/src/**/*.{js,jsx,ts,tsx}",
  ],
};
