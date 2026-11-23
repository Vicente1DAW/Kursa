# Kursa · Backend

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)
![Licencia](https://img.shields.io/badge/licencia-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D20-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-5.x-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/express-4.x-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-Neon-4169E1?logo=postgresql&logoColor=white)
![Pruebas](https://img.shields.io/badge/pruebas-vitest-6E9F18?logo=vitest&logoColor=white)

API REST y servidor de tiempo real de **Kursa**, una plataforma educativa inspirada en Aules para la gestión de cursos, asignaturas, lecciones, tareas, entregas y videollamadas.

> **Aplicación complementaria:** [frontend](../frontend/README.md) · **Documentación:** [índice](INDICE.md)

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Requisitos](#requisitos)
- [Instalación rápida](#instalación-rápida)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Variables de entorno](#variables-de-entorno)
- [API](#api)
- [Calidad y pruebas](#calidad-y-pruebas)
- [Equipo](#equipo)
- [Documentación](#documentación)
- [Licencia](#licencia)

---

## Descripción

Kursa Backend expone una API REST (`/api`) y un canal WebSocket (Socket.IO) que da soporte a:

- Autenticación con **JWT** (access + refresh token) y control de acceso por roles (`admin`, `profesor`, `estudiante`).
- Gestión de **cursos**, **asignaturas** y **lecciones** con contenidos de tipo texto, imagen, vídeo y archivo.
- **Inscripciones** a cursos y consulta de matrícula.
- **Tareas**: creación, entrega de archivos, listado de entregas y calificación con feedback.
- **Subida de archivos** con validación de MIME y límite de tamaño.
- **Grabaciones** asociadas a asignaturas.
- **Tiempo real**: salas (rooms), señalización para videollamadas y chat.

El proyecto **no utiliza inteligencia artificial**: toda la lógica es determinista y basada en reglas.

---

## Tecnologías

| Área | Tecnología |
| :--- | :--- |
| Runtime | Node.js 20+ |
| Lenguaje | TypeScript 5 |
| Framework HTTP | Express 4 |
| Base de datos | PostgreSQL (Neon) |
| ORM / migraciones | Drizzle ORM + drizzle-kit |
| Autenticación | JSON Web Tokens (`jsonwebtoken`) + `bcryptjs` |
| Validación | Zod |
| Tiempo real | Socket.IO |
| Subida de archivos | Multer |
| Seguridad | Helmet, CORS, express-rate-limit |
| Testing | Vitest |

---

## Arquitectura

El backend sigue una arquitectura **por capas**, con dependencias unidireccionales:

```
routes → middleware → controllers → services → db (Drizzle) → PostgreSQL
```

- **routes**: define endpoints y aplica middleware (auth, roles, validación, upload).
- **middleware**: autenticación, autorización, validación con Zod, manejo de errores y subida de archivos.
- **controllers**: traducen HTTP ↔ dominio y formatean respuestas.
- **services**: lógica de negocio y acceso a datos.
- **db**: pool de conexiones y esquema Drizzle.

El detalle completo está en [ARCHITECTURE.md](ARCHITECTURE.md).

---

## Requisitos

- **Node.js** ≥ 20 y **npm** ≥ 10.
- Una base de datos **PostgreSQL** (recomendado: [Neon](https://neon.tech), plan gratuito).

---

## Instalación rápida

```bash
# 1. Clonar el repositorio
git clone https://../frontend/README.md
cd Kursa/apps/backend

# 2. Instalar dependencias
npm ci

# 3. Configurar variables de entorno
cp .env.example .env
# edita .env con tu DATABASE_URL, JWT_SECRET y REFRESH_TOKEN_SECRET

# 4. Crear las tablas en la base de datos
npm run db:push

# 5. Arrancar en desarrollo
npm run dev
```

La API quedará disponible en `http://localhost:4000/api`.

> Guía detallada (incluida la creación de la base de datos en Neon): [INSTALLATION.md](INSTALLATION.md)

---

## Scripts disponibles

| Script | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor en modo desarrollo con `ts-node`. |
| `npm run build` | Compila TypeScript a `dist/`. |
| `npm start` | Ejecuta la versión compilada (`dist/src/app.js`). |
| `npm runa prueba` | Ejecuta la suite de pruebas con Vitest. |
| `npm runa prueba:watch` | Ejecuta las pruebas en modo vigilancia. |
| `npm run db:generate` | Genera migraciones SQL a partir del esquema Drizzle. |
| `npm run db:push` | Sincroniza el esquema directamente con la base de datos. |
| `npm run db:migrate` | Aplica las migraciones generadas. |
| `npm run db:studio` | Abre Drizzle Studio para inspeccionar la base de datos. |

---

## Estructura del proyecto

```
apps/backend/
├── drizzle/
│   └── schema.ts              # Esquema de tablas y enums
├── src/
│   ├── config/                # env, db (pool + Drizzle), jwt
│   ├── controllers/           # auth, course, assignment
│   ├── middleware/            # auth, roles, validación, errores, upload
│   ├── routes/                # definición de endpoints
│   ├── services/              # lógica de negocio
│   ├── socket/                # servidor Socket.IO y eventos
│   ├── types/                 # tipos y esquemas Zod
│   ├── utils/                 # constantes, respuestas, logger
│   └── app.ts                 # bootstrap de Express + Socket.IO
├── docs/                      # documentación del proyecto
├── drizzle.config.ts
├── tsconfig.json
└── vitest.config.ts
```

---

## Variables de entorno

| Variable | Obligatoria | Por defecto | Descripción |
| :--- | :---: | :--- | :--- |
| `DATABASE_URL` | ✅ | — | Cadena de conexión PostgreSQL/Neon. |
| `JWT_SECRET` | ✅ | — | Secreto para firmar access tokens. |
| `REFRESH_TOKEN_SECRET` | ✅ | — | Secreto para firmar refresh tokens. |
| `JWT_EXPIRES_IN` | ❌ | `7d` | Caducidad del access token. |
| `REFRESH_TOKEN_EXPIRES_IN` | ❌ | `30d` | Caducidad del refresh token. |
| `PORT` | ❌ | `4000` | Puerto HTTP. |
| `CORS_ORIGIN` | ❌ | `http://localhost:5173` | Origen permitido por CORS. |
| `SOCKET_ORIGIN` | ❌ | `http://localhost:5173` | Origen permitido por Socket.IO. |
| `MAX_FILE_SIZE` | ❌ | `10485760` | Tamaño máximo de archivo (bytes). |
| `UPLOAD_DIR` | ❌ | `/tmp/uploads` | Directorio de subidas. |

Detalle completo en [ENVIRONMENT.md](ENVIRONMENT.md).

---

## API

La API está versionada bajo el prefijo `/api`. Todas las respuestas siguen el formato:

```json
{ "success": true, "message": "opcional", "data": { } }
```

Endpoints principales:

| Método | Ruta | Autenticación | Descripción |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/auth/register` | — | Registro de usuario. |
| `POST` | `/api/auth/login` | — | Inicio de sesión. |
| `POST` | `/api/auth/refresh` | — | Renueva el access token. |
| `GET` | `/api/auth/me` | ✅ | Datos del usuario autenticado. |
| `POST` | `/api/auth/logout` | ✅ | Cierra la sesión en el cliente. |
| `GET` | `/api/courses` | — | Lista de cursos. |
| `POST` | `/api/courses` | 🔒 admin/profesor | Crea un curso. |
| `GET` | `/api/courses/:courseId/subjects` | — | Asignaturas de un curso. |
| `GET` | `/api/subjects/:subjectId/lessons` | — | Lecciones de una asignatura. |
| `POST` | `/api/assignments/:assignmentId/submit` | ✅ | Entrega de tarea con archivos. |
| `PATCH` | `/api/submissions/:submissionId/grade` | 🔒 admin/profesor | Califica una entrega. |

La referencia completa está en [API.md](API.md).

---

## Calidad y pruebas

Este repositorio aplica una política de calidad obligatoria descrita en **[../CALIDAD.md](../CALIDAD.md)**. Como mínimo, cualquier cambio debe superar:

```bash
npm runa prueba     # obligatorio
npm run build    # obligatorio
```

Actualmente la suite incluye pruebas de autenticación (servicio, controlador, JWT y middleware), esquemas Zod, helpers de respuesta y constantes.

---

## Despliegue

El servicio de producción se ejecuta en Render. Consulta la [guía compartida](../DESPLIEGUE.md).

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
