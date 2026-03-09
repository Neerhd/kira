"use client";

import { useState } from "react";

const themes = [
  { id: "default", label: "Blue", accent: "#0057FF" },
  { id: "violet", label: "Violet", accent: "#7C3AED" },
  { id: "emerald", label: "Emerald", accent: "#059669" },
  { id: "rose", label: "Rose", accent: "#E11D48" },
  { id: "amber", label: "Amber", accent: "#D97706" },
];

export function ThemeSwitcher() {
  const [active, setActive] = useState("default");

  function applyTheme(themeId: string, accent: string) {
    setActive(themeId);
    const root = document.documentElement;

    if (themeId === "default") {
      root.style.removeProperty("--kira-interactive-primary-bg");
      root.style.removeProperty("--kira-border-accent");
      root.style.removeProperty("--kira-text-accent");
      root.style.removeProperty("--kira-bg-accent");
    } else {
      root.style.setProperty("--kira-interactive-primary-bg", accent);
      root.style.setProperty("--kira-border-accent", accent);
      root.style.setProperty("--kira-text-accent", accent);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <span
        style={{
          fontSize: "12px",
          color: "var(--kira-text-tertiary)",
          marginRight: "4px",
        }}
      >
        Accent
      </span>
      {themes.map((theme) => (
        <button
          key={theme.id}
          title={theme.label}
          onClick={() => applyTheme(theme.id, theme.accent)}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: theme.accent,
            border: active === theme.id
              ? "2px solid var(--kira-text-primary)"
              : "2px solid transparent",
            cursor: "pointer",
            padding: 0,
            outline: "none",
            boxShadow: active === theme.id
              ? "0 0 0 2px var(--kira-bg-elevated), 0 0 0 4px var(--kira-text-primary)"
              : "none",
            transition: "box-shadow 0.15s ease",
          }}
        />
      ))}
    </div>
  );
}
