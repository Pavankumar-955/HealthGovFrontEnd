import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post('/healthGov/login', {
        email,
        password,
      });

      const token = response.data.token;
      login(token);

      // Redirect based on user role
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userRole = decodedToken.role;

      if (userRole === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/citizen/dashboard');
      }

      toast.success('Login Successful');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0F1A] px-4 font-sans text-white">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            {/* Logo placeholder */}
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 blur-[2px]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Sign in to your account</h1>
        </div>

        {/* Main Card */}
        <div className="rounded-xl border border-gray-800 bg-[#151B28] p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email  address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-[#0B0F1A] px-4 py-3 text-white outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-[#0B0F1A] px-4 py-3 text-white outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="font-semibold text-indigo-500 hover:text-indigo-400">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#151B28] px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-[#1F2937] py-2.5 transition-colors hover:bg-gray-700">
              {/* <FcGoogle className="text-xl" /> */}
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-[#1F2937] py-2.5 transition-colors hover:bg-gray-700">
              {/* <FaGithub className="text-xl" /> */}
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-indigo-500 hover:text-indigo-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}