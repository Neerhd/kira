import * as React from "react";
import { cn } from "../../lib/utils";

type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export const Display = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "text-[64px] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--kira-text-primary)] font-[var(--kira-font-family-sans)]",
      className
    )}
    {...props}
  />
));
Display.displayName = "Display";

export const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "text-[48px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--kira-text-primary)]",
      className
    )}
    {...props}
  />
));
H1.displayName = "H1";

export const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--kira-text-primary)]",
      className
    )}
    {...props}
  />
));
H2.displayName = "H2";

export const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-[28px] font-medium leading-[1.3] tracking-[-0.01em] text-[var(--kira-text-primary)]",
      className
    )}
    {...props}
  />
));
H3.displayName = "H3";

export const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn(
      "text-[22px] font-medium leading-[1.3] tracking-[-0.01em] text-[var(--kira-text-primary)]",
      className
    )}
    {...props}
  />
));
H4.displayName = "H4";

export const Body = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[15px] font-normal leading-[1.7] text-[var(--kira-text-primary)]",
      className
    )}
    {...props}
  />
));
Body.displayName = "Body";

export const BodySm = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[13px] font-normal leading-[1.5] text-[var(--kira-text-secondary)]",
      className
    )}
    {...props}
  />
));
BodySm.displayName = "BodySm";

export const Label = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "text-[12px] font-medium leading-[1.5] tracking-[0.04em] uppercase text-[var(--kira-text-secondary)]",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

export const Mono = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      "text-[13px] font-normal leading-[1.5] font-[var(--kira-font-family-mono)] text-[var(--kira-text-primary)] bg-[var(--kira-bg-surface)] px-1.5 py-0.5 rounded-[var(--kira-radius-sm)]",
      className
    )}
    {...props}
  />
));
Mono.displayName = "Mono";

export const Typography = {
  Display,
  H1,
  H2,
  H3,
  H4,
  Body,
  BodySm,
  Label,
  Mono,
};
