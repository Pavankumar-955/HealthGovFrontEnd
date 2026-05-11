import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { MdDashboard, MdPeople, MdPersonAdd, MdBarChart } from 'react-icons/md';
import { useState } from 'react';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const commonItems = [
    { path: '/dashboard', label: 'Dashboard', icon: MdDashboard },
  ];

  const adminItems = [
    { path: '/admin/users', label: 'Users', icon: MdPeople },
    { path: '/admin/add-user', label: 'Add User', icon: MdPersonAdd },
    { path: '/admin/analytics', label: 'Analytics', icon: MdBarChart },
  ];

  const menuItems = user?.role === 'ADMIN' ? [...commonItems, ...adminItems] : commonItems;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-blue-900 text-white p-2 rounded-lg"
      >
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative w-64 bg-blue-900 text-white h-screen flex flex-col transition-transform lg:translate-x-0 z-40 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-2xl font-bold text-center">HealthGov</h1>
          <p className="text-xs text-blue-200 text-center mt-1">{user?.role}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(path)
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-800'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-blue-800">
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
