import type { ComponentProps, FC } from "react";

import { cn } from "@nexus/ui/utils";

export interface FieldSetProps extends ComponentProps<"fieldset"> {
  legend?: string;
}

export const FieldSet: FC<FieldSetProps> = ({
  className,
  legend,
  children,
  ...props
}) => {
  return (
    <fieldset className={cn("space-y-4", className)} {...props}>
      {legend ? (
        <legend className="text-sm font-semibold text-foreground">
          {legend}
        </legend>
      ) : null}
      {children}
    </fieldset>
  );
};

export interface FieldProps extends ComponentProps<"div"> {
  label?: string;
  htmlFor?: string;
  error?: string;
}

export const Field: FC<FieldProps> = ({
  className,
  label,
  htmlFor,
  error,
  children,
  ...props
}) => {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label ? (
        <label htmlFor={htmlFor} className="text-sm text-foreground">
          {label}
        </label>
      ) : null}
      {children}
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
};
