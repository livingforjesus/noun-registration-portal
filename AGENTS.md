# AGENTS Instructions

## Component Style

- Use const components with explicit typing:
  ```tsx
  interface ComponentProps {
    foo: string;
    bar?: number;
  }
  const Component: FC<ComponentProps> = ({ foo, bar }) => (...);
  ```
- Define a `ComponentProps` (or `ComponentNameProps`) interface for each component's props.
- Use `FC<ComponentProps>` for typed components; use `FC` for components with no props.

## Component Placement

- Components should be located as close to their usage as possible.
- For route/page-specific UI in Next.js App Router, colocate under a local `_components` folder inside that route segment.
- For route-specific helper/constants data, colocate under a local `_utils` folder next to those components (for example: `app/_components/_utils/menu-items.ts`).
- Only move a component to a shared package (for example `packages/ui`) when it is genuinely reusable across multiple routes/apps.
