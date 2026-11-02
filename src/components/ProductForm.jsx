import { useState } from 'react';

const EMPTY = { name: '', description: '', price: '', image: '', category: '', stock: '' };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'El nombre es obligatorio.';
  if (!v.description.trim()) e.description = 'La descripción es obligatoria.';
  if (!v.category.trim()) e.category = 'La categoría es obligatoria.';
  if (!v.image.trim()) e.image = 'La imagen es obligatoria (URL o ruta como /img/logo.png).';
  if (v.price === '' || Number.isNaN(Number(v.price)) || Number(v.price) <= 0) {
    e.price = 'El precio debe ser un número mayor a 0.';
  }
  if (v.stock === '' || !Number.isInteger(Number(v.stock)) || Number(v.stock) < 0) {
    e.stock = 'El stock debe ser un entero de 0 o más.';
  }
  return e;
}

function ProductForm({ initial, onSubmit, submitLabel = 'Guardar producto' }) {
  const [values, setValues] = useState({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSaving(true);
    setServerError('');
    try {
      await onSubmit({
        name: values.name.trim(),
        description: values.description.trim(),
        category: values.category.trim(),
        image: values.image.trim(),
        price: Number(values.price),
        stock: Number(values.stock),
      });
    } catch (err) {
      setServerError(err.message);
      setSaving(false);
    }
  };

  const field = (name, label, props = {}) => {
    const { as, ...rest } = props;
    return (
      <div className="campo">
        <label htmlFor={name}>{label}</label>
        {as === 'textarea' ? (
          <textarea id={name} name={name} rows="4" value={values[name]} onChange={handleChange} />
        ) : (
          <input id={name} name={name} value={values[name]} onChange={handleChange} {...rest} />
        )}
        {errors[name] && <span className="campo__error">{errors[name]}</span>}
      </div>
    );
  };

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      {field('name', 'Nombre')}
      {field('description', 'Descripción', { as: 'textarea' })}
      {field('category', 'Categoría')}
      {field('image', 'Imagen (URL o ruta)')}
      <div className="formulario__fila">
        {field('price', 'Precio (COP)', { type: 'number', min: '0', step: '1' })}
        {field('stock', 'Stock', { type: 'number', min: '0', step: '1' })}
      </div>
      {serverError && <p className="estado estado--error" role="alert">{serverError}</p>}
      <button type="submit" className="boton boton--primario" disabled={saving}>
        {saving ? 'Guardando...' : submitLabel}
      </button>
    </form>
  );
}

export default ProductForm;
