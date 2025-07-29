import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) errors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) errors.email = 'Invalid email';

    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Min 6 characters';

    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    const result = await login(formData.email, formData.password);
    if (!result.success) setError(result.message);
    setLoading(false);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* Left - Login Form */}
        <motion.div
          className="md:w-1/2 bg-[#2c1e4a] text-white p-10"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-2">Login</h2>
          <p className="text-sm text-gray-400 mb-6">Enter your account details</p>

          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full py-3 pl-10 pr-4 rounded bg-[#3d2c5f] text-white placeholder-gray-400 ${
                  formErrors.email ? 'border border-red-400' : 'border border-transparent'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              {formErrors.email && <p className="text-xs text-red-400 mt-1">{formErrors.email}</p>}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full py-3 pl-10 pr-10 rounded bg-[#3d2c5f] text-white placeholder-gray-400 ${
                  formErrors.password ? 'border border-red-400' : 'border border-transparent'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {formErrors.password && <p className="text-xs text-red-400 mt-1">{formErrors.password}</p>}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-purple-500" />
                Remember me
              </label>
              <Link to="/forgot-password" className="hover:underline text-purple-300">
                Forgot Password?
              </Link>
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-semibold shadow disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-400">
            Don’t have an account?{' '}
            <Link to="/register" className="text-purple-400 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </motion.div>

        {/* Right - Illustration Panel */}
        <motion.div
          className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex-col justify-center items-center p-10"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-3"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            Connect & Learn
          </motion.h2>
          <p className="text-xl font-semibold mb-6">Welcome Back!</p>
          <p className="text-sm text-center max-w-xs mb-8">
            Join a growing network of learners and connect with your peers.
          </p>
          <motion.img
            src="https://i.pinimg.com/1200x/25/a5/32/25a532ed43fe25d0a4cb6ce4bb3b4bf8.jpg"
            alt="People Network"
            className="w-[250px] h-auto drop-shadow-xl rounded-xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
