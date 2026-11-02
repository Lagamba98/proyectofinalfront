# Whalehunter | Tienda en línea (React + Vite + Supabase)

Taller final: tienda de servicios de investigación digital y ciberseguridad infantil de **Whalehunter**.

**Scope elegido: AVANZADO** (Supabase como backend con autenticación real, lectura, creación, edición y eliminación de productos).

- Repositorio: _pega aquí la URL de GitHub_
- App desplegada: _pega aquí la URL de Vercel_
- Usuario de prueba: _correo_ / _contraseña_

## Tecnologías
React 18, Vite, React Router 6, Context API (sesión y carrito), Supabase (Postgres, Auth, RLS), CSS propio responsive, Vercel.

## Funcionalidades
- Registro, inicio y cierre de sesión con Supabase Auth; la sesión se mantiene al recargar (`getSession` + `onAuthStateChange`).
- Rutas: `/login`, `/productos`, `/productos/:id`, `/productos/nuevo`, `/productos/:id/editar`, `/carrito`. Las rutas privadas redirigen a `/login`.
- Catálogo con búsqueda por nombre y filtro por categoría.
- Crear, editar y eliminar productos con validación (campos obligatorios, precio > 0, stock entero ≥ 0).
- Carrito en memoria: agregar, aumentar/disminuir, eliminar, vaciar y total; contador en el Navbar.
- Estados de carga y error en todas las consultas.

## Estructura
```
src/
  components/  Navbar, ProductCard, CartItem, ProductForm, ProtectedRoute, Loader, ErrorMessage
  pages/       Login, Productos, ProductoDetalle, ProductoNuevo, ProductoEditar, Carrito, NotFound
  context/     AuthContext, CartContext
  services/    supabaseClient, productService
supabase/schema.sql   tabla, políticas RLS y 12 productos
```

## Correr en local
```bash
npm install
cp .env.example .env   # y completa tus claves
npm run dev
```

## Configurar Supabase
1. Crea un proyecto en supabase.com.
2. En **SQL Editor**, ejecuta `supabase/schema.sql` (crea la tabla `products`, activa RLS y carga 12 productos).
3. En **Authentication > Providers > Email**, para probar rápido desactiva "Confirm email" (o confirma el correo del usuario de prueba).
4. Crea el usuario de prueba desde la pantalla de registro de la app o desde **Authentication > Users**.

## Variables de entorno
| Variable | Descripción |
|---|---|
| `VITE_SUPABASE_URL` | URL del proyecto (Project Settings > API) |
| `VITE_SUPABASE_ANON_KEY` | Clave `anon` pública |

También deben configurarse en Vercel (Project > Settings > Environment Variables). El archivo `.env` no se sube al repositorio.

## Despliegue
Importa el repo en Vercel (preset Vite). `vercel.json` incluye un rewrite a `index.html` para que las rutas de React Router funcionen al recargar.

## Capturas
_Agrega aquí capturas de /login, /productos, detalle, formulario y /carrito en móvil y escritorio._
