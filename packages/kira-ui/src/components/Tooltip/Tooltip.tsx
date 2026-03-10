"use client";

import { useState, ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom";
}

export function Tooltip({ content, children, position = "top" }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const isTop = position === "top";

  const bubbleStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    ...(isTop
      ? { bottom: "calc(100% + 8px)" }
      : { top: "calc(100% + 8px)" }),
    transform: visible
      ? "translateX(-50%) translateY(0)"
      : `translateX(-50%) translateY(${isTop ? "4px" : "-4px"})`,
    opacity: visible ? 1 : 0,
    pointerEvents: "none",
    whiteSpace: "nowrap",
    transition: "opacity 0.15s ease, transform 0.15s ease",
    background: "var(--kira-bg-inverse)",
    color: "var(--kira-text-inverse)",
    fontSize: "var(--kira-font-size-12)",
    fontFamily: "var(--font-inter, 'Inter', sans-serif)",
    padding: "var(--kira-spacing-2) var(--kira-spacing-3)",
    borderRadius: "var(--kira-radius-md)",
    boxShadow: "var(--kira-shadow-md)",
    zIndex: 50,
  };

  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <span style={bubbleStyle}>{content}</span>
    </span>
  );
}
