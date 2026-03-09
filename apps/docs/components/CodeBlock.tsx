import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export async function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    theme: "github-light",
  });

  return (
    <div
      style={{
        borderRadius: "var(--kira-radius-lg)",
        border: "1px solid var(--kira-border-default)",
        overflow: "hidden",
        fontSize: "13px",
        lineHeight: "1.6",
        position: "relative",
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          padding: "20px 24px",
          overflow: "auto",
          maxHeight: "400px",
        }}
      />
    </div>
  );
}
