import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.fullName) newErrors.fullName = "Full name is required";

    if (!form.email) newErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email";

    if (!form.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phoneNumber))
      newErrors.phoneNumber = "Phone number must be 10 digits";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await API.post('/healthGov/citizenRegister', {
        fullName: form.fullName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password,
      });

      toast.success('Registration Successful! Please Login');
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50 overflow-hidden">
      
      {/* --- LEFT SIDE: INTERACTIVE MEDIA SECTION (60% Width) --- */}
      <div className="hidden lg:relative lg:flex lg:w-[60%] items-center justify-center bg-slate-900">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-dots-and-lines-loop-21118-large.mp4" 
            type="video/mp4" 
          />
        </video>
        
        <div className="relative z-10 w-full max-w-xl p-12">
          <div className="group rounded-[2.5rem] border border-white/20 bg-white/10 p-8 backdrop-blur-2xl transition-all duration-500 hover:bg-white/15 hover:shadow-[0_0_50px_rgba(34,197,94,0.3)]">
            <img 
               src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
               alt="Health Tech" 
               className="mb-8 h-64 w-full rounded-3xl object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <h1 className="text-4xl font-bold text-white">Join the Digital Health Revolution</h1>
            <p className="mt-4 text-lg text-emerald-100/80">
              Create your account to secure your medical history, access tele-consultations, 
              and explore government healthcare benefits instantly.
            </p>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: REGISTER FORM SECTION (40% Width) --- */}
      <div className="flex w-full flex-col justify-center bg-white px-8 md:px-16 lg:w-[40%] shadow-[-20px_0_50px_rgba(0,0,0,0.05)] overflow-y-auto py-10">
        <div className="mx-auto w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white mb-4 shadow-lg shadow-emerald-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Create Account</h2>
            <p className="mt-2 text-slate-500 font-medium">Join us to start managing your health digitally.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Full Name</label>
              <input
                name="fullName"
                type="text"
                placeholder="John Doe"
                onChange={handleChange}
                className={`w-full rounded-2xl border bg-slate-50 px-5 py-3.5 transition-all focus:bg-white focus:outline-none focus:ring-4 ${
                  errors.fullName ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-50"
                }`}
              />
              {errors.fullName && <p className="ml-1 text-xs font-medium text-red-500">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="name@healthgov.in"
                onChange={handleChange}
                className={`w-full rounded-2xl border bg-slate-50 px-5 py-3.5 transition-all focus:bg-white focus:outline-none focus:ring-4 ${
                  errors.email ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-50"
                }`}
              />
              {errors.email && <p className="ml-1 text-xs font-medium text-red-500">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Phone Number</label>
              <input
                name="phoneNumber"
                type="tel"
                placeholder="9876543210"
                onChange={handleChange}
                className={`w-full rounded-2xl border bg-slate-50 px-5 py-3.5 transition-all focus:bg-white focus:outline-none focus:ring-4 ${
                  errors.phoneNumber ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-50"
                }`}
              />
              {errors.phoneNumber && <p className="ml-1 text-xs font-medium text-red-500">{errors.phoneNumber}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                className={`w-full rounded-2xl border bg-slate-50 px-5 py-3.5 transition-all focus:bg-white focus:outline-none focus:ring-4 ${
                  errors.password ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-50"
                }`}
              />
              {errors.password && <p className="ml-1 text-xs font-medium text-red-500">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                className={`w-full rounded-2xl border bg-slate-50 px-5 py-3.5 transition-all focus:bg-white focus:outline-none focus:ring-4 ${
                  errors.confirmPassword ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-50"
                }`}
              />
              {errors.confirmPassword && <p className="ml-1 text-xs font-medium text-red-500">{errors.confirmPassword}</p>}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-slate-900 py-4 text-lg font-bold text-white transition-all hover:bg-emerald-600 active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">{loading ? 'Registering...' : 'Register Now'}</span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-emerald-600 hover:underline decoration-2 underline-offset-4">
                Sign in here
              </Link>
            </p>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-4 border-t border-slate-100 pt-8 opacity-50">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Digital India Initiative</p>
          </div>
        </div>
      </div>
    </div>
  );
}