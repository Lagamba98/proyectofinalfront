import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm.jsx';
import { createProduct } from '../services/productService.js';

function ProductoNuevo() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const created = await createProduct(data);
    navigate(`/productos/${created.id}`);
  };

  return (
    <section className="pagina-estrecha">
      <h1>Nuevo producto</h1>
      <ProductForm onSubmit={handleSubmit} submitLabel="Crear producto" />
    </section>
  );
}

export default ProductoNuevo;
