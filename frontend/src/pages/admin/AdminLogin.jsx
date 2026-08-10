import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      if (user.role !== 'admin') {
        setError('This account is not an admin.');
        return;
      }
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-8 w-full max-w-sm space-y-4">
        <h1 className="font-display text-2xl">Admin login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-white/10"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-white/10"
          required
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button className="w-full bg-gold text-ink py-3 rounded-xl font-semibold hover:bg-gold-dark transition">
          Log in
        </button>
      </form>
    </div>
  );
}
