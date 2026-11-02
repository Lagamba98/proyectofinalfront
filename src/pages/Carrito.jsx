import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils.js';

function Carrito() {
  const { items, totalItems, totalPrice, clear } = useCart();

  if (items.length === 0) {
    return (
      <section>
        <h1>Tu carrito</h1>
        <p className="estado">Aún no agregas servicios. <Link to="/productos" className="enlace">Ver el catálogo</Link></p>
      </section>
    );
  }

  return (
    <section>
      <h1>Tu carrito</h1>
      <ul className="carrito">
        {items.map((item) => <CartItem key={item.id} item={item} />)}
      </ul>
      <div className="resumen">
        <p>{totalItems} ítems</p>
        <p className="precio precio--grande">Total: {formatPrice(totalPrice)}</p>
        <button type="button" className="boton boton--secundario" onClick={clear}>Vaciar carrito</button>
      </div>
    </section>
  );
}

export default Carrito;
