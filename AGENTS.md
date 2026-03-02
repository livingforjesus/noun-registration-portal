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

## Auth Colocation

- For NextAuth in `apps/app`, colocate auth configuration in the same folder as the auth route handler: `app/api/auth/[...nextauth]/`.
- Keep `route.ts` and auth config (for example `auth.ts`) together unless a piece is genuinely shared.

## API Types and Validation

- Keep API contract schemas/types in `packages/api-types`.
- Organize by route group under `packages/api-types/src/routes` (for example `auth.ts`, `students.ts`), and export from `packages/api-types/src/index.ts`.
- Every endpoint with a request body must have a Zod request-body schema in `packages/api-types`.
- When request-body fields come from DB tables, derive field schemas with `drizzle-zod` from the table schema and use `.pick(...)` for only required fields.
- Reuse DB inferred types (`$inferSelect`, `$inferInsert`) for response/data types whenever possible instead of redefining shapes.
