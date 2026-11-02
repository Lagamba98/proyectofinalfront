import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils.js';

function CartItem({ item }) {
  const { increase, decrease, removeItem } = useCart();

  return (
    <li className="carrito__item">
      <img src={item.image} alt="" />
      <div className="carrito__info">
        <strong>{item.name}</strong>
        <span>{formatPrice(item.price)} c/u</span>
      </div>
      <div className="cantidad" role="group" aria-label={`Cantidad de ${item.name}`}>
        <button type="button" onClick={() => decrease(item.id)} aria-label="Disminuir">−</button>
        <span>{item.quantity}</span>
        <button
          type="button"
          onClick={() => increase(item.id)}
          disabled={item.quantity >= item.stock}
          aria-label="Aumentar"
        >
          +
        </button>
      </div>
      <strong className="carrito__subtotal">{formatPrice(item.price * item.quantity)}</strong>
      <button type="button" className="boton boton--peligro" onClick={() => removeItem(item.id)}>
        Eliminar
      </button>
    </li>
  );
}

export default CartItem;
