import { createContext, useContext, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

const clampAdd = (i) => ({ ...i, quantity: Math.min(i.quantity + 1, i.stock) });

function reducer(items, action) {
  switch (action.type) {
    case 'add': {
      const found = items.find((i) => i.id === action.product.id);
      if (found) return items.map((i) => (i.id === found.id ? clampAdd(i) : i));
      return [...items, { ...action.product, quantity: 1 }];
    }
    case 'increase':
      return items.map((i) => (i.id === action.id ? clampAdd(i) : i));
    case 'decrease':
      return items
        .map((i) => (i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0);
    case 'remove':
      return items.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);

  const value = useMemo(
    () => ({
      items,
      totalItems: items.reduce((acc, i) => acc + i.quantity, 0),
      totalPrice: items.reduce((acc, i) => acc + i.quantity * i.price, 0),
      addItem: (product) => dispatch({ type: 'add', product }),
      increase: (id) => dispatch({ type: 'increase', id }),
      decrease: (id) => dispatch({ type: 'decrease', id }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
