import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.from ?? '/productos';
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to={destino} replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = {};
    if (!email.trim()) found.email = 'El correo es obligatorio.';
    else if (!EMAIL_RE.test(email)) found.email = 'Escribe un correo válido.';
    if (!password) found.password = 'La contraseña es obligatoria.';
    else if (password.length < 6) found.password = 'Mínimo 6 caracteres.';
    setErrors(found);
    setMessage('');
    if (Object.keys(found).length) return;

    setBusy(true);
    try {
      if (mode === 'login') {
        await signIn(email, password);
        navigate(destino, { replace: true });
      } else {
        const { needsConfirmation } = await signUp(email, password);
        if (needsConfirmation) {
          setMessage('Cuenta creada. Revisa tu correo para confirmarla y luego inicia sesión.');
          setMode('login');
        }
      }
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setBusy(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setErrors({});
    setMessage('');
  };

  return (
    <section className="auth">
      <img src="/img/logo.png" alt="Logo de Whalehunter" width="72" height="72" />
      <h1>{mode === 'login' ? 'Inicia sesión' : 'Crea tu cuenta'}</h1>
      <form className="formulario" onSubmit={handleSubmit} noValidate>
        <div className="campo">
          <label htmlFor="email">Correo</label>
          <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <span className="campo__error">{errors.email}</span>}
        </div>
        <div className="campo">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="campo__error">{errors.password}</span>}
        </div>
        {errors.form && <p className="estado estado--error" role="alert">{errors.form}</p>}
        {message && <p className="estado estado--ok" role="status">{message}</p>}
        <button type="submit" className="boton boton--primario" disabled={busy}>
          {busy ? 'Un momento...' : mode === 'login' ? 'Entrar' : 'Registrarme'}
        </button>
      </form>
      <button type="button" className="enlace" onClick={switchMode}>
        {mode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
      </button>
    </section>
  );
}

export default Login;
