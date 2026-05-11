import { useEffect, useState } from 'react';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { MdPeople, MdHealthAndSafety, MdAnalytics, MdWork, MdScience, MdManageAccounts, MdShield, MdVerified } from 'react-icons/md';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    citizens: 0
    , roleCounts: {
      CITIZEN: 0,
      PROVIDER: 0,
      RESEARCHER: 0,
      MANAGER: 0,
      COMPLIANCE: 0,
      AUDITOR: 0,
    }
  });

  const roleMeta = {
    CITIZEN: {
      label: 'Citizens',
      icon: MdPeople,
      bg: 'bg-blue-100',
      fg: 'text-blue-600',
    },
    PROVIDER: {
      label: 'Providers',
      icon: MdWork,
      bg: 'bg-emerald-100',
      fg: 'text-emerald-600',
    },
    RESEARCHER: {
      label: 'Researchers',
      icon: MdScience,
      bg: 'bg-purple-100',
      fg: 'text-purple-600',
    },
    MANAGER: {
      label: 'Managers',
      icon: MdManageAccounts,
      bg: 'bg-orange-100',
      fg: 'text-orange-600',
    },
    COMPLIANCE: {
      label: 'Compliance',
      icon: MdShield,
      bg: 'bg-cyan-100',
      fg: 'text-cyan-600',
    },
    AUDITOR: {
      label: 'Auditors',
      icon: MdVerified,
      bg: 'bg-slate-100',
      fg: 'text-slate-700',
    },
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await API.get('/healthGov/getAllUsers');
      setUsers(response.data);

      // Calculate stats
      const totalUsers = response.data.length;
      const activeUsers = response.data.filter(user => user.status === 'ACTIVE').length;
      const citizens = response.data.filter(user => user.role === 'CITIZEN').length;
      const roleCounts = response.data.reduce((counts, user) => {
        const role = user.role || 'CITIZEN';
        if (role === 'ADMIN') return counts;
        counts[role] = (counts[role] || 0) + 1;
        return counts;
      }, {
        CITIZEN: 0,
        PROVIDER: 0,
        RESEARCHER: 0,
        MANAGER: 0,
        COMPLIANCE: 0,
        AUDITOR: 0,
      });

      setStats({
        totalUsers,
        activeUsers,
        citizens,
        roleCounts
      });

      toast.success('Users loaded successfully');
    } catch (err) {
      toast.error('Failed to load users');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage system users and monitor platform health</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
              <p className="text-green-600 text-sm mt-1">+12% this month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MdPeople className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Users</p>
              <p className="text-3xl font-bold mt-2">{stats.activeUsers}</p>
              <p className="text-blue-600 text-sm mt-1">{stats.totalUsers ? `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}% active` : '0% active'}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <MdHealthAndSafety className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">User Count by Role</h2>
            <p className="text-gray-600">Quick overview of registered users by role.</p>
          </div>
          <div className="text-sm text-slate-500">Total users: {stats.totalUsers}</div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(stats.roleCounts).map(([role, count]) => {
            const meta = roleMeta[role] || {
              label: role,
              icon: MdPeople,
              bg: 'bg-slate-100',
              fg: 'text-slate-700',
            };
            const Icon = meta.icon;
            return (
              <div key={role} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{meta.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">{count}</p>
                  </div>
                  <div className={`flex h-14 w-14 items-center justify-center rounded-3xl ${meta.bg}`}>
                    <Icon className={meta.fg} size={28} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* User Management section removed from dashboard UI */}
    </div>
  );
};

export default AdminDashboard;
