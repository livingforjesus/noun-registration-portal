import type { ComponentProps, FC } from "react";

import { cn } from "@registration-portal/ui/utils";

interface CardProps extends ComponentProps<"div"> {}

const Card: FC<CardProps> = ({ className, ...props }) => (
  <div
    data-slot="card"
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-card",
      className
    )}
    {...props}
  />
);

interface CardContentProps extends ComponentProps<"div"> {}

const CardContent: FC<CardContentProps> = ({ className, ...props }) => (
  <div data-slot="card-content" className={cn("p-0", className)} {...props} />
);

export { Card, CardContent };
