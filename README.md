# LinkVault

A NestJS application with PostgreSQL via Prisma.

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/linkvault?schema=public"
```

### 3. Start PostgreSQL with Docker

```bash
docker run -d \
  --name linkvault-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=linkvault \
  -p 5432:5432 \
  postgres:16
```

To stop/start later:

```bash
docker stop linkvault-db
docker start linkvault-db
```

### 4. Generate Prisma client

The generated Prisma client (`src/prisma/generated/`) is not committed to git. Run this after every `git clone` or schema change:

```bash
pnpm prisma generate
```

### 5. Run Prisma migrations

```bash
pnpm prisma migrate dev
```

### 6. Start the app

```bash
# watch mode
pnpm start:dev

# production
pnpm start:prod
```

## Database

```bash
# create and apply a migration
pnpm prisma migrate dev --name <migration-name>

# open Prisma Studio
pnpm prisma studio

# reset database
pnpm prisma migrate reset
```

## Tests

```bash
pnpm test
pnpm test:e2e
pnpm test:cov
```
