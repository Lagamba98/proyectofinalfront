function ErrorMessage({ message, onRetry }) {
  return (
    <div className="estado estado--error" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="boton boton--secundario" onClick={onRetry}>
          Intentar de nuevo
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
