import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { api } from "./api/axios";
import { useUser } from "./context/UserContext";
import { useToast } from "./context/ToastContext";
import { handleApiError } from "./utils/errorHandler";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useUser();
  const { addToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Backend expects username and password
      const response = await api.post("/users/login", { username, password });

      const { accessToken } = response.data.response.data;

      console.log(response.data.response);

      // We don't have the full user context in the login response payload, so we just set a mock user temporarily
      // or rely on a follow-up /current-user call. We'll set the token and let context re-fetch or we will just set username.
      login(
        {
          username,
          email: response.data.response.data.user.email,
          profileImg: response.data.response.data.user.profileImg,
        },
        accessToken,
      );

      addToast("Logged in successfully!", "success");
      // Navigation is actually handled automatically by GuestRoute when user context updates,
      // but explicitly calling navigate is fine.
      navigate("/");
    } catch (err: unknown) {
      setError(
        handleApiError(err, "Login failed. Please verify your credentials."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 relative overflow-hidden pt-12">
      {/* Subtle Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50 z-0"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.4,
              staggerChildren: 0.1,
              delayChildren: 0.1,
            },
          },
        }}
        className="w-full max-w-md bg-[#182032] border border-white/10 p-8 rounded-2xl backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] relative z-10 transition-all"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/30">
            <span className="material-icons text-3xl">train</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-slate-400 text-sm">
            Sign in to manage your journeys and bookings.
          </p>
        </motion.div>

        <motion.form
          variants={itemVariants}
          className="space-y-5"
          onSubmit={handleLogin}
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Username
            </label>
            <div className="relative">
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                person
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="your username"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Password
              </label>
              <a
                href="#"
                className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                lock
              </span>
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
                <span className="material-icons text-sm">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-4 active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? "Signing In..." : "Sign In"}
            {!isLoading && (
              <span className="material-icons text-sm">arrow_forward</span>
            )}
          </button>
        </motion.form>

        <motion.div
          variants={itemVariants}
          className="mt-8 relative flex items-center justify-center"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-8 text-center text-sm text-slate-400"
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-semibold hover:underline transition-all"
          >
            Create Account
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
