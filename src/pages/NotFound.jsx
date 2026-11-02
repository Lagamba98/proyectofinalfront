import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section>
      <h1>Página no encontrada</h1>
      <Link to="/productos" className="enlace">Ir al catálogo</Link>
    </section>
  );
}

export default NotFound;
