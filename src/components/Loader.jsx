function Loader({ text = 'Cargando...' }) {
  return (
    <p className="estado" role="status">
      <span className="spinner" aria-hidden="true" /> {text}
    </p>
  );
}

export default Loader;
