import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { api } from './api/axios';
import { useUser } from './context/UserContext';
import { useToast } from './context/ToastContext';
import { handleApiError } from './utils/errorHandler';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useUser();
  const { addToast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Perform Signup with FormData bridging text & file
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      // Backend handles email creation randomly or accepts it, we'll keep it strictly username/password
      if (photo) {
        formData.append('profileImg', photo);
      }

      const signupResponse = await api.post('/users/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const newUser = signupResponse.data.response.data;

      // 2. Automatically Login exactly after signup finishes
      const loginResponse = await api.post('/users/login', { username, password });

      console.log(loginResponse);
      
      const { accessToken } = loginResponse.data.response.data;

      // 3. Update Global Context
      login(newUser, accessToken);

      // 4. Show Notification & Redirect
      addToast('Account created & Signed in!', 'success');
      navigate('/');

    } catch (err: unknown) {
      setError(handleApiError(err, 'Signup failed. Please try a different username.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 relative overflow-hidden pt-12">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50 z-0"></div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, staggerChildren: 0.1, delayChildren: 0.1 }
          }
        }}
        className="w-full max-w-md bg-[#182032] border border-white/10 p-8 rounded-2xl backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] relative z-10 transition-all"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/30">
            <span className="material-icons text-3xl">person_add</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Create Account</h2>
          <p className="text-slate-400 text-sm">Join us to manage your journeys and bookings.</p>
        </motion.div>

        <motion.form variants={itemVariants} className="space-y-5" onSubmit={handleSignup}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Username</label>
            <div className="relative">
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">person</span>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="Unique username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">lock</span>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center p-1"
              >
                <span className="material-icons text-sm">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 mt-4 flex justify-between">
              Profile Photo <span className="text-[10px] text-slate-600 bg-slate-800 px-2 py-0.5 rounded ml-2">Optional</span>
            </label>
            <div className="relative mt-2 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center flex-shrink-0">
                {photo ? (
                  <img src={URL.createObjectURL(photo)} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-icons text-slate-500 text-lg">face</span>
                )}
              </div>
              <input 
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setPhoto(e.target.files[0]);
                  }
                }}
                className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/5 file:text-slate-300 hover:file:bg-white/10 file:transition-all outline-none"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-6 active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
            {!isLoading && <span className="material-icons text-sm">arrow_forward</span>}
          </button>
        </motion.form>

        <motion.div variants={itemVariants} className="mt-8 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
             <div className="w-full border-t border-white/10"></div>
          </div>
        </motion.div>

        <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline transition-all">Log In</Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signup;
