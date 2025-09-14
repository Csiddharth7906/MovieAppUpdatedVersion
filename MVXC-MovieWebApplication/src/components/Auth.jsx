import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login logic
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
        
        login(response.data.user, response.data.token);
        navigate('/');
      } else {
        // Signup logic
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const response = await axios.post('http://localhost:5000/api/auth/signup', {
          name: formData.username,
          email: formData.email,
          password: formData.password
        });
        
        login(response.data.user, response.data.token);
        navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      username: '',
      confirmPassword: ''
    });
    setError('');
  };

  return (
    <div className="min-h-screen w-full bg-[#1F1E24] flex items-center justify-center">
      <div className="bg-[#2A2930] p-8 rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#D2042D] mb-2">MVXC</h1>
          <h2 className="text-2xl font-semibold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-zinc-400">
            {isLogin ? 'Sign in to your account' : 'Join MVXC today'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username field for signup */}
          {!isLogin && (
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1F1E24] border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-[#D2042D] transition duration-200"
                placeholder="Enter your username"
                required={!isLogin}
              />
            </div>
          )}

          {/* Email field */}
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#1F1E24] border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-[#D2042D] transition duration-200"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password field */}
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#1F1E24] border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-[#D2042D] transition duration-200"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password field for signup */}
          {!isLogin && (
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1F1E24] border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-[#D2042D] transition duration-200"
                placeholder="Confirm your password"
                required={!isLogin}
              />
            </div>
          )}

          {/* Remember me checkbox for login */}
          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#D2042D] bg-[#1F1E24] border-zinc-600 rounded focus:ring-[#D2042D] focus:ring-2"
                />
                <span className="ml-2 text-sm text-zinc-300">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-[#D2042D] hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D2042D] hover:bg-[#B8032A] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Toggle between login/signup */}
        <div className="mt-6 text-center">
          <p className="text-zinc-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleMode}
              className="ml-2 text-[#D2042D] hover:underline font-medium"
            >
              {isLogin ? 'Sign up here' : 'Sign in here'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Auth;
