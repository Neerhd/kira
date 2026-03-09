import * as React from "react";
import { cn } from "../../lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", label, ...props }, ref) => {
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn(
            "inline-block w-px self-stretch bg-[var(--kira-border-default)]",
            className
          )}
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn("flex items-center gap-3 my-2", className)}
          {...props}
        >
          <div className="flex-1 h-px bg-[var(--kira-border-default)]" />
          <span className="text-[12px] text-[var(--kira-text-tertiary)] whitespace-nowrap">
            {label}
          </span>
          <div className="flex-1 h-px bg-[var(--kira-border-default)]" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        className={cn("h-px w-full bg-[var(--kira-border-default)] my-2", className)}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

export { Divider };
