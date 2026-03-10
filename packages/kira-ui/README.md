# kira-ui

Kira is a React component library and design token system built for consistency and flexibility.

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
