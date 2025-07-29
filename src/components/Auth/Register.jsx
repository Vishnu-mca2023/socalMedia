import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const passwordChecks = {
    length: (pw) => pw.length >= 6,
    uppercase: (pw) => /[A-Z]/.test(pw),
    number: (pw) => /\d/.test(pw),
    special: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
  };

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email';
    }

    const { password } = formData;
    if (!password) {
      errors.password = 'Password is required';
    } else {
      if (!passwordChecks.length(password)) errors.password = 'Min 6 characters required';
      else if (!passwordChecks.uppercase(password)) errors.password = 'Must include uppercase';
      else if (!passwordChecks.number(password)) errors.password = 'Must include a number';
      else if (!passwordChecks.special(password)) errors.password = 'Must include special character';
    }

    if (password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreed) {
      errors.agreed = 'You must agree to the terms';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    const username = `${formData.firstName} ${formData.lastName}`;
    const result = await register(username, formData.email, formData.password);
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success('Registered successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreed: false,
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center bg-zinc-900 px-8 py-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md w-full space-y-6 text-white">
          <motion.h2
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Create Account
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div className="flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 rounded bg-zinc-800 text-white"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 rounded bg-zinc-800 text-white"
              />
            </motion.div>
            {formErrors.firstName && <p className="text-sm text-red-400">{formErrors.firstName}</p>}
            {formErrors.lastName && <p className="text-sm text-red-400">{formErrors.lastName}</p>}

            <motion.input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-zinc-800 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            />
            {formErrors.email && <p className="text-sm text-red-400">{formErrors.email}</p>}

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-zinc-800 text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formErrors.password && <p className="text-sm text-red-400">{formErrors.password}</p>}

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-zinc-800 text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formErrors.confirmPassword && (
              <p className="text-sm text-red-400">{formErrors.confirmPassword}</p>
            )}

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                className="accent-indigo-600"
              />
              I agree to the <span className="underline">Terms & Conditions</span>
            </label>
            {formErrors.agreed && <p className="text-sm text-red-400">{formErrors.agreed}</p>}

         <motion.button
  type="submit"
  disabled={loading}
  whileTap={{ scale: 0.97 }}
  className="w-full bg-[#1877F2] hover:bg-[#145DBF] transition text-white py-2 rounded font-semibold shadow-md disabled:opacity-50"
>
  {loading ? 'Logging in...' : 'Signin'}
</motion.button>



          </form>

          <motion.p
            className="text-sm text-gray-300 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Already have an account?{' '}
            <Link to="/login" className="underline text-white">
              Login
            </Link>
          </motion.p>
        </div>
      </motion.div>

      {/* Right: Illustration */}
      <motion.div
        className="hidden md:flex w-1/2 bg-gradient-to-br from-black via-gray-900 to-orange-600 text-white items-center justify-center p-8 relative"

        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center space-y-4"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-center text-purple-700 tracking-wide">
  Build Real Connections, One Click at a Time
</h1>

<p className="text-lg text-gray-600 text-center mt-2">
  Join the community where stories unfold, memories are made, and your voice matters.
</p>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/student-login-4489543-3723271.png"
            alt="Illustration"
            className="w-80 mx-auto mt-6"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
