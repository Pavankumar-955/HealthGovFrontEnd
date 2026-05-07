import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api/axios';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post('/healthGov/forgotPassword/otp', { email });
      toast.success('OTP Sent Successfully to your email');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed To Send OTP');
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
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-red-500 to-orange-500 blur-[2px]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Reset your password</h1>
          <p className="mt-2 text-gray-400">Enter your email to receive OTP</p>
        </div>

        {/* Main Card */}
        <div className="rounded-xl border border-gray-800 bg-[#151B28] p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-[#0B0F1A] px-4 py-3 text-white outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700 active:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Remember your password?{' '}
            <Link to="/login" className="font-semibold text-red-500 hover:text-red-400">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
