import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await signup(name, email, password);
      navigate('/account');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="font-display text-2xl mb-6">Create your account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-white/10"
          required
        />
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
          Sign up
        </button>
      </form>
      <p className="text-sm text-muted mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-gold font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}
