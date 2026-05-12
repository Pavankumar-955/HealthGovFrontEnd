import { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  MdDashboard,
  MdPerson,
  MdNotifications,
  MdHealthAndSafety,
  MdLogout,
  MdMenu,
  MdClose
} from 'react-icons/md';

const CitizenLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/citizen/dashboard', icon: MdDashboard, label: 'Dashboard' },
    { path: '/citizen/profile', icon: MdPerson, label: 'My Profile' },
    { path: '/citizen/health-records', icon: MdHealthAndSafety, label: 'Health Records' },
    { path: '/citizen/notifications', icon: MdNotifications, label: 'Notifications' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100">
          {/* Changed text-blue-600 to text-emerald-600 */}
          <h1 className="text-2xl font-black text-emerald-600 tracking-tight">HealthGov</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100vh-80px)]">
          {/* User Info */}
          <div className="p-6">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
              {/* Changed bg-blue-500 to bg-emerald-600 */}
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
                <span className="text-white font-bold">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-gray-900 truncate text-sm">{user?.email}</p>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Citizen</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border-r-4 border-emerald-600 shadow-sm'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-emerald-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={22} className={isActive ? 'text-emerald-600' : 'group-hover:text-emerald-600'} />
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 font-bold text-sm"
            >
              <MdLogout size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar for Mobile */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <MdMenu size={24} />
            </button>
            <h1 className="text-lg font-bold text-emerald-600">HealthGov</h1>
            <div className="w-8" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50/50">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CitizenLayout;