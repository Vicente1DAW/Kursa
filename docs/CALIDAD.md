# Política de calidad de Kursa

Ejecuta las comprobaciones correspondientes antes de abrir una PR. Los cambios que afecten a ambas aplicaciones deben superar las comprobaciones de las dos.

## Comprobaciones necesarias

| Aplicación | Pruebas | Compilación | Lint |
| --- | --- | --- | --- |
| Frontend | `cd apps/frontend && npm test` | `cd apps/frontend && npm run build` | `cd apps/frontend && npm run lint` |
| Backend | `cd apps/backend && npm test` | `cd apps/backend && npm run build` | Aún no está configurado |

GitHub Actions ejecuta las comprobaciones en las PR hacia `main` y solo despliega los cambios de `main` cuando han terminado correctamente.

## Requisitos comunes

- Añade o actualiza pruebas cuando cambie el comportamiento de una aplicación.
- No introduzcas secretos, registros de depuración ni dependencias sin justificar.
- Actualiza la documentación cuando cambien el comportamiento, la instalación, las API, los esquemas o las variables de entorno.
- Usa Conventional Commits y solicita al menos una revisión en cada PR.

## Requisitos del frontend

- Mantén TypeScript en modo estricto, valida los formularios con Zod y crea interfaces accesibles y adaptables.
- Mantén o mejora la cobertura del código modificado; el objetivo para módulos nuevos es al menos un 70 %.
- Ejecuta `npm runa prueba:coverage` al modificar partes importantes de la lógica del frontend.

## Requisitos del backend

- Valida con Zod las entradas externas antes de utilizarlas.
- Conserva las capas route → middleware → controller → service → database.
- No registres credenciales ni datos sensibles; usa el logger de la aplicación.
- Mantén o mejora la cobertura del código modificado; el objetivo para módulos nuevos es al menos un 70 %.

## Criterios de finalización

- [ ] Pasan las pruebas y compilaciones correspondientes; también pasa el lint si se ha modificado el frontend.
- [ ] Las pruebas cubren el comportamiento nuevo o modificado.
- [ ] La PR tiene al menos una aprobación y enlaza la incidencia correspondiente.
- [ ] No se han añadido secretos ni dependencias innecesarias.
- [ ] Se ha actualizado la documentación afectada.
