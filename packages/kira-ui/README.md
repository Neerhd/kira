# kira-ui

Kira is a React component library and design token system built for consistency and flexibility.

## Next.js 15 + Tailwind v4 setup

### Install

```bash
npm install @neerhd/kira-ui postcss-import
```

### postcss.config.mjs

```js
export default {
  plugins: {
    "postcss-import": {},
    "@tailwindcss/postcss": {},
  },
};
```

### app/globals.css

Add these three lines at the top of the file, in this order:

```css
@import "@neerhd/kira-ui/dist/style.css";
@source "../node_modules/@neerhd/kira-ui/dist/kira-ui.es.js";
@import "tailwindcss";
```

### app/layout.tsx

Import styles in `globals.css` only. Never import kira styles in `layout.tsx` or any JS/TS file.

```tsx
import "./globals.css"; // ✓ correct
import "@neerhd/kira-ui/styles"; // ✗ do not do this
```

### Why each step matters

- **postcss-import** — Tailwind v4 does not resolve third-party `@import` statements without this. The kira CSS variables will be silently dropped with no build errors.
- **dist/style.css explicit path** — `postcss-import` does not reliably honour `package.json` exports aliases. Use the direct path.
- **@source directive** — Tailwind v4 does not scan `node_modules` by default. Without this, kira component classes exist on DOM elements but have no corresponding CSS rules — components render as unstyled HTML with no errors.
- **CSS pipeline only** — Importing via JS (e.g. in `layout.tsx`) creates a second processing pipeline that conflicts with the PostCSS pipeline. One import, one pipeline.

### Verify your setup

Run this from your project root to check all four conditions:

```bash
node node_modules/@neerhd/kira-ui/scripts/check-setup.js
```

---

## Installation

```bash
npm install kira-ui
```

## Usage

Import the stylesheet once at the root of your app (this loads all `--kira-*` CSS custom properties):

```tsx
import 'kira-ui/styles';
```

Then use components and tokens anywhere:

```tsx
import { Button, Input, Card } from 'kira-ui';

export default function App() {
  return (
    <div style={{ backgroundColor: 'var(--kira-bg-default)', padding: '24px' }}>
      <Card>
        <Card.Header>
          <span style={{ color: 'var(--kira-text-primary)' }}>Hello, Kira</span>
        </Card.Header>
        <Card.Body>
          <Input label="Email" placeholder="you@example.com" />
        </Card.Body>
        <Card.Footer style={{ justifyContent: 'flex-end' }}>
          <Button variant="primary">Submit</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
```

## Design tokens

All tokens are exposed as CSS custom properties after importing `kira-ui/styles`. Key semantic tokens:

| Token | Value |
|---|---|
| `--kira-bg-default` | Page background |
| `--kira-bg-surface` | Cards, inputs, panels |
| `--kira-bg-elevated` | Elevated surfaces, dropdowns |
| `--kira-text-primary` | Primary text |
| `--kira-text-secondary` | Secondary / supporting text |
| `--kira-border-default` | Default borders |
| `--kira-interactive-primary-bg` | Primary button / accent |

The raw token definitions are also importable:

```ts
import tokens from 'kira-ui/tokens';
```

## Peer dependencies

```
react >= 18
react-dom >= 18
```
