# Arquitectura del frontend

El frontend es una SPA construida con React 19, TypeScript y Vite 8. El punto de entrada es `src/main.tsx`; `src/App.tsx` configura React Query, autenticación y las rutas con React Router 7.

## Estructura

- `src/pages/`: páginas y vistas asociadas a rutas.
- `src/components/`: componentes de interfaz, distribución y contenido.
- `src/hooks/`: hooks de autenticación y formularios.
- `src/store/AuthContext.tsx`: estado de sesión.
- `src/lib/api.ts`: cliente Axios e interceptores de autenticación.
- `src/schemas/`: esquemas Zod.
- `src/styles/`: estilos globales y tema Tailwind 4.

React Query gestiona caché y consultas; la sesión se mantiene mediante `AuthContext`. El canal Socket.IO aún no está conectado desde el frontend.

## Rutas

Las rutas disponibles están en `src/App.tsx`. El dashboard, perfil, calificaciones, asignaciones, grabaciones y paneles por rol están bajo autenticación. Cursos, asignaturas y lecciones se muestran en rutas públicas. La implementación de algunas vistas aún es parcial y se detalla en [componentes y rutas](COMPONENTES.md).

## API

`src/lib/api.ts` configura Axios con `VITE_API_URL`. Añade el token de acceso a las solicitudes y gestiona la renovación cuando el backend responde `401`. El backend y sus rutas documentadas están en [su guía](../backend/README.md).

## Formularios y estilos

Los formularios usan React Hook Form y Zod. Tailwind CSS 4 aporta utilidades de estilo; `clsx` y `tailwind-merge` se combinan en `src/lib/utils.ts`.

## Guías relacionadas

- [Componentes y rutas existentes](COMPONENTES.md)
- [Instalación](INSTALACION.md)
- [Configuración](CONFIGURACION.md)
- [Calidad](../CALIDAD.md)
