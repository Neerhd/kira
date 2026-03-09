import { writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Load token JSON ────────────────────────────────────────────────────────
const raw = JSON.parse(
  readFileSync(resolve(__dirname, "../src/tokens/kira-tokens-v2.json"), "utf-8")
) as TokenFile;

interface TokenValue {
  value: string;
  type: string;
  description?: string;
}
interface TokenNode {
  [key: string]: TokenValue | TokenNode;
}
interface TokenFile {
  global: TokenNode;
  semantic: TokenNode;
}

function isLeaf(node: unknown): node is TokenValue {
  return (
    typeof node === "object" && node !== null && "value" in node && "type" in node
  );
}

// ── Global → CSS var name mapping ─────────────────────────────────────────
function globalPath(parts: string[]): string {
  const [category, ...rest] = parts;
  if (category === "color") return `--kira-${rest.join("-")}`;
  if (category === "spacing") return `--kira-spacing-${rest.join("-")}`;
  if (category === "borderRadius") return `--kira-radius-${rest.join("-")}`;
  if (category === "borderWidth") return `--kira-border-width-${rest.join("-")}`;
  if (category === "opacity") return `--kira-opacity-${rest.join("-")}`;
  if (category === "fontFamilies") return `--kira-font-family-${rest.join("-")}`;
  if (category === "fontWeights") return `--kira-font-weight-${rest.join("-")}`;
  if (category === "fontSize") return `--kira-font-size-${rest.join("-")}`;
  if (category === "lineHeights") return `--kira-line-height-${rest.join("-")}`;
  if (category === "letterSpacing") return `--kira-letter-spacing-${rest.join("-")}`;
  if (category === "shadow") return `--kira-shadow-${rest.join("-")}`;
  return `--kira-${category}-${rest.join("-")}`;
}

// ── Semantic → CSS var name mapping ───────────────────────────────────────
function semanticPath(parts: string[]): string {
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

// ── Flatten tokens ─────────────────────────────────────────────────────────
function flatten(
  node: TokenNode,
  path: string[] = [],
  result: Array<{ varName: string; value: string; rawValue: string; type: string }> = [],
  mode: "global" | "semantic" = "global"
): typeof result {
  for (const [key, val] of Object.entries(node)) {
    const currentPath = [...path, key];
    if (isLeaf(val)) {
      const varName =
        mode === "global" ? globalPath(currentPath) : semanticPath(currentPath);
      result.push({
        varName,
        value: val.value,
        rawValue: val.value,
        type: val.type,
      });
    } else {
      flatten(val as TokenNode, currentPath, result, mode);
    }
  }
  return result;
}

// ── Build lookup: reference path → CSS var ────────────────────────────────
const globalFlat = flatten(raw.global, [], [], "global");
const globalLookup = new Map<string, string>();
for (const t of globalFlat) globalLookup.set(t.varName, t.varName);

// Build path → varName from flat global tokens
function buildRefLookup(): Map<string, string> {
  const map = new Map<string, string>();
  function walk(node: TokenNode, path: string[] = []) {
    for (const [key, val] of Object.entries(node)) {
      const cur = [...path, key];
      if (isLeaf(val)) {
        const varName = globalPath(cur);
        // Store both dotted path and reference format
        map.set(cur.join("."), varName);
      } else {
        walk(val as TokenNode, cur);
      }
    }
  }
  walk(raw.global);
  return map;
}

const refLookup = buildRefLookup();

function resolveValue(value: string): string {
  // Handle {global.color.blue.500} style references
  const refMatch = value.match(/^\{(.+)\}$/);
  if (refMatch) {
    const refPath = refMatch[1];
    // Strip "global." prefix
    const stripped = refPath.replace(/^global\./, "");
    const varName = refLookup.get(stripped);
    if (varName) return `var(${varName})`;
  }
  return value;
}

// ── Format values ──────────────────────────────────────────────────────────
function formatValue(value: string, type: string): string {
  const resolved = resolveValue(value);
  if (resolved !== value) return resolved; // was a reference, already good

  switch (type) {
    case "spacing":
    case "borderRadius":
    case "borderWidth":
    case "fontSize":
      return `${value}px`;
    case "opacity":
      return value;
    case "lineHeights":
      return value;
    case "letterSpacing":
      return value;
    case "fontWeights":
      return value;
    default:
      return value;
  }
}

// ── Generate variables.css ─────────────────────────────────────────────────
const globalEntries = globalFlat.map(
  (t) => `  ${t.varName}: ${formatValue(t.value, t.type)};`
);

const semanticFlat = flatten(raw.semantic, [], [], "semantic");
const semanticEntries = semanticFlat.map(
  (t) => `  ${t.varName}: ${resolveValue(t.value)};`
);

const cssOutput = `/* AUTO-GENERATED — do not edit manually. Run: pnpm generate-tokens */
/* Generated: ${new Date().toISOString()} */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

:root {
  /* ── Global Tokens ── */
${globalEntries.join("\n")}

  /* ── Semantic Tokens ── */
${semanticEntries.join("\n")}
}
`;

writeFileSync(resolve(__dirname, "../src/tokens/variables.css"), cssOutput);
console.log("✓ variables.css written");

// ── Generate tailwind-tokens.ts ───────────────────────────────────────────
// Build structured objects for Tailwind theme extension
const colors: Record<string, string> = {};
const spacing: Record<string, string> = {};
const borderRadius: Record<string, string> = {};
const fontSize: Record<string, string> = {};
const boxShadow: Record<string, string> = {};

// Global colors
function walkColors(node: TokenNode, prefix: string[] = []) {
  for (const [key, val] of Object.entries(node)) {
    const cur = [...prefix, key];
    if (isLeaf(val)) {
      const varName = `--kira-${cur.join("-")}`;
      colors[`kira-${cur.join("-")}`] = `var(${varName})`;
    } else {
      walkColors(val as TokenNode, cur);
    }
  }
}
if (raw.global.color) walkColors(raw.global.color as TokenNode);

// Semantic colors
function walkSemanticColors(node: TokenNode, prefix: string[] = []) {
  for (const [key, val] of Object.entries(node)) {
    const cur = [...prefix, key];
    if (isLeaf(val)) {
      const varName = semanticPath(["color", ...cur]);
      colors[`kira-${cur.join("-")}`] = `var(${varName})`;
    } else {
      walkSemanticColors(val as TokenNode, cur);
    }
  }
}
if (raw.semantic?.color) walkSemanticColors(raw.semantic.color as TokenNode);

// Semantic shorthand helpers
const semanticColorMap: Record<string, string> = {
  "kira-bg-default": "var(--kira-bg-default)",
  "kira-bg-surface": "var(--kira-bg-surface)",
  "kira-bg-elevated": "var(--kira-bg-elevated)",
  "kira-bg-inverse": "var(--kira-bg-inverse)",
  "kira-bg-accent": "var(--kira-bg-accent)",
  "kira-border-default": "var(--kira-border-default)",
  "kira-border-strong": "var(--kira-border-strong)",
  "kira-border-accent": "var(--kira-border-accent)",
  "kira-border-focus": "var(--kira-border-focus)",
  "kira-text-primary": "var(--kira-text-primary)",
  "kira-text-secondary": "var(--kira-text-secondary)",
  "kira-text-tertiary": "var(--kira-text-tertiary)",
  "kira-text-inverse": "var(--kira-text-inverse)",
  "kira-text-accent": "var(--kira-text-accent)",
  "kira-text-disabled": "var(--kira-text-disabled)",
  "kira-interactive-primary-bg": "var(--kira-interactive-primary-bg)",
  "kira-interactive-primary-bg-hover": "var(--kira-interactive-primary-bg-hover)",
  "kira-interactive-primary-bg-active": "var(--kira-interactive-primary-bg-active)",
  "kira-interactive-primary-text": "var(--kira-interactive-primary-text)",
  "kira-interactive-secondary-border": "var(--kira-interactive-secondary-border)",
  "kira-interactive-secondary-text": "var(--kira-interactive-secondary-text)",
  "kira-interactive-ghost-text": "var(--kira-interactive-ghost-text)",
  "kira-interactive-ghost-bg-hover": "var(--kira-interactive-ghost-bg-hover)",
  "kira-feedback-success": "var(--kira-feedback-success)",
  "kira-feedback-success-subtle": "var(--kira-feedback-success-subtle)",
  "kira-feedback-success-text": "var(--kira-feedback-success-text)",
  "kira-feedback-warning": "var(--kira-feedback-warning)",
  "kira-feedback-warning-subtle": "var(--kira-feedback-warning-subtle)",
  "kira-feedback-warning-text": "var(--kira-feedback-warning-text)",
  "kira-feedback-error": "var(--kira-feedback-error)",
  "kira-feedback-error-subtle": "var(--kira-feedback-error-subtle)",
  "kira-feedback-error-text": "var(--kira-feedback-error-text)",
};
Object.assign(colors, semanticColorMap);

// Spacing
for (const [key, val] of Object.entries(raw.global.spacing as TokenNode)) {
  if (isLeaf(val)) {
    spacing[`kira-${key}`] = `var(--kira-spacing-${key})`;
  }
}

// Border radius
for (const [key, val] of Object.entries(raw.global.borderRadius as TokenNode)) {
  if (isLeaf(val)) {
    borderRadius[`kira-${key}`] = `var(--kira-radius-${key})`;
  }
}

// Font size
for (const [key, val] of Object.entries(raw.global.fontSize as TokenNode)) {
  if (isLeaf(val)) {
    fontSize[`kira-${key}`] = [`var(--kira-font-size-${key})`, { lineHeight: "1.5" }] as unknown as string;
  }
}

// Box shadow
for (const [key, val] of Object.entries(raw.global.shadow as TokenNode)) {
  if (isLeaf(val)) {
    boxShadow[`kira-${key}`] = `var(--kira-shadow-${key})`;
  }
}

const tsOutput = `/* AUTO-GENERATED — do not edit manually. Run: pnpm generate-tokens */
/* Generated: ${new Date().toISOString()} */

export const kiraTokens = {
  colors: ${JSON.stringify(colors, null, 4)},
  spacing: ${JSON.stringify(spacing, null, 4)},
  borderRadius: ${JSON.stringify(borderRadius, null, 4)},
  fontSize: ${JSON.stringify(fontSize, null, 4)},
  fontFamily: {
    "kira-sans": ["var(--kira-font-family-sans)", "Inter", "system-ui", "sans-serif"],
    "kira-mono": ["var(--kira-font-family-mono)", "DM Mono", "monospace"],
  },
  boxShadow: ${JSON.stringify(boxShadow, null, 4)},
} as const;
`;

writeFileSync(resolve(__dirname, "../src/tokens/tailwind-tokens.ts"), tsOutput);
console.log("✓ tailwind-tokens.ts written");

console.log("\n✅ Token generation complete!");
console.log(`   Global tokens: ${globalFlat.length}`);
console.log(`   Semantic tokens: ${semanticFlat.length}`);
