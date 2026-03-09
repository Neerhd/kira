import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "../../packages/kira-ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "kira-bg-default": "var(--kira-bg-default)",
        "kira-bg-surface": "var(--kira-bg-surface)",
        "kira-bg-elevated": "var(--kira-bg-elevated)",
        "kira-bg-inverse": "var(--kira-bg-inverse)",
        "kira-bg-accent": "var(--kira-bg-accent)",
        "kira-border-default": "var(--kira-border-default)",
        "kira-border-strong": "var(--kira-border-strong)",
        "kira-border-accent": "var(--kira-border-accent)",
        "kira-text-primary": "var(--kira-text-primary)",
        "kira-text-secondary": "var(--kira-text-secondary)",
        "kira-text-tertiary": "var(--kira-text-tertiary)",
        "kira-text-inverse": "var(--kira-text-inverse)",
        "kira-text-accent": "var(--kira-text-accent)",
        "kira-interactive-primary-bg": "var(--kira-interactive-primary-bg)",
        "kira-interactive-primary-text": "var(--kira-interactive-primary-text)",
        "kira-feedback-success": "var(--kira-feedback-success)",
        "kira-feedback-warning": "var(--kira-feedback-warning)",
        "kira-feedback-error": "var(--kira-feedback-error)",
      },
      fontFamily: {
        sans: ["var(--kira-font-family-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--kira-font-family-mono)", "DM Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
