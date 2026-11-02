import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { getProducts } from '../services/productService.js';

function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('todas');

  const load = () => {
    setLoading(true);
    setError('');
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))].sort(), [products]);

  const visible = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.trim().toLowerCase()) &&
      (category === 'todas' || p.category === category)
  );

  return (
    <section>
      <h1>Servicios de investigación digital</h1>

      <div className="filtros">
        <div className="campo">
          <label htmlFor="busqueda">Buscar por nombre</label>
          <input id="busqueda" type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select id="categoria" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="todas">Todas</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {loading && <Loader text="Cargando productos..." />}
      {error && <ErrorMessage message={error} onRetry={load} />}
      {!loading && !error && visible.length === 0 && (
        <p className="estado">Ningún producto coincide. Prueba con otro nombre o categoría.</p>
      )}
      <div className="grilla">
        {visible.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

export default Productos;
