
import { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import {
  MdDashboard,
  MdPeople,
  MdPersonAdd,
  MdSettings,
  MdLogout,
  MdMenu,
  MdClose,
  MdAdminPanelSettings
} from 'react-icons/md';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/admin/dashboard', icon: MdDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: MdPeople, label: 'User Management' },
    { path: '/admin/add-user', icon: MdPersonAdd, label: 'Add User' },
    { path: '/admin/settings', icon: MdSettings, label: 'System Settings' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Admin Navbar (reuse landing Navbar, but add admin-specific right section) */}
      <div className="fixed top-0 left-0 w-full z-50">
        <nav className="bg-[#009933] shadow-md flex items-center justify-between px-4 py-3">
          {/* Logo and title (left) */}
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <img src="/images/web_Icon.png" alt="logo" className="h-9" />
            <span className="text-lg font-bold text-white">HealthGov Admin</span>
          </Link>
          {/* Navigation links (center) */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/admin/dashboard" className="text-lg font-medium text-white hover:text-gray-200 transition">Dashboard</Link>
            <Link to="/admin/users" className="text-lg font-medium text-white hover:text-gray-200 transition">Users</Link>
            <Link to="/admin/add-user" className="text-lg font-medium text-white hover:text-gray-200 transition">Add User</Link>
          </div>
          {/* Profile and Logout (right) */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-green-700 text-lg font-semibold">
              {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-white">{user?.name || user?.email || 'Administrator'}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-green-200">{user?.role || 'ADMIN'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-green-700 font-semibold hover:bg-green-100 transition"
            >
              <MdLogout size={18} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-20">
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;