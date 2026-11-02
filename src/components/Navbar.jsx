import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

function Navbar() {
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const handleLogout = async () => {
    await signOut();
    close();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link to="/productos" className="navbar__marca" onClick={close}>
        <img src="/img/logo.png" alt="" width="36" height="36" />
        <span>Whalehunter</span>
      </Link>

      <button
        type="button"
        className="navbar__toggle"
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen((o) => !o)}
      >
        Menú
      </button>

      <nav id="menu" className={`navbar__menu ${open ? 'navbar__menu--abierto' : ''}`} aria-label="Principal">
        {user ? (
          <>
            <NavLink to="/productos" end onClick={close}>Productos</NavLink>
            <NavLink to="/productos/nuevo" onClick={close}>Nuevo producto</NavLink>
            <NavLink to="/carrito" onClick={close}>
              Carrito <span className="insignia">{totalItems}</span>
            </NavLink>
            <span className="navbar__usuario" title={user.email}>{user.email}</span>
            <button type="button" className="boton boton--secundario" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <NavLink to="/login" onClick={close}>Iniciar sesión</NavLink>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
