import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/CodeBlock";
import { PropsTable } from "@/components/PropsTable";
import { PreviewSection } from "@/components/PreviewSection";
import { componentSlugs, getComponentContent } from "@/content/registry";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return componentSlugs.map((slug) => ({ slug }));
}

export default function ComponentPage({ params }: PageProps) {
  const content = getComponentContent(params.slug);

  if (!content) notFound();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* Header */}
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
          {content.title}
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "var(--kira-text-secondary)",
            margin: 0,
            lineHeight: "1.6",
          }}
        >
          {content.description}
        </p>
      </div>

      {/* Preview — client component */}
      <section>
        <SectionLabel>Preview</SectionLabel>
        <PreviewSection slug={params.slug} />
      </section>

      {/* Code — server component (shiki) */}
      <section>
        <SectionLabel>Code</SectionLabel>
        <CodeBlock code={content.code} lang="tsx" />
      </section>

      {/* Props */}
      <section>
        <SectionLabel>Props</SectionLabel>
        <PropsTable props={content.props} />
      </section>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--kira-text-tertiary)",
        marginBottom: "12px",
        marginTop: 0,
      }}
    >
      {children}
    </p>
  );
}
