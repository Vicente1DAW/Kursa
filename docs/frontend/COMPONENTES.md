# Páginas y rutas del frontend

Las rutas se declaran en `apps/frontend/src/App.tsx`. Esta tabla describe lo que está implementado ahora; no garantiza que cada flujo esté conectado de extremo a extremo.

| Ruta | Página | Estado observado |
| --- | --- | --- |
| `/login`, `/register` | `LoginPage`, `RegisterPage` | Formularios conectados al flujo de autenticación. |
| `/dashboard` | `DashboardPage` | Vista protegida de cursos; la navegación y los roles tienen margen de mejora. |
| `/courses/:courseId` | `CoursePage` | Consulta del curso. |
| `/subjects/:subjectId` | `SubjectPage` | Consulta de asignatura y lecciones. |
| `/lessons/:lessonId` | `LessonPage` | La API actual no ofrece una ruta `GET /lessons/:id`; revisar la carga de datos. |
| `/assignments/:assignmentId` | `AssignmentPage` | La página solicita `GET /assignments/:id`, que no existe en el backend actual; entrega también requiere almacenamiento persistente de archivos. |
| `/grades` | `GradesPage` | Vista existente; no hay una ruta de consulta de calificaciones en el backend actual. |
| `/profile` | `ProfilePage` | Vista protegida de perfil. |
| `/recordings/:subjectId` | `RecordingsPage` | Consulta de grabaciones. |
| `/admin`, `/profesor`, `/estudiante` | Paneles por rol | Vistas protegidas, aún de alcance limitado. |

`ProtectedRoute` controla autenticación y rol. `AuthContext` gestiona la sesión. La interfaz no contiene actualmente una ruta de videollamada ni cliente Socket.IO.

## Componentes compartidos

- `components/layout/`: `AppLayout` y `ProtectedRoute`.
- `components/ui/`: botón, tarjeta, campo de texto y etiqueta.
- `components/common/`: zona de selección de archivos.
- `components/content/`: componentes para contenido de lecciones.

Consulta la [arquitectura](ARQUITECTURA.md) para ver la organización del código y la [API del backend](../backend/API.md) para sus endpoints actuales.
