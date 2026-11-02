import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem.jsx';
import { useCart } from '../context/CartContext.jsx';
import { decreaseStock } from '../services/productService.js';
import { formatPrice } from '../utils.js';

function Carrito() {
  const { items, totalItems, totalPrice, clear } = useCart();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  const handleCheckout = async () => {
    setProcessing(true);
    setError('');
    try {
      // Descuenta el stock de cada producto en Supabase
      for (const item of items) {
        await decreaseStock(item.id, item.quantity);
      }
      setOrder({ items, totalItems, totalPrice });
      clear();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (order) {
    return (
      <section className="pagina-estrecha">
        <h1>¡Compra realizada!</h1>
        <div className="estado estado--ok" role="status">
          <p>Tu pedido de {order.totalItems} ítems por {formatPrice(order.totalPrice)} quedó registrado.</p>
          <ul>
            {order.items.map((i) => (
              <li key={i.id}>{i.name} x{i.quantity}</li>
            ))}
          </ul>
          <p>Esta es una compra simulada: no se realizó ningún cobro.</p>
        </div>
        <Link to="/productos" className="boton boton--primario">Seguir comprando</Link>
      </section>
    );
  }

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
      {error && <p className="estado estado--error" role="alert">{error}</p>}
      <div className="resumen">
        <p>{totalItems} ítems</p>
        <p className="precio precio--grande">Total: {formatPrice(totalPrice)}</p>
        <div className="acciones">
          <button type="button" className="boton boton--secundario" onClick={clear} disabled={processing}>
            Vaciar carrito
          </button>
          <button type="button" className="boton boton--primario" onClick={handleCheckout} disabled={processing}>
            {processing ? 'Procesando...' : 'Finalizar compra'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Carrito;