import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { getProduct, updateProduct } from '../services/productService.js';

function ProductoEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getProduct(id).then(setProduct).catch(() => setError('No se pudo cargar el producto.'));
  }, [id]);

  const handleSubmit = async (data) => {
    await updateProduct(id, data);
    navigate(`/productos/${id}`);
  };

  if (error) return <ErrorMessage message={error} />;
  if (!product) return <Loader text="Cargando producto..." />;

  return (
    <section className="pagina-estrecha">
      <h1>Editar producto</h1>
      <ProductForm initial={product} onSubmit={handleSubmit} submitLabel="Guardar cambios" />
    </section>
  );
}

export default ProductoEditar;
