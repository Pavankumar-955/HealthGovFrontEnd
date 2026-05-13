import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

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
      // ✅ ✅ ✅ REMOVE OLD TOKEN BEFORE LOGIN
      //localStorage.removeItem("token");

      const response = await API.post('/healthGov/login', {
        email,
        password,
      });

      const token = response.data.token;

      // ✅ Save token in context
      login(token);

      // ✅ Decode token safely
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role?.toString()?.toUpperCase();

      // ✅ Role-based redirect
      if (userRole === 'ADMIN') {
        navigate('/admin/dashboard');
      } 
      else if(userRole === 'COMPLIANCE') 
        {
          navigate('/compliance-dashboard');
        }
       else if(userRole === 'AUDITOR') {
          navigate('/audit-dashboard');
        }
       else if (userRole === 'RESEARCHER') {
        navigate('/researcher/projects'); // ✅ FIXED HERE
      } else if (userRole === 'MANAGER') {
        navigate('/manager/dashboard');
      } else if (userRole === 'PROVIDER') {
        navigate('/provider/dashboard');
      }else if (userRole === 'CITIZEN') {
        navigate('/citizen/dashboard');
      } else {
        navigate('/');
      }

      toast.success('Login Successful');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-lime-100 via-emerald-100 to-white px-4 font-sans text-slate-900">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-11 items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-white shadow-lg">
              <span className="font-bold">HealthGov</span>
              <span className="text-xs uppercase tracking-[0.3em]">Portal</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold">Sign in to your account</h1>

          <p className="mt-2 text-sm text-slate-600">
            Welcome back to HealthGov. Access your dashboard.
          </p>

          <p className="mt-3 text-sm text-slate-500">
            <Link to="/" className="font-semibold text-emerald-600">
              Back to home
            </Link>
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password" className="text-emerald-600">
                Forgot password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 py-3 text-white"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

          </form>

          <p className="mt-6 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-emerald-600">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}