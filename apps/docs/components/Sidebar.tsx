"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    section: "Foundation",
    links: [{ href: "/tokens", label: "Tokens" }],
  },
  {
    section: "Components",
    links: [
      { href: "/components/button", label: "Button" },
      { href: "/components/badge", label: "Badge" },
      { href: "/components/input", label: "Input" },
      { href: "/components/textarea", label: "Textarea" },
      { href: "/components/card", label: "Card" },
      { href: "/components/divider", label: "Divider" },
      { href: "/components/avatar", label: "Avatar" },
      { href: "/components/typography", label: "Typography" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "220px",
        flexShrink: 0,
        borderRight: "1px solid var(--kira-border-default)",
        backgroundColor: "var(--kira-bg-elevated)",
        padding: "32px 0",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div style={{ padding: "0 20px 24px" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--kira-text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Kira
          </span>
        </Link>
        <span
          style={{
            marginLeft: "8px",
            fontSize: "11px",
            color: "var(--kira-text-tertiary)",
            fontWeight: 500,
          }}
        >
          v0.2.0
        </span>
      </div>

      {navItems.map((group) => (
        <div key={group.section} style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--kira-text-tertiary)",
              padding: "0 20px",
              marginBottom: "6px",
            }}
          >
            {group.section}
          </div>
          {group.links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  padding: "7px 20px",
                  fontSize: "14px",
                  textDecoration: "none",
                  borderRadius: "6px",
                  margin: "1px 8px",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive
                    ? "var(--kira-text-primary)"
                    : "var(--kira-text-secondary)",
                  backgroundColor: isActive
                    ? "var(--kira-bg-surface)"
                    : "transparent",
                  transition: "all 0.1s ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
