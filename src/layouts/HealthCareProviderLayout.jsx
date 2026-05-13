import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  MdDashboard, MdPeople, MdHealthAndSafety, 
  MdVerifiedUser, MdLogout, MdMenu, MdSettings 
} from 'react-icons/md';
import { useState } from 'react';

const HealthCareProviderLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { 
        name: 'Dashboard', 
        path: '/provider/dashboard', 
        icon: <MdDashboard size={20}/> 
    },
    { 
        name: 'Citizen Search', 
        path: '/provider/search', 
        icon: <MdPeople size={20}/> 
    },
    { 
        name: 'Verification Hub', 
        path: '/provider/verify', 
        icon: <MdVerifiedUser size={20}/> 
    },
    { 
        name: 'Health Records', 
        path: '/provider/records', 
        icon: <MdHealthAndSafety size={20}/> 
    },
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex">
      
      {/* 1. SIDEBAR */}
      <aside className={`bg-slate-900 text-white transition-all duration-300 shadow-2xl flex flex-col ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
        
        {/* Logo Section */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-emerald-500 p-2 rounded-xl text-white">
            <MdHealthAndSafety size={24} />
          </div>
          {isSidebarOpen && (
            <span className="font-black text-lg tracking-tighter uppercase text-emerald-400">
              Health<span className="text-white">Gov</span>
            </span>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                location.pathname === item.path 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span className="font-bold text-sm">{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-slate-800">
          <div className={`flex items-center gap-3 p-3 rounded-2xl bg-slate-800/50 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center font-black">
              {user?.name?.charAt(0) || 'P'}
            </div>
            {isSidebarOpen && (
              <div className="flex-1 truncate">
                <p className="text-xs font-black truncate">{user?.name || 'Provider'}</p>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Medical Officer</p>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleLogout}
            className={`w-full mt-4 flex items-center gap-4 p-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all ${!isSidebarOpen && 'justify-center'}`}
          >
            <MdLogout size={20} />
            {isSidebarOpen && <span className="font-bold text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white h-20 px-8 flex items-center justify-between border-b border-slate-200">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors"
          >
            <MdMenu size={24} />
          </button>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Current Station</p>
              <p className="text-sm font-bold text-slate-700">Central Government Hospital</p>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <button className="text-slate-400 hover:text-slate-600">
              <MdSettings size={24} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
            {/* The <Outlet /> is where your ProviderDashboard 
               or SearchPage components will be rendered 
            */}
            <Outlet />
        </div>
      </main>

    </div>
  );
};

export default HealthCareProviderLayout;