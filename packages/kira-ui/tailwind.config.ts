import type { Config } from "tailwindcss";
import { kiraTokens } from "./src/tokens/tailwind-tokens";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: kiraTokens.colors,
      spacing: kiraTokens.spacing,
      borderRadius: kiraTokens.borderRadius,
      fontSize: kiraTokens.fontSize,
      fontFamily: kiraTokens.fontFamily,
      boxShadow: kiraTokens.boxShadow,
    },
  },
  plugins: [],
};

export default config;
