const baseConfig = require("@ai-native-elements/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: ["./src/**/*.{ts,tsx}"],
};
