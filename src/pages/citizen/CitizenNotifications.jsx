import { useState, useEffect } from 'react';
import { MdNotifications, MdNotificationsActive, MdCheckCircle, MdError, MdInfo } from 'react-icons/md';

const CitizenNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          type: 'appointment',
          title: 'Appointment Reminder',
          message: 'Your appointment with Dr. Sarah Johnson is tomorrow at 10:00 AM',
          date: '2024-01-24',
          time: '09:00 AM',
          read: false,
          priority: 'high'
        },
        {
          id: 2,
          type: 'result',
          title: 'Test Results Available',
          message: 'Your blood test results are now available in your health records',
          date: '2024-01-23',
          time: '02:30 PM',
          read: false,
          priority: 'medium'
        },
        {
          id: 3,
          type: 'general',
          title: 'Health Tip',
          message: 'Remember to stay hydrated! Drink at least 8 glasses of water daily.',
          date: '2024-01-22',
          time: '10:00 AM',
          read: true,
          priority: 'low'
        },
        {
          id: 4,
          type: 'system',
          title: 'Profile Updated',
          message: 'Your profile information has been successfully updated',
          date: '2024-01-21',
          time: '04:15 PM',
          read: true,
          priority: 'low'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getNotificationIcon = (type, read) => {
    const iconClass = read ? "text-gray-400" : "text-blue-600";

    switch (type) {
      case 'appointment':
        return <MdNotificationsActive className={iconClass} size={20} />;
      case 'result':
        return <MdCheckCircle className={iconClass} size={20} />;
      case 'error':
        return <MdError className="text-red-500" size={20} />;
      default:
        return <MdInfo className={iconClass} size={20} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'read':
        return notification.read;
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">Stay updated with your health information</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: 'all', label: 'All' },
          { key: 'unread', label: `Unread (${unreadCount})` },
          { key: 'read', label: 'Read' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-md border-l-4 ${getPriorityColor(notification.priority)} ${
              !notification.read ? 'bg-blue-50' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type, notification.read)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${
                        notification.read ? 'text-gray-900' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </h3>
                      <p className={`mt-1 ${
                        notification.read ? 'text-gray-600' : 'text-gray-700'
                      }`}>
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {notification.date} at {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="ml-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdNotifications className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter === 'unread' ? 'No unread notifications' :
             filter === 'read' ? 'No read notifications' :
             'No notifications yet'}
          </h3>
          <p className="text-gray-600">
            {filter === 'all' ? 'You\'ll see your health updates and reminders here' :
             'Check back later for new notifications'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CitizenNotifications;