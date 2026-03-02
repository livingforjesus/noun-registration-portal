import * as React from "react";

import { cn } from "@nexus/ui/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "h-11 w-full rounded-md border border-border bg-white px-3 text-sm text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-muted",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
