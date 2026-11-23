# Kursa · Frontend

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)
![Licencia](https://img.shields.io/badge/licencia-MIT-blue)
![React](https://img.shields.io/badge/react-18.x-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-5.x-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/tailwind-3.x-06B6D4?logo=tailwindcss&logoColor=white)
![Pruebas](https://img.shields.io/badge/pruebas-vitest-6E9F18?logo=vitest&logoColor=white)

Cliente web de **Kursa**, una plataforma educativa inspirada en Aules para gestionar cursos, asignaturas, lecciones, tareas, entregas y videollamadas.

> **Aplicación complementaria:** [backend](../backend/README.md) · **Documentación:** [índice](INDICE.md)

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Requisitos](#requisitos)
- [Instalación rápida](#instalación-rápida)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Variables de entorno](#variables-de-entorno)
- [Calidad y pruebas](#calidad-y-pruebas)
- [Equipo](#equipo)
- [Documentación](#documentación)
- [Licencia](#licencia)

---

## Descripción

Kursa Frontend es una **aplicación de una sola página** construida con React y Vite que consume la API REST y el canal WebSocket del [backend](https://../backend/README.md).

Funcionalidades principales:

- Registro e inicio de sesión con validación de formularios (**React Hook Form + Zod**).
- Rutas protegidas y estado de autenticación global (**Context API**).
- Dashboard de cursos y navegación por asignaturas y lecciones.
- Visualización de contenidos (texto, imágenes, vídeo).
- Entrega de tareas con **arrastrar y soltar** (Dropzone).
- Calificaciones y perfil de usuario.
- Videollamadas y chat en tiempo real (**Socket.IO**).
- Interfaz accesible y adaptable con **Tailwind CSS**.

El proyecto **no utiliza inteligencia artificial**: toda la lógica es determinista y basada en reglas.

---

## Tecnologías

| Área | Tecnología |
| :--- | :--- |
| Librería UI | React 18 |
| Lenguaje | TypeScript 5 |
| Compilación / servidor de desarrollo | Vite 5 |
| Estilos | Tailwind CSS 3 + `tailwindcss-animate` |
| Componentes | Radix UI + utilidades `cva`/`clsx` |
| Estado servidor | TanStack React Query |
| Estado global | Context API (`AuthContext`, `SocketContext`) |
| Formularios | React Hook Form + Zod |
| HTTP | Axios |
| Tiempo real | Socket.IO Client |
| Routing | React Router 6 |
| Testing | Vitest + Testing Library + jsdom |

---

## Arquitectura

El frontend se organiza por **responsabilidad**:

```
pages → components → hooks → lib / store → API (Axios) / Socket.IO
```

- **pages**: vistas asociadas a rutas.
- **components**: UI reutilizable (`ui`, `layout`, `content`, `common`).
- **hooks**: lógica reutilizable (auth, formularios, media, socket).
- **store**: contextos globales de autenticación y socket.
- **lib**: cliente HTTP, cliente socket, React Query y utilidades.
- **schemas**: validaciones Zod compartidas con los formularios.

El detalle completo está en [ARCHITECTURE.md](ARCHITECTURE.md) y [FRONTEND.md](FRONTEND.md).

---

## Requisitos

- **Node.js** ≥ 20 y **npm** ≥ 10.
- El **backend** de Kursa en ejecución (por defecto en `http://localhost:4000`).

---

## Instalación rápida

```bash
# 1. Clonar el repositorio
git clone https://../backend/README.md
cd Kursa/apps/frontend

# 2. Instalar dependencias
npm ci

# 3. Configurar variables de entorno
cp .env.example .env
# por defecto apunta a http://localhost:4000

# 4. Arrancar en desarrollo
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173`.

> Guía detallada: [INSTALLATION.md](INSTALLATION.md)

---

## Scripts disponibles

| Script | Descripción |
| :--- | :--- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente. |
| `npm run build` | Comprueba tipos (`tsc`) y genera el bundle de producción. |
| `npm run preview` | Sirve el bundle de producción localmente. |
| `npm run lint` | Ejecuta ESLint sobre `ts`/`tsx`. |
| `npm runa prueba` | Ejecuta la suite de pruebas con Vitest. |
| `npm runa prueba:watch` | Pruebas en modo vigilancia. |
| `npm runa prueba:coverage` | Pruebas con informe de cobertura. |

---

## Estructura del proyecto

```
apps/frontend/
├── src/
│   ├── components/
│   │   ├── common/            # LessonCard, DropzoneZone
│   │   ├── content/           # TextContent, ImageGallery, VideoPlayer
│   │   ├── layout/            # Sidebar, Navbar, ProtectedRoute
│   │   └── ui/                # Button, Card, Input, Label
│   ├── hooks/                 # useAuth, useAuthApi, useAuthForms, useMedia, useSocket
│   ├── lib/                   # api (axios), socket, queryClient, utils
│   ├── pages/                 # vistas por ruta
│   ├── schemas/               # validaciones Zod
│   ├── store/                 # AuthContext, SocketContext
│   ├── styles/                # Tailwind + variables CSS
│   ├── test/                  # configuración de Testing Library
│   ├── App.tsx                # router y providers
│   └── main.tsx               # punto de entrada
├── docs/                      # documentación del proyecto
├── index.html
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Rutas de la aplicación

| Ruta | Vista | Acceso |
| :--- | :--- | :--- |
| `/login` | Inicio de sesión | Público |
| `/register` | Registro | Público |
| `/dashboard` | Panel de cursos | Protegido |
| `/courses/:courseId` | Detalle de curso | Público |
| `/subjects/:subjectId` | Detalle de asignatura | Público |
| `/lessons/:lessonId` | Lección | Público |
| `/assignments/:assignmentId` | Tarea y entrega | Autenticado |
| `/grades` | Calificaciones | Autenticado |
| `/profile` | Perfil | Autenticado |
| `/videocall/:roomId` | Videollamada | Autenticado |
| `/recordings/:subjectId` | Grabaciones | Autenticado |
| `/` | Redirige a `/dashboard` | — |

---

## Variables de entorno

| Variable | Obligatoria | Por defecto | Descripción |
| :--- | :---: | :--- | :--- |
| `VITE_API_URL` | ❌ | `http://localhost:4000/api` | URL base de la API REST. |
| `VITE_SOCKET_URL` | ❌ | `http://localhost:4000` | URL del servidor Socket.IO. |

Detalle completo en [ENVIRONMENT.md](ENVIRONMENT.md).

---

## Calidad y pruebas

Este repositorio aplica una política de calidad obligatoria descrita en **[../CALIDAD.md](../CALIDAD.md)**. Como mínimo, cualquier cambio debe superar:

```bash
npm runa prueba     # obligatorio
npm run build    # obligatorio
npm run lint     # recomendado
```

La suite incluye pruebas de utilidades, esquemas Zod y componentes de UI.

---

## Despliegue

El frontend de producción se despliega en Vercel. Consulta la [guía compartida](../DESPLIEGUE.md).

---

## Equipo

| Integrante | Rol | GitHub |
| :--- | :--- | :--- |
| Salvador Gómez Sánchez | Responsable de producto y desarrollador | [@Salvags92](https://github.com/Salvags92) |
| Lucas Hernández Pardo | Facilitador Scrum y desarrollador | [@Lucherpar](https://github.com/Lucherpar) |
| Vicente Pérez Javier | Desarrollador | [@Vicente1DAW](https://github.com/Vicente1DAW) |
| Alicia del Carmen Ros Villalba | Desarrollador | [@cocodepiel](https://github.com/cocodepiel) |

---

## Índice de documentación

Consulta [INDICE.md](INDICE.md) para acceder a las guías técnicas.

---

## Licencia

Este proyecto se distribuye bajo licencia **MIT**.
