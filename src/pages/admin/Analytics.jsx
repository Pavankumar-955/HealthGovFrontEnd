import { useEffect, useState } from 'react';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { MdTrendingUp, MdPeople, MdCheckCircle, MdWarning } from 'react-icons/md';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    adminCount: 0,
    citizenCount: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await API.get('/healthGov/getAllCitizens');
      const users = response.data;

      const adminCount = users.filter(u => u.role === 'ADMIN').length;
      const citizenCount = users.filter(u => u.role === 'CITIZEN').length;
      const activeCount = users.filter(u => u.status === 'ACTIVE').length;

      setStats({
        totalUsers: users.length,
        activeUsers: activeCount,
        adminCount,
        citizenCount,
      });

      toast.success('Analytics loaded');
    } catch (err) {
      toast.error('Failed to load analytics');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">System insights and performance metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
              <p className="text-xs text-gray-500 mt-1">All registered users</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <MdPeople className="text-blue-600" size={32} />
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Users</p>
              <p className="text-3xl font-bold mt-2">{stats.activeUsers}</p>
              <p className="text-xs text-gray-500 mt-1">Currently active</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <MdCheckCircle className="text-green-600" size={32} />
            </div>
          </div>
        </div>

        {/* Admins */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Administrators</p>
              <p className="text-3xl font-bold mt-2">{stats.adminCount}</p>
              <p className="text-xs text-gray-500 mt-1">Admin accounts</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <MdWarning className="text-red-600" size={32} />
            </div>
          </div>
        </div>

        {/* Citizens */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Citizens</p>
              <p className="text-3xl font-bold mt-2">{stats.citizenCount}</p>
              <p className="text-xs text-gray-500 mt-1">Citizen users</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <MdTrendingUp className="text-purple-600" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Breakdown */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">User Breakdown</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Administrators</span>
              <span className="text-2xl font-bold">{stats.adminCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: `${stats.totalUsers ? (stats.adminCount / stats.totalUsers) * 100 : 0}%` }}
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-gray-600">Citizens</span>
              <span className="text-2xl font-bold">{stats.citizenCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${stats.totalUsers ? (stats.citizenCount / stats.totalUsers) * 100 : 0}%` }}
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-gray-600">Active Users</span>
              <span className="text-2xl font-bold">{stats.activeUsers}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${stats.totalUsers ? (stats.activeUsers / stats.totalUsers) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">System Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Gateway</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Operational</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Operational</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Authentication Service</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Operational</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Notification Service</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Operational</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Compliance Audit</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg mb-2">Platform Status</h3>
          <p className="text-gray-600 text-sm">All systems are running smoothly. No errors detected.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg mb-2">API Performance</h3>
          <p className="text-gray-600 text-sm">Average response time: 45ms. API requests: 10K+</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg mb-2">Security Status</h3>
          <p className="text-gray-600 text-sm">All security protocols active. No breaches detected.</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
