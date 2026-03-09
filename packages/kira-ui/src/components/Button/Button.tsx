import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kira-border-focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--kira-interactive-primary-bg)] text-[var(--kira-interactive-primary-text)] hover:bg-[var(--kira-interactive-primary-bg-hover)] active:bg-[var(--kira-interactive-primary-bg-active)]",
        secondary:
          "border border-[var(--kira-interactive-secondary-border)] text-[var(--kira-interactive-secondary-text)] bg-transparent hover:bg-[var(--kira-bg-surface)] active:bg-[var(--kira-bg-surface)]",
        ghost:
          "text-[var(--kira-interactive-ghost-text)] bg-transparent hover:bg-[var(--kira-interactive-ghost-bg-hover)] hover:text-[var(--kira-text-primary)]",
      },
      size: {
        sm: "h-8 px-3 text-[13px] rounded-[var(--kira-radius-md)]",
        md: "h-10 px-4 text-[14px] rounded-[var(--kira-radius-md)]",
        lg: "h-12 px-5 text-[15px] rounded-[var(--kira-radius-lg)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
