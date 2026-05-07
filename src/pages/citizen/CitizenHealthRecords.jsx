import { useState, useEffect } from 'react';
import { MdAdd, MdVisibility, MdEdit, MdDelete } from 'react-icons/md';

const CitizenHealthRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecords([
        {
          id: 1,
          type: 'Blood Test',
          date: '2024-01-15',
          doctor: 'Dr. Smith',
          status: 'Normal',
          description: 'Complete blood count - all parameters within normal range'
        },
        {
          id: 2,
          type: 'X-Ray',
          date: '2024-01-10',
          doctor: 'Dr. Johnson',
          status: 'Review Required',
          description: 'Chest X-ray - minor abnormalities detected'
        },
        {
          id: 3,
          type: 'Vaccination',
          date: '2024-01-05',
          doctor: 'Dr. Williams',
          status: 'Completed',
          description: 'COVID-19 booster vaccination administered'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'Review Required':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Records</h1>
          <p className="text-gray-600 mt-1">View and manage your medical records</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <MdAdd size={20} />
          <span>Add Record</span>
        </button>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((record) => (
          <div key={record.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{record.type}</h3>
                  <p className="text-sm text-gray-600">{record.date}</p>
                </div>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Doctor:</span> {record.doctor}
                </p>
                <p className="text-sm text-gray-700">{record.description}</p>
              </div>

              <div className="flex space-x-2">
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                  <MdVisibility size={16} />
                  <span>View Details</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm font-medium">
                  <MdEdit size={16} />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {records.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdAdd className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No health records yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first health record</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Record
          </button>
        </div>
      )}

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Add Health Record</h2>
            <p className="text-gray-600 mb-4">
              This feature would integrate with your healthcare provider's system.
              For now, please contact your healthcare provider to add new records.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenHealthRecords;