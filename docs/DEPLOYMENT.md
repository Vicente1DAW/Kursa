# Production deployment

Frontend and backend remain separate production services in the monorepo.

| App | Provider | Directory | Production trigger |
| --- | --- | --- | --- |
| Frontend | Vercel | `apps/frontend` | GitHub Actions after checks on `main` |
| Backend | Render | `apps/backend` | GitHub Actions deploy hook after checks on `main` |
| Database | Neon | Managed separately | Backend schema step in GitHub Actions |

The workflow files live in `.github/workflows/`. Each workflow is limited to its app paths and its own configuration. Keep the Vercel project ID and token, Render deploy hook and database connection in GitHub Actions secrets. Never commit secret values.

## Environment variable names

Configure production values in the relevant provider; this document intentionally lists names only.

- **Frontend build on Vercel:** `VITE_API_URL`, `VITE_SOCKET_URL`. These are included in the browser bundle and must not contain secrets.
- **Backend on Render:** `DATABASE_URL`, `JWT_SECRET`, `REFRESH_TOKEN_SECRET`, `CORS_ORIGIN`, `SOCKET_ORIGIN`, `PORT`, `JWT_EXPIRES_IN`, `REFRESH_TOKEN_EXPIRES_IN`, `MAX_FILE_SIZE`, `NODE_ENV`.
- **GitHub Actions:** `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `DATABASE_URL`, `RENDER_DEPLOY_HOOK`.

Check that provider values and repository secrets exist before changing the connected Git repository. Keep the frontend API and Socket.IO URLs aligned with the backend's CORS and socket origins.

## Database deployment

The backend workflow currently applies the production schema before triggering the Render deploy. Treat changes to `apps/backend/drizzle/` and `apps/backend/scripts/push-schema.js` as production-sensitive. Confirm the target database and inspect schema changes before merging them to `main`.

## Rollback

Use the provider's previous successful deployment to roll back an application. Database schema changes may not be reversible by rolling back application code; plan compatible schema changes and a recovery path separately.
