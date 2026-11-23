# Despliegue en producción

El frontend y el backend son servicios de producción independientes que se construyen desde este monorepo.

| Aplicación | Proveedor | Carpeta | Activación en producción |
| --- | --- | --- | --- |
| Frontend | Vercel | `apps/frontend` | GitHub Actions, después de las comprobaciones de `main` |
| Backend | Render | `apps/backend` | Deploy hook de GitHub Actions, después de las comprobaciones de `main` |
| Base de datos | Neon | Gestionada por separado | Paso de actualización del esquema del backend en GitHub Actions |

Los workflows están en `.github/workflows/`. Cada uno corresponde a una aplicación. Guarda el ID y el token del proyecto Vercel, el deploy hook de Render y la conexión a la base de datos como secretos de GitHub Actions. No guardes sus valores en el repositorio.

Los despliegues quedan pausados mientras la variable de repositorio `ENABLE_PRODUCTION_DEPLOYMENTS` no sea `true`. Actívala solo cuando Vercel, Render y los secretos del nuevo repositorio estén configurados y revisados.

## Nombres de variables de entorno

Configura los valores de producción en el proveedor correspondiente. Aquí solo se indican sus nombres.

- **Frontend en Vercel:** `VITE_API_URL`, `VITE_SOCKET_URL`. Estas variables se incluyen en el código que recibe el navegador; no deben contener secretos.
- **Backend en Render:** `DATABASE_URL`, `JWT_SECRET`, `REFRESH_TOKEN_SECRET`, `CORS_ORIGIN`, `SOCKET_ORIGIN`, `PORT`, `JWT_EXPIRES_IN`, `REFRESH_TOKEN_EXPIRES_IN`, `MAX_FILE_SIZE`, `NODE_ENV`.
- **GitHub Actions:** `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `DATABASE_URL`, `RENDER_DEPLOY_HOOK`.

Antes de cambiar el repositorio conectado, comprueba que existen las variables del proveedor y los secretos del nuevo repositorio. Las URL de la API y Socket.IO del frontend deben coincidir con los orígenes CORS y Socket.IO permitidos por el backend.

## Actualización de la base de datos

El workflow del backend aplica actualmente el esquema de producción antes de solicitar el despliegue a Render. Trata los cambios en `apps/backend/drizzle/` y `apps/backend/scripts/push-schema.js` como cambios sensibles. Confirma la base de datos de destino y revisa los cambios de esquema antes de integrarlos en `main`.

## Reversión

Para volver atrás en una aplicación, usa el despliegue anterior correcto del proveedor. Revertir el código no revierte necesariamente los cambios del esquema de la base de datos; prepara cambios compatibles y un procedimiento de recuperación por separado.
