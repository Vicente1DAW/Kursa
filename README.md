# Kursa

Kursa es una plataforma educativa formada por una aplicación web y una API. Ambas se mantienen y despliegan desde este monorepo.

## Estructura

- [`apps/frontend`](apps/frontend): aplicación web con React y Vite.
- [`apps/backend`](apps/backend): API y servicio en tiempo real con Express y Socket.IO.
- [`docs`](docs/README.md): toda la documentación del proyecto, organizada por aplicación y guías comunes.

## Puesta en marcha

Se necesita Node.js `24.22.1` y npm 10 o posterior. Instala y arranca cada aplicación en una terminal distinta:

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

El backend necesita una base de datos PostgreSQL configurada en `DATABASE_URL`. En desarrollo, el frontend apunta al backend en `http://localhost:4000`.

## Documentación

Empieza por el [índice de documentación](docs/README.md). La documentación técnica del [frontend](docs/frontend/README.md) y del [backend](docs/backend/README.md) está reunida en `/docs`.
