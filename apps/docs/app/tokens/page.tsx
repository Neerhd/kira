import tokensRaw from "kira-ui/tokens";

interface TokenEntry {
  name: string;
  varName: string;
  value: string;
  cssValue: string;
  description?: string;
}

interface TokenGroup {
  label: string;
  tokens: TokenEntry[];
}

type TokenNode = { value: string; type: string; description?: string } | { [key: string]: unknown };

function isLeaf(node: unknown): node is { value: string; type: string; description?: string } {
  return (
    typeof node === "object" &&
    node !== null &&
    "value" in node &&
    "type" in node
  );
}

function parseGlobalPath(parts: string[]): string {
  const [category, ...rest] = parts;
  if (category === "color") return `--kira-${rest.join("-")}`;
  if (category === "spacing") return `--kira-spacing-${rest.join("-")}`;
  if (category === "borderRadius") return `--kira-radius-${rest.join("-")}`;
  if (category === "fontSize") return `--kira-font-size-${rest.join("-")}`;
  if (category === "shadow") return `--kira-shadow-${rest.join("-")}`;
  if (category === "fontFamilies") return `--kira-font-family-${rest.join("-")}`;
  if (category === "fontWeights") return `--kira-font-weight-${rest.join("-")}`;
  if (category === "lineHeights") return `--kira-line-height-${rest.join("-")}`;
  if (category === "letterSpacing") return `--kira-letter-spacing-${rest.join("-")}`;
  if (category === "borderWidth") return `--kira-border-width-${rest.join("-")}`;
  if (category === "opacity") return `--kira-opacity-${rest.join("-")}`;
  return `--kira-${category}-${rest.join("-")}`;
}

function parseSemanticPath(parts: string[]): string {
  const [category, ...rest] = parts;
  if (category === "color") {
    const [sub, ...subRest] = rest;
    if (sub === "background") return `--kira-bg-${subRest.join("-")}`;
    if (sub === "border") return `--kira-border-${subRest.join("-")}`;
    if (sub === "text") return `--kira-text-${subRest.join("-")}`;
    if (sub === "interactive") return `--kira-interactive-${subRest.join("-")}`;
    if (sub === "feedback") return `--kira-feedback-${subRest.join("-")}`;
    return `--kira-${sub}-${subRest.join("-")}`;
  }
  return `--kira-semantic-${category}-${rest.join("-")}`;
}

function flattenNode(
  node: unknown,
  path: string[] = [],
  mode: "global" | "semantic" = "global"
): TokenEntry[] {
  const entries: TokenEntry[] = [];
  if (typeof node !== "object" || node === null) return entries;

  for (const [key, val] of Object.entries(node as Record<string, unknown>)) {
    const cur = [...path, key];
    if (isLeaf(val)) {
      const varName = mode === "global" ? parseGlobalPath(cur) : parseSemanticPath(cur);
      const cssValue = val.value.startsWith("{")
        ? `var(${parseGlobalPath(val.value.slice(1, -1).replace("global.", "").split("."))})`
        : val.value;
      entries.push({
        name: cur.join("."),
        varName,
        value: val.value,
        cssValue,
        description: val.description,
      });
    } else {
      entries.push(...flattenNode(val, cur, mode));
    }
  }
  return entries;
}

const tokens = tokensRaw as unknown as {
  global: Record<string, unknown>;
  semantic: Record<string, unknown>;
};

function groupGlobal(): TokenGroup[] {
  const groups: TokenGroup[] = [];
  for (const [category, node] of Object.entries(tokens.global)) {
    const entries = flattenNode(node, [category], "global");
    if (entries.length > 0) {
      groups.push({
        label: category
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (s) => s.toUpperCase()),
        tokens: entries,
      });
    }
  }
  return groups;
}

function groupSemantic(): TokenGroup[] {
  const groups: TokenGroup[] = [];
  for (const [category, node] of Object.entries(tokens.semantic)) {
    for (const [sub, subNode] of Object.entries(node as Record<string, unknown>)) {
      const entries = flattenNode(subNode, [category, sub], "semantic");
      if (entries.length > 0) {
        groups.push({
          label: `${category} / ${sub}`,
          tokens: entries,
        });
      }
    }
  }
  return groups;
}

function isColor(varName: string, value: string): boolean {
  return (
    varName.includes("color") ||
    varName.includes("-bg-") ||
    varName.includes("-text-") ||
    varName.includes("-border-") ||
    varName.includes("-interactive-") ||
    varName.includes("-feedback-") ||
    varName.match(/--kira-(neutral|blue|green|amber|red)-/) !== null ||
    /^#[0-9a-fA-F]{3,8}$/.test(value)
  );
}

function ColorSwatch({ cssValue, value }: { cssValue: string; value: string }) {
  const raw = /^#[0-9a-fA-F]{3,8}$/.test(value) ? value : cssValue;
  return (
    <div
      style={{
        width: "24px",
        height: "24px",
        borderRadius: "6px",
        backgroundColor: raw,
        border: "1px solid var(--kira-border-default)",
        flexShrink: 0,
      }}
    />
  );
}

export default function TokensPage() {
  const globalGroups = groupGlobal();
  const semanticGroups = groupSemantic();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      <div>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--kira-text-primary)",
            margin: "0 0 8px",
          }}
        >
          Design Tokens
        </h1>
        <p style={{ fontSize: "15px", color: "var(--kira-text-secondary)", margin: 0, lineHeight: "1.6" }}>
          All CSS custom properties generated from{" "}
          <code
            style={{
              fontFamily: "var(--kira-font-family-mono)",
              fontSize: "13px",
              backgroundColor: "var(--kira-bg-surface)",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            kira-tokens-v2.json
          </code>
          . Import via{" "}
          <code
            style={{
              fontFamily: "var(--kira-font-family-mono)",
              fontSize: "13px",
              backgroundColor: "var(--kira-bg-surface)",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            {"import 'kira-ui/styles'"}
          </code>
          .
        </p>
      </div>

      <Section title="Semantic Tokens" subtitle="Contextual tokens that reference global values. Use these in components.">
        {semanticGroups.map((group) => (
          <TokenTable key={group.label} group={group} />
        ))}
      </Section>

      <Section title="Global Tokens" subtitle="Raw design decisions. Prefer semantic tokens in application code.">
        {globalGroups.map((group) => (
          <TokenTable key={group.label} group={group} />
        ))}
      </Section>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "var(--kira-text-primary)",
            margin: "0 0 4px",
          }}
        >
          {title}
        </h2>
        <p style={{ fontSize: "13px", color: "var(--kira-text-secondary)", margin: 0 }}>
          {subtitle}
        </p>
      </div>
      {children}
    </section>
  );
}

function TokenTable({ group }: { group: TokenGroup }) {
  return (
    <div>
      <div
        style={{
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--kira-text-tertiary)",
          marginBottom: "8px",
        }}
      >
        {group.label}
      </div>
      <div
        style={{
          border: "1px solid var(--kira-border-default)",
          borderRadius: "var(--kira-radius-lg)",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--kira-bg-surface)" }}>
              {["Variable", "Value", ""].map((h, i) => (
                <th
                  key={i}
                  style={{
                    padding: "8px 14px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "var(--kira-text-secondary)",
                    borderBottom: "1px solid var(--kira-border-default)",
                    fontSize: "11px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {group.tokens.map((token, i) => (
              <tr
                key={token.varName}
                style={{
                  borderBottom:
                    i < group.tokens.length - 1
                      ? "1px solid var(--kira-border-default)"
                      : "none",
                  backgroundColor: "var(--kira-bg-elevated)",
                }}
              >
                <td style={{ padding: "10px 14px" }}>
                  <code
                    style={{
                      fontFamily: "var(--kira-font-family-mono), monospace",
                      color: "var(--kira-text-primary)",
                      fontSize: "12px",
                    }}
                  >
                    {token.varName}
                  </code>
                  {token.description && (
                    <div style={{ fontSize: "11px", color: "var(--kira-text-tertiary)", marginTop: "2px" }}>
                      {token.description}
                    </div>
                  )}
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <code
                    style={{
                      fontFamily: "var(--kira-font-family-mono), monospace",
                      color: "var(--kira-text-secondary)",
                      fontSize: "12px",
                    }}
                  >
                    {token.value}
                  </code>
                </td>
                <td style={{ padding: "10px 14px" }}>
                  {(isColor(token.varName, token.value)) && (
                    <ColorSwatch cssValue={token.cssValue} value={token.value} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
