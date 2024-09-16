const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#1A71FF",
      secondary: "#FF4949",
      darkbg: "#1c1f2e",
      onprimary: "#E2E2E2",
      onsecondary: "#9E9E9E",
    },
  },
  plugins: [],
});
