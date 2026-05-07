import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { MdHealing, MdCalendarToday, MdNotifications, MdPerson, MdLocalHospital, MdTrendingUp } from 'react-icons/md';

const CitizenDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    healthRecords: 0,
    appointments: 0,
    notifications: 0,
    profileCompleteness: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch user profile to get user ID
      // Note: This would need a proper endpoint in the backend
      // For now, using mock data

      setStats({
        healthRecords: 5,
        appointments: 2,
        notifications: 3,
        profileCompleteness: 85
      });

      setRecentActivity([
        {
          id: 1,
          type: 'appointment',
          title: 'Appointment Scheduled',
          description: 'General checkup with Dr. Smith',
          date: '2024-01-25',
          time: '10:00 AM'
        },
        {
          id: 2,
          type: 'record',
          title: 'Health Record Added',
          description: 'Blood test results uploaded',
          date: '2024-01-20',
          time: '02:30 PM'
        },
        {
          id: 3,
          type: 'notification',
          title: 'Vaccination Reminder',
          description: 'Flu shot due in 2 weeks',
          date: '2024-01-18',
          time: '09:00 AM'
        }
      ]);

      toast.success('Dashboard loaded successfully');
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'appointment':
        return <MdCalendarToday className="text-blue-600" size={20} />;
      case 'record':
        return <MdHealing className="text-green-600" size={20} />;
      case 'notification':
        return <MdNotifications className="text-orange-600" size={20} />;
      default:
        return <MdPerson className="text-gray-600" size={20} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name || user?.email}!</h1>
        <p className="text-gray-600">Manage your health information and stay connected with your healthcare providers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Health Records</p>
              <p className="text-3xl font-bold mt-2">{stats.healthRecords}</p>
              <p className="text-green-600 text-sm mt-1">+2 this month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MdHealing className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Appointments</p>
              <p className="text-3xl font-bold mt-2">{stats.appointments}</p>
              <p className="text-blue-600 text-sm mt-1">Next: Tomorrow</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <MdCalendarToday className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Notifications</p>
              <p className="text-3xl font-bold mt-2">{stats.notifications}</p>
              <p className="text-orange-600 text-sm mt-1">3 unread</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <MdNotifications className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Profile Complete</p>
              <p className="text-3xl font-bold mt-2">{stats.profileCompleteness}%</p>
              <p className="text-purple-600 text-sm mt-1">Almost there!</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <MdPerson className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <MdCalendarToday className="text-blue-600" size={20} />
                <span className="font-medium">Book Appointment</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <MdLocalHospital className="text-green-600" size={20} />
                <span className="font-medium">Find Healthcare Provider</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <MdTrendingUp className="text-purple-600" size={20} />
                <span className="font-medium">View Health Trends</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      {activity.date} at {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {recentActivity.length === 0 && (
              <p className="text-gray-500 text-center py-8">No recent activity</p>
            )}
          </div>
        </div>
      </div>

      {/* Health Tips */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white bg-opacity-20 p-3 rounded-lg">
            <MdHealing size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Health Tip of the Day</h3>
            <p className="mt-2">Stay hydrated! Aim for at least 8 glasses of water daily to maintain optimal health and energy levels.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
