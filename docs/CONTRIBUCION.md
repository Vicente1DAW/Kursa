# Cómo contribuir a Kursa

## Ramas

- `main` contiene el código preparado para producción y está protegida.
- `develop` integra el trabajo terminado.
- `feature/<issue>-<slug>`, `fix/<issue>-<slug>` y `docs/<slug>` son ramas de corta duración que se crean desde `develop`.
- `hotfix` se mantiene alineada con `main` y se reserva para correcciones urgentes y pequeñas. Después de una corrección, intégrala en `main` y en `develop`; luego vuelve a alinear `hotfix` con `main`.

No hagas cambios directamente en `main`. Abre una solicitud de cambios (PR) y pide la revisión de al menos un compañero. Las reglas de protección se configuran en GitHub.

## Flujo de trabajo

1. Crea o actualiza la incidencia relacionada con el cambio.
2. Actualiza `develop` y crea una rama de trabajo desde ella.
3. Haz commits pequeños con el formato Conventional Commits; por ejemplo: `fix(auth): gestionar tokens caducados`.
4. Ejecuta las comprobaciones de cada aplicación que hayas modificado; consulta [Calidad](CALIDAD.md).
5. Abre una PR hacia `develop`, describe el cambio, enlaza la incidencia y solicita una revisión.
6. Cuando la versión esté lista para producción, abre una PR revisada de `develop` a `main`.

## Comandos por aplicación

Ejecuta los comandos desde la carpeta de cada aplicación:

```bash
cd apps/frontend
npm ci
npm test
npm run build
npm run lint
```

```bash
cd apps/backend
npm ci
npm test
npm run build
```

No subas archivos `.env`, credenciales, `node_modules` ni archivos generados. Mantén actualizado `.env.example` sin añadir valores secretos reales.
