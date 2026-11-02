-- Ejecutar en Supabase > SQL Editor

create table if not exists public.products (
  id          bigint generated always as identity primary key,
  name        text    not null,
  description text    not null,
  price       numeric not null check (price > 0),
  image       text    not null,
  category    text    not null,
  stock       integer not null default 0 check (stock >= 0),
  created_at  timestamptz not null default now()
);

alter table public.products enable row level security;

-- Lectura y escritura solo para usuarios autenticados
create policy "products_select_auth" on public.products
  for select to authenticated using (true);
create policy "products_insert_auth" on public.products
  for insert to authenticated with check (true);
create policy "products_update_auth" on public.products
  for update to authenticated using (true) with check (true);
create policy "products_delete_auth" on public.products
  for delete to authenticated using (true);

insert into public.products (name, description, price, image, category, stock) values
('Informe OSINT básico', 'Reporte de fuentes abiertas sobre huellas digitales y perfiles asociados a un caso.', 250000, '/img/osintbasico.jpg', 'OSINT', 20),
('Informe OSINT avanzado', 'Análisis OSINT ampliado con cruce de fuentes, líneas de tiempo y conexiones entre perfiles.', 450000, '/img/osintavanzado.jpg', 'OSINT', 10),
('Auditoría de videojuegos', 'Revisión de riesgos de seguridad y contacto con desconocidos en videojuegos.', 380000, '/img/videojuegos.jpg', 'Videojuegos', 12),
('Monitoreo Roblox', 'Seguimiento de actividad y señales de riesgo dentro de Roblox.', 300000, '/img/monitoreoroblox.jpg', 'Videojuegos', 15),
('Modelo IA de riesgo', 'Modelo de inteligencia artificial para detectar patrones de riesgo en entornos digitales.', 600000, '/img/iariesgo.jpg', 'IA', 5),
('Capacitación para padres', 'Taller para que las familias reconozcan y prevengan riesgos en línea.', 200000, '/img/capacitacionpadres.jpg', 'Formación', 30),
('Capacitación para docentes', 'Formación para que el equipo docente identifique y reporte alertas digitales.', 220000, '/img/capacitaciondocentes.jpg', 'Formación', 25),
('Consultoría integral en ciberseguridad infantil', 'Acompañamiento integral para instituciones en ciberseguridad infantil.', 750000, '/img/consultoriaintegral.jpg', 'Consultoría', 6),
('Informe OSINT exprés', 'Resumen rápido de huellas digitales visibles para una primera valoración del caso.', 150000, '/img/osintbasico.jpg', 'OSINT', 40),
('Auditoría de redes sociales', 'Revisión de configuración de privacidad y contactos de riesgo en redes sociales.', 280000, '/img/videojuegos.jpg', 'Videojuegos', 18),
('Taller de huella digital para estudiantes', 'Sesión práctica para que NNA entiendan qué rastro dejan en línea.', 180000, '/img/capacitacionpadres.jpg', 'Formación', 35),
('Asesoría de protocolo de respuesta', 'Diseño de una ruta de actuación para instituciones ante alertas digitales.', 520000, '/img/consultoriaintegral.jpg', 'Consultoría', 8);
