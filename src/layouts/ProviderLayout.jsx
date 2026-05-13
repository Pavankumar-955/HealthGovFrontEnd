import { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/ui/Footer';
import {
  MdDashboard,
  MdFolder,
  MdLogout,
  MdMenu,
  MdClose,
  MdKeyboardArrowDown,
  MdPerson
} from 'react-icons/md';
 
const ProviderLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
 
  const menuItems = [
    { path: "/provider/dashboard", label: "Dashboard" },
    { path: "/provider/programs", label: "Health Programs" },
    { path: "/provider/health-records", label: "Health Records" },
    { path: "/provider/doc-verification", label: "Doc Verification" },
  ];
 
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col">
     
      {/* Navbar - Solid Green (#0f964a) */}
      <nav className="bg-[#0f964a] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="flex items-center h-16">
           
            {/* LEFT: Logo Section */}
            <div className="flex-shrink-0 w-48">
              <Link to="/provider/dashboard" className="flex items-center gap-3 group">
                <div className="bg-white p-1 rounded-md shadow-sm transition-transform group-hover:scale-105">
                  <img
                    src="/images/web_Icon.png"
                    alt="HealthGov Logo"
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight">HealthGov</span>
              </Link>
            </div>
 
            {/* CENTER: Navigation Links */}
            <div className="hidden md:flex flex-1 justify-center items-center space-x-1">
              {menuItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                      isActive
                      ? 'bg-[#0a7a3b] text-white shadow-sm'
                      : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
 
            {/* RIGHT: Profile Pill (Notifications Removed) */}
            <div className="flex-shrink-0 w-auto md:w-48 flex items-center justify-end">
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all"
                >
                  <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center border border-white/30 text-[10px] font-bold">
                    {user?.email?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="text-left hidden lg:block leading-none">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Provider</p>
                    <p className="text-xs font-bold mt-0.5">My Account</p>
                  </div>
                  <MdKeyboardArrowDown size={18} className={`transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
 
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 text-gray-800 animate-in fade-in zoom-in duration-150">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none">Healthcare Provider</p>
                      <p className="text-sm font-bold truncate mt-1">{user?.email}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <MdLogout size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
              {/* Mobile menu toggle */}
              <button className="md:hidden ml-4" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
              </button>
            </div>
          </div>
        </div>
 
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a7a3b] border-t border-white/10 pb-4 shadow-xl">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-6 py-4 text-sm font-bold border-b border-white/5 ${
                  location.pathname.startsWith(item.path) ? 'bg-[#086330]' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
 
      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        <div className="max-w-[1440px] mx-auto p-4 md:p-10 md:pt-3">
          <Outlet />
        </div>
      </main>
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40">
            <Footer />
          </div>
    </div>
  );
};
 
export default ProviderLayout;