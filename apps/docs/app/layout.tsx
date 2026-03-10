import type { Metadata } from "next";
import "kira-ui/styles";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export const metadata: Metadata = {
  title: "Kira Design System",
  description: "Component library and design token reference for Kira",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "var(--kira-font-family-sans), Inter, system-ui, sans-serif",
          backgroundColor: "var(--kira-bg-default)",
          color: "var(--kira-text-primary)",
          margin: 0,
        }}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header
              style={{
                borderBottom: "1px solid var(--kira-border-default)",
                backgroundColor: "var(--kira-bg-elevated)",
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                position: "sticky",
                top: 0,
                zIndex: 10,
              }}
            >
              <ThemeSwitcher />
            </header>
            <main
              style={{
                flex: 1,
                padding: "40px 48px",
                maxWidth: "900px",
              }}
            >
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
