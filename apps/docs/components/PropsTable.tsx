export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropRow[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div
      style={{
        border: "1px solid var(--kira-border-default)",
        borderRadius: "var(--kira-radius-lg)",
        overflow: "hidden",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "13px",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "var(--kira-bg-surface)",
              borderBottom: "1px solid var(--kira-border-default)",
            }}
          >
            {["Prop", "Type", "Default", "Description"].map((h) => (
              <th
                key={h}
                style={{
                  padding: "10px 16px",
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: "12px",
                  letterSpacing: "0.02em",
                  color: "var(--kira-text-secondary)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((row, i) => (
            <tr
              key={row.name}
              style={{
                borderBottom:
                  i < props.length - 1
                    ? "1px solid var(--kira-border-default)"
                    : "none",
                backgroundColor: "var(--kira-bg-elevated)",
              }}
            >
              <td style={{ padding: "12px 16px" }}>
                <code
                  style={{
                    fontFamily: "var(--kira-font-family-mono), monospace",
                    fontSize: "12px",
                    color: "var(--kira-text-primary)",
                    backgroundColor: "var(--kira-bg-surface)",
                    padding: "2px 6px",
                    borderRadius: "var(--kira-radius-sm)",
                  }}
                >
                  {row.name}
                  {row.required && (
                    <span style={{ color: "var(--kira-feedback-error)", marginLeft: "2px" }}>*</span>
                  )}
                </code>
              </td>
              <td style={{ padding: "12px 16px" }}>
                <code
                  style={{
                    fontFamily: "var(--kira-font-family-mono), monospace",
                    fontSize: "12px",
                    color: "var(--kira-text-accent)",
                    backgroundColor: "var(--kira-bg-accent)",
                    padding: "2px 6px",
                    borderRadius: "var(--kira-radius-sm)",
                  }}
                >
                  {row.type}
                </code>
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  color: "var(--kira-text-tertiary)",
                  fontFamily: "var(--kira-font-family-mono), monospace",
                  fontSize: "12px",
                }}
              >
                {row.default ?? "—"}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  color: "var(--kira-text-secondary)",
                  lineHeight: "1.5",
                }}
              >
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
