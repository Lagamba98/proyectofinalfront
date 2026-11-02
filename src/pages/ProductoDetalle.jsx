import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { useCart } from '../context/CartContext.jsx';
import { deleteProduct, getProduct } from '../services/productService.js';
import { formatPrice } from '../utils.js';

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    getProduct(id)
      .then(setProduct)
      .catch(() => setError('No encontramos este producto o no se pudo cargar.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)) return;
    try {
      await deleteProduct(product.id);
      navigate('/productos');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loader text="Cargando producto..." />;
  if (error || !product) return <ErrorMessage message={error} onRetry={load} />;

  return (
    <article className="detalle">
      <img src={product.image} alt={product.name} />
      <div>
        <span className="etiqueta">{product.category}</span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="precio precio--grande">{formatPrice(product.price)}</p>
        <p>{product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}</p>
        <div className="acciones">
          <button type="button" className="boton boton--primario" disabled={product.stock <= 0} onClick={() => addItem(product)}>
            Agregar al carrito
          </button>
          <Link to={`/productos/${product.id}/editar`} className="boton boton--secundario">Editar</Link>
          <button type="button" className="boton boton--peligro" onClick={handleDelete}>Eliminar</button>
        </div>
        <Link to="/productos" className="enlace">Volver al catálogo</Link>
      </div>
    </article>
  );
}

export default ProductoDetalle;
