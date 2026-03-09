import * as React from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  rows?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, id, rows = 4, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[13px] font-medium text-[var(--kira-text-primary)]"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            "w-full rounded-[var(--kira-radius-md)] border bg-[var(--kira-bg-elevated)] px-3 py-2.5 text-[14px] text-[var(--kira-text-primary)] placeholder:text-[var(--kira-text-tertiary)] transition-colors resize-y",
            "focus:outline-none focus:ring-2 focus:ring-[var(--kira-border-focus)] focus:ring-offset-0",
            error
              ? "border-[var(--kira-feedback-error)]"
              : "border-[var(--kira-border-default)] hover:border-[var(--kira-border-strong)]",
            "disabled:cursor-not-allowed disabled:opacity-40",
            className
          )}
          {...props}
        />
        {(helperText || error) && (
          <p
            className={cn(
              "text-[12px]",
              error
                ? "text-[var(--kira-feedback-error-text)]"
                : "text-[var(--kira-text-secondary)]"
            )}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
