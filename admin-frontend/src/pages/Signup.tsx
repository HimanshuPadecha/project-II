import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/signup', { username, password, email });
      // Redirect to login after successful creation
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative overflow-hidden bg-background-dark">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div 
        className="w-full max-w-md bg-glass border border-glass-border backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="material-icons text-white text-2xl">person_add</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-1">Create Admin</h1>
          <p className="text-slate-400 text-sm">Register a new administrative account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <div>
            <label className="text-sm text-slate-400 font-semibold mb-1 block">Email (Optional)</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-black/30 border border-glass-border rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 font-semibold mb-1 block">Username</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-black/30 border border-glass-border rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 font-semibold mb-1 block">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-black/30 border border-glass-border rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-2" 
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Sign Up'}
            {!loading && <span className="material-icons text-xl">person_add</span>}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
        </div>
      </motion.div>
    </div>
  );
};
