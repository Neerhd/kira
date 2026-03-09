import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--kira-bg-surface)] text-[var(--kira-text-secondary)] border border-[var(--kira-border-default)]",
        accent:
          "bg-[var(--kira-bg-accent)] text-[var(--kira-text-accent)] border border-[var(--kira-border-accent)]",
        dark:
          "bg-[var(--kira-bg-inverse)] text-[var(--kira-text-inverse)]",
        success:
          "bg-[var(--kira-feedback-success-subtle)] text-[var(--kira-feedback-success-text)]",
        warning:
          "bg-[var(--kira-feedback-warning-subtle)] text-[var(--kira-feedback-warning-text)]",
        error:
          "bg-[var(--kira-feedback-error-subtle)] text-[var(--kira-feedback-error-text)]",
      },
      size: {
        sm: "text-[11px] px-2 py-0.5 rounded-[var(--kira-radius-sm)]",
        md: "text-[12px] px-2.5 py-1 rounded-[var(--kira-radius-md)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {dot && (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-current opacity-70" />
        )}
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
