import { useState, useEffect } from 'react';
import { MdAdd, MdCalendarToday, MdAccessTime, MdLocationOn, MdPerson } from 'react-icons/md';

const CitizenAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setAppointments([
        {
          id: 1,
          type: 'General Checkup',
          doctor: 'Dr. Sarah Johnson',
          date: '2024-01-25',
          time: '10:00 AM',
          location: 'City General Hospital',
          status: 'confirmed',
          notes: 'Annual physical examination'
        },
        {
          id: 2,
          type: 'Dental Cleaning',
          doctor: 'Dr. Michael Chen',
          date: '2024-01-20',
          time: '2:30 PM',
          location: 'Smile Dental Clinic',
          status: 'completed',
          notes: 'Regular cleaning and checkup'
        },
        {
          id: 3,
          type: 'Cardiology Consultation',
          doctor: 'Dr. Robert Davis',
          date: '2024-02-05',
          time: '11:15 AM',
          location: 'Heart Care Center',
          status: 'scheduled',
          notes: 'Follow-up after recent tests'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const today = new Date();
    const appointmentDate = new Date(appointment.date);

    switch (filter) {
      case 'upcoming':
        return appointmentDate >= today;
      case 'past':
        return appointmentDate < today;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your medical appointments</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <MdAdd size={20} />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: 'all', label: 'All Appointments' },
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'past', label: 'Past' }
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

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{appointment.type}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MdCalendarToday size={16} />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MdAccessTime size={16} />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <MdPerson className="text-gray-400" size={18} />
                  <span className="text-gray-700">{appointment.doctor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MdLocationOn className="text-gray-400" size={18} />
                  <span className="text-gray-700">{appointment.location}</span>
                </div>
              </div>

              {appointment.notes && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700">{appointment.notes}</p>
                </div>
              )}

              <div className="flex space-x-3">
                {appointment.status === 'scheduled' && (
                  <>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Reschedule
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Cancel
                    </button>
                  </>
                )}
                {appointment.status === 'completed' && (
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Report
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdCalendarToday className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter === 'upcoming' ? 'No upcoming appointments' :
             filter === 'past' ? 'No past appointments' :
             'No appointments yet'}
          </h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all' ? 'Book your first appointment to get started' :
             'Check back later for new appointments'}
          </p>
          {filter === 'all' && (
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Book Your First Appointment
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CitizenAppointments;