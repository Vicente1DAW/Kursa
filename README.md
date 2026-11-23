# Kursa

Kursa is the learning platform maintained in this monorepo. The applications remain independently installable and deployable.

## Repository layout

- [`apps/frontend`](apps/frontend/README.md): React, Vite and TypeScript web application.
- [`apps/backend`](apps/backend/README.md): Express API, Socket.IO and PostgreSQL service.
- [`docs`](docs/README.md): shared contributor, quality and deployment guidance.

## Run locally

Use Node.js 20+ and npm 10+. Install and start each app in a separate terminal:

```bash
cd apps/backend
npm ci
cp .env.example .env
npm run dev
```

```bash
cd apps/frontend
npm ci
cp .env.example .env
npm run dev
```

The backend requires a PostgreSQL `DATABASE_URL`. The frontend's local defaults point to the backend on `http://localhost:4000`.

## Documentation

Start at [`docs/README.md`](docs/README.md). App-specific architecture, API, database, environment and installation details remain beside each app.
