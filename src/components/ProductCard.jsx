import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils.js';

function ProductCard({ product }) {
  const { addItem } = useCart();
  const { id, name, category, price, image, stock } = product;

  return (
    <article className="tarjeta">
      <Link to={`/productos/${id}`} className="tarjeta__imagen">
        <img src={image} alt={name} loading="lazy" />
      </Link>
      <div className="tarjeta__cuerpo">
        <span className="etiqueta">{category}</span>
        <h3><Link to={`/productos/${id}`}>{name}</Link></h3>
        <p className="precio">{formatPrice(price)}</p>
        <button
          type="button"
          className="boton boton--primario"
          disabled={stock <= 0}
          onClick={() => addItem(product)}
        >
          {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
