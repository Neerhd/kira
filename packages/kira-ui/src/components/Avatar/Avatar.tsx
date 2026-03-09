import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const avatarVariants = cva(
  "relative inline-flex items-center justify-center rounded-full overflow-hidden bg-[var(--kira-bg-surface)] border border-[var(--kira-border-default)] flex-shrink-0",
  {
    variants: {
      size: {
        sm: "w-8 h-8 text-[11px]",
        md: "w-10 h-10 text-[13px]",
        lg: "w-14 h-14 text-[16px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, src, alt, fallback, ...props }, ref) => {
    const initials = fallback
      ? fallback
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "?";

    return (
      <span
        ref={ref}
        className={cn(avatarVariants({ size, className }))}
        {...props}
      >
        {/* Initials always render as fallback layer */}
        <span
          aria-hidden={!!src}
          className="absolute inset-0 flex items-center justify-center font-medium text-[var(--kira-text-secondary)]"
        >
          {initials}
        </span>
        {src && (
          <img
            src={src}
            alt={alt ?? fallback ?? "avatar"}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        )}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };
