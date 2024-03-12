import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      hipzip: {
        white: "#F5F5F5",
        amber: "#FFBF00",
        gray: "#808080",
        darkgray: "#121214",
        black: "#000000",
      },
      kakao: {
        yellow: "#F9E000",
      },
    },
    extend: {
      keyframes: {
        vibrate: {
          "0%": {
            transform: "translate(0)",
          },
          "10%": {
            transform: "translate(-4px, -4px)",
          },
          "20%": {
            transform: "translate(4px, -4px)",
          },
          "30%": {
            transform: "translate(-4px, 4px)",
          },
          "40%": {
            transform: "translate(4px, 4px)",
          },
          "50%": {
            transform: "translate(-4px, -4px)",
          },
          "60%": {
            transform: "translate(4px, -4px)",
          },
          "70%": {
            transform: "translate(-4px, 4px)",
          },
          "80%": {
            transform: "translate(-4px, -4px)",
          },
          "90%": {
            transform: "translate(4px, -4px)",
          },
          "100%": {
            transform: "translate(0)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        vibrate: "vibrate 0.3s infinite both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
