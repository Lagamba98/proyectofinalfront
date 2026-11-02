import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Productos from './pages/Productos.jsx';
import ProductoDetalle from './pages/ProductoDetalle.jsx';
import ProductoNuevo from './pages/ProductoNuevo.jsx';
import ProductoEditar from './pages/ProductoEditar.jsx';
import Carrito from './pages/Carrito.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <>
      <Navbar />
      <main className="contenido">
        <Routes>
          <Route path="/" element={<Navigate to="/productos" replace />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/nuevo" element={<ProductoNuevo />} />
            <Route path="/productos/:id" element={<ProductoDetalle />} />
            <Route path="/productos/:id/editar" element={<ProductoEditar />} />
            <Route path="/carrito" element={<Carrito />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
