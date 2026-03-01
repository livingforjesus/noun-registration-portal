# Registration Portal Monorepo

Turbo monorepo scaffold with:
- `apps/app`: Next.js frontend
- `apps/api`: Express backend
- `packages/db`: Drizzle ORM + PostgreSQL
- `packages/eslint`: shared ESLint configs
- `packages/tsconfig`: shared TypeScript configs

## Quick start

1. Install dependencies:

```bash
bun install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Start PostgreSQL:

```bash
cd packages/db && docker compose up -d
```

4. Push schema:

```bash
bun run db:push
```

5. Run all dev servers:

```bash
bun run dev
```

- App: `http://localhost:3000`
- API: `http://localhost:8080/health`

