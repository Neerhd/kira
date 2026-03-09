"use client";

import { Button } from "kira-ui";
import { Badge } from "kira-ui";
import { Input } from "kira-ui";
import { Textarea } from "kira-ui";
import { Card } from "kira-ui";
import { Divider } from "kira-ui";
import { Avatar } from "kira-ui";
import { Display, H1, H2, H3, H4, Body, BodySm, Label, Mono } from "kira-ui";
import { ComponentPreview } from "./ComponentPreview";

const previews: Record<string, React.ReactNode> = {
  button: (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="lg">Large</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
  badge: (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="dark">Dark</Badge>
      <Badge variant="success" dot>Success</Badge>
      <Badge variant="warning" dot>Warning</Badge>
      <Badge variant="error" dot>Error</Badge>
    </div>
  ),
  input: (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
      <Input label="Email address" placeholder="you@example.com" />
      <Input label="With helper" placeholder="Enter value" helperText="This is a helper text." />
      <Input label="Error state" placeholder="Enter value" error="This field is required." />
    </div>
  ),
  textarea: (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
      <Textarea label="Message" placeholder="Write something..." rows={3} />
      <Textarea label="Error state" placeholder="Write something..." error="Message cannot be empty." rows={3} />
    </div>
  ),
  card: (
    <Card style={{ width: "320px" }}>
      <Card.Header>
        <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--kira-text-primary)" }}>Card Title</span>
        <span style={{ fontSize: "13px", color: "var(--kira-text-secondary)" }}>Supporting subtitle text</span>
      </Card.Header>
      <Card.Body>
        <p style={{ fontSize: "14px", color: "var(--kira-text-secondary)", lineHeight: "1.6", margin: 0 }}>
          This is the card body. Cards use the elevated surface color and a subtle border.
        </p>
      </Card.Body>
      <Card.Footer style={{ justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Confirm</Button>
      </Card.Footer>
    </Card>
  ),
  divider: (
    <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <Divider />
      <Divider label="or continue with" />
      <div style={{ display: "flex", height: "48px", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "14px", color: "var(--kira-text-secondary)" }}>Left</span>
        <Divider orientation="vertical" />
        <span style={{ fontSize: "14px", color: "var(--kira-text-secondary)" }}>Right</span>
      </div>
    </div>
  ),
  avatar: (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar size="sm" fallback="Alice Chen" />
      <Avatar size="md" fallback="Bob Smith" />
      <Avatar size="lg" fallback="Carol White" />
      <Avatar
        size="md"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format"
        alt="Profile photo"
      />
    </div>
  ),
  typography: (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
      <H3>Heading 3 — 28px / Medium</H3>
      <H4>Heading 4 — 22px / Medium</H4>
      <Body>Body — 15px / Regular. Used for paragraphs and descriptions.</Body>
      <BodySm>Body Small — 13px / Regular. Supporting text.</BodySm>
      <Label>Label — 12px / Medium / Uppercase</Label>
      <Mono>mono — DM Mono</Mono>
    </div>
  ),
};

export function PreviewSection({ slug }: { slug: string }) {
  const preview = previews[slug];
  if (!preview) return null;
  return <ComponentPreview>{preview}</ComponentPreview>;
}
