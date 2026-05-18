const ComplianceList = ({ complianceRecords = [], handleSelectRecord }) => {

  const getResultTagColor = (result) => {
    switch (result) {
      case 'NON_COMPLIANT':
        return 'bg-orange-100 text-orange-800'
      case 'UNDER_REVIEW':
        return 'bg-yellow-100 text-yellow-800'
      case 'COMPLIANT':
        return 'bg-green-100 text-green-800'
      case 'PARTIALLY_COMPLIANT':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Compliance Records</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center">
          <thead className="text-xs uppercase tracking-[0.2em] text-gray-500 bg-gray-50">
            <tr>
              <th className="px-6 py-3">Compliance ID</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Entity ID</th>
              <th className="px-6 py-3">Result</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complianceRecords.map((record) => (
              <tr key={record.complianceId} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{record.complianceId}</td>

                <td className="px-6 py-4 text-gray-700">{record.type}</td>
                <td className="px-6 py-4 text-gray-700">{record.entityId}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getResultTagColor(record.result)}`}>
                    {record.result.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{record.date}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleSelectRecord(record)}
                    className="text-green-600 hover:text-green-800 font-semibold"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceList;