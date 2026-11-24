# Despliegue en producción

El frontend y el backend son servicios de producción independientes que se construyen desde este monorepo.

| Aplicación | Proveedor | Carpeta | Activación en producción |
| --- | --- | --- | --- |
| Frontend | Vercel | `apps/frontend` | GitHub Actions, después de las comprobaciones de `main` |
| Backend | Render | `apps/backend` | Deploy hook de GitHub Actions, después de las comprobaciones de `main` |
| Base de datos | Neon | Gestionada por separado | Paso de actualización del esquema del backend en GitHub Actions |

Los workflows están en `.github/workflows/`. Cada uno corresponde a una aplicación. Guarda el ID y el token del proyecto Vercel, el deploy hook de Render y la conexión a la base de datos como secretos de GitHub Actions. No guardes sus valores en el repositorio.

Los workflows de producción están habilitados. Los despliegues se ejecutan desde GitHub Actions tras superar las comprobaciones de CI para `main` (y la rama `hotfix`, cuando corresponda). Render está configurado desde su panel y recibe el deploy hook; el servicio no está vinculado a un Blueprint de `render.yaml`.

El backend usa Node.js `24.22.1` y debe instalar también las dependencias de desarrollo para compilar TypeScript en Render. El panel del servicio define `NODE_VERSION=24.22.1` y `NPM_CONFIG_INCLUDE=dev`; conserva esos ajustes al editar el servicio. El frontend y backend se configuran como proyectos de despliegue independientes.

## Nombres de variables de entorno

Configura los valores de producción en el proveedor correspondiente. Aquí solo se indican sus nombres.

- **Frontend en Vercel:** `VITE_API_URL`. Esta variable se incluye en el código que recibe el navegador; no debe contener secretos. El frontend actual aún no usa Socket.IO.
- **Backend en Render:** `DATABASE_URL`, `JWT_SECRET`, `REFRESH_TOKEN_SECRET`, `CORS_ORIGIN`, `SOCKET_ORIGIN`, `PORT`, `JWT_EXPIRES_IN`, `REFRESH_TOKEN_EXPIRES_IN`, `MAX_FILE_SIZE`, `NODE_ENV`.
- **GitHub Actions:** `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `DATABASE_URL`, `RENDER_DEPLOY_HOOK`, `ENABLE_PRODUCTION_DEPLOYMENTS`.

Antes de cambiar el repositorio conectado, comprueba que existen las variables del proveedor y los secretos del nuevo repositorio. La URL de la API del frontend debe coincidir con el origen permitido por CORS del backend.

## Actualización de la base de datos

El workflow del backend aplica actualmente el esquema de producción antes de solicitar el despliegue a Render. Trata los cambios en `apps/backend/drizzle/` y `apps/backend/scripts/push-schema.js` como cambios sensibles. Confirma la base de datos de destino y revisa los cambios de esquema antes de integrarlos en `main`.

## Reversión

Para volver atrás en una aplicación, usa el despliegue anterior correcto del proveedor. Revertir el código no revierte necesariamente los cambios del esquema de la base de datos; prepara cambios compatibles y un procedimiento de recuperación por separado.
