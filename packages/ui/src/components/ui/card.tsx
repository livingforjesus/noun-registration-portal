import type { ComponentProps, FC } from "react";

import { cn } from "@nexus/ui/utils";

type CardProps = ComponentProps<"div">;

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

type CardContentProps = ComponentProps<"div">;

const CardContent: FC<CardContentProps> = ({ className, ...props }) => (
  <div data-slot="card-content" className={cn("p-0", className)} {...props} />
);

export { Card, CardContent };
