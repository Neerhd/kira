import type { PropRow } from "@/components/PropsTable";

export interface ComponentContent {
  title: string;
  description: string;
  code: string;
  props: PropRow[];
}

export const componentSlugs = [
  "button",
  "badge",
  "input",
  "textarea",
  "card",
  "divider",
  "avatar",
  "typography",
] as const;

export type ComponentSlug = (typeof componentSlugs)[number];

const registry: Record<string, ComponentContent> = {
  button: {
    title: "Button",
    description: "Triggers an action or event. Supports three variants and three sizes.",
    code: `import { Button } from "kira-ui";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="lg">Large</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  );
}`,
    props: [
      { name: "variant", type: '"primary" | "secondary" | "ghost"', default: '"primary"', description: "Visual style of the button." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height and padding of the button." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and applies opacity." },
      { name: "className", type: "string", description: "Additional CSS classes to merge." },
      { name: "onClick", type: "React.MouseEventHandler", description: "Click handler." },
    ],
  },
  badge: {
    title: "Badge",
    description: "Compact label for status, category, or metadata. Supports dot indicator and six semantic variants.",
    code: `import { Badge } from "kira-ui";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="dark">Dark</Badge>
      <Badge variant="success" dot>Success</Badge>
      <Badge variant="warning" dot>Warning</Badge>
      <Badge variant="error" dot>Error</Badge>
    </div>
  );
}`,
    props: [
      { name: "variant", type: '"default" | "accent" | "dark" | "success" | "warning" | "error"', default: '"default"', description: "Color scheme of the badge." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "Controls font size and padding." },
      { name: "dot", type: "boolean", default: "false", description: "Prepends a status dot in the badge's current color." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
  },
  input: {
    title: "Input",
    description: "Single-line text input with optional label, helper text, and error state.",
    code: `import { Input } from "kira-ui";

export default function Example() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input label="Email address" placeholder="you@example.com" />
      <Input
        label="With helper"
        placeholder="Enter value"
        helperText="This is a helper text."
      />
      <Input
        label="Error state"
        placeholder="Enter value"
        error="This field is required."
      />
    </div>
  );
}`,
    props: [
      { name: "label", type: "string", description: "Label displayed above the input." },
      { name: "helperText", type: "string", description: "Supporting text shown below. Hidden when error is set." },
      { name: "error", type: "string", description: "Error message. Overrides helperText and applies error styling." },
      { name: "placeholder", type: "string", description: "Placeholder text." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
      { name: "className", type: "string", description: "Additional CSS classes for the input element." },
    ],
  },
  textarea: {
    title: "Textarea",
    description: "Multi-line text input. Shares the same API as Input with an additional rows prop.",
    code: `import { Textarea } from "kira-ui";

export default function Example() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Textarea label="Message" placeholder="Write something..." rows={3} />
      <Textarea
        label="Error state"
        placeholder="Write something..."
        error="Message cannot be empty."
        rows={3}
      />
    </div>
  );
}`,
    props: [
      { name: "label", type: "string", description: "Label displayed above the textarea." },
      { name: "helperText", type: "string", description: "Supporting text shown below." },
      { name: "error", type: "string", description: "Error message. Overrides helperText and applies error styling." },
      { name: "rows", type: "number", default: "4", description: "Number of visible text rows." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the textarea." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
  },
  card: {
    title: "Card",
    description: "Surface container with compound sub-components: Card.Header, Card.Body, and Card.Footer.",
    code: `import { Card, Button } from "kira-ui";

export default function Example() {
  return (
    <Card style={{ width: "320px" }}>
      <Card.Header>
        <span>Card Title</span>
        <span>Supporting subtitle text</span>
      </Card.Header>
      <Card.Body>
        <p>This is the card body. Place your main content here.</p>
      </Card.Body>
      <Card.Footer style={{ justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Confirm</Button>
      </Card.Footer>
    </Card>
  );
}`,
    props: [
      { name: "className", type: "string", description: "Additional CSS classes for the root card element." },
      { name: "Card.Header", type: "React.FC", description: "Top section with border-bottom. Typically contains title + subtitle." },
      { name: "Card.Body", type: "React.FC", description: "Main content area with balanced padding." },
      { name: "Card.Footer", type: "React.FC", description: "Bottom section with border-top. Typically contains actions." },
    ],
  },
  divider: {
    title: "Divider",
    description: "Horizontal or vertical separator. Supports an optional centered label.",
    code: `import { Divider } from "kira-ui";

export default function Example() {
  return (
    <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Basic horizontal */}
      <Divider />

      {/* With label */}
      <Divider label="or continue with" />

      {/* Vertical */}
      <div style={{ display: "flex", height: "48px", alignItems: "center", gap: "12px" }}>
        <span>Left</span>
        <Divider orientation="vertical" />
        <span>Right</span>
      </div>
    </div>
  );
}`,
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction of the divider." },
      { name: "label", type: "string", description: "Optional centered text label (horizontal only)." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
  },
  avatar: {
    title: "Avatar",
    description: "Circular user image with fallback initials. Three sizes available.",
    code: `import { Avatar } from "kira-ui";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar size="sm" fallback="Alice Chen" />
      <Avatar size="md" fallback="Bob Smith" />
      <Avatar size="lg" fallback="Carol White" />
      <Avatar
        size="md"
        src="https://example.com/photo.jpg"
        alt="Profile photo"
      />
    </div>
  );
}`,
    props: [
      { name: "src", type: "string", description: "Image URL. Falls back to initials on error." },
      { name: "alt", type: "string", description: "Alt text for the image." },
      { name: "fallback", type: "string", description: "Full name used to generate initials when image is absent or fails." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Controls avatar diameter." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
  },
  typography: {
    title: "Typography",
    description: "Named exports for all typographic styles. Each component maps to a semantic HTML element.",
    code: `import {
  Display, H1, H2, H3, H4,
  Body, BodySm, Label, Mono,
} from "kira-ui";

export default function Example() {
  return (
    <div>
      <Display>Display</Display>
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
      <Body>Body paragraph text.</Body>
      <BodySm>Small supporting text.</BodySm>
      <Label>Section Label</Label>
      <Mono>code snippet</Mono>
    </div>
  );
}`,
    props: [
      { name: "Display", type: "h1", description: "64px Semibold, tight tracking. Page hero headlines." },
      { name: "H1", type: "h1", description: "48px Semibold." },
      { name: "H2", type: "h2", description: "36px Semibold." },
      { name: "H3", type: "h3", description: "28px Medium." },
      { name: "H4", type: "h4", description: "22px Medium." },
      { name: "Body", type: "p", description: "15px Regular, 1.7 line height. Primary paragraph text." },
      { name: "BodySm", type: "p", description: "13px Regular, secondary text color." },
      { name: "Label", type: "span", description: "12px Medium, uppercase, wide tracking. Section labels." },
      { name: "Mono", type: "code", description: "13px DM Mono. Inline code with surface background." },
    ],
  },
};

export function getComponentContent(slug: string): ComponentContent | null {
  return registry[slug] ?? null;
}
