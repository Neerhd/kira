import * as React from "react";

interface ComponentPreviewProps {
  children: React.ReactNode;
  className?: string;
}

export function ComponentPreview({ children, className }: ComponentPreviewProps) {
  return (
    <div
      style={{
        borderRadius: "var(--kira-radius-xl)",
        border: "1px solid var(--kira-border-default)",
        backgroundColor: "var(--kira-bg-elevated)",
        padding: "48px 32px",
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "140px",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
