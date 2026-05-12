const AuditList = ({ audits = [], handleSelectAudit }) => {

  // ✅ STATUS COLOR FUNCTION
  const getStatusColor = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'IN_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'FOLLOW_UP_REQUIRED':
        return 'bg-orange-100 text-orange-800';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // ✅ SCOPE COLOR FUNCTION
  const getScopeColor = (scope) => {
    const type = scope.split(":")[0];

    switch (type) {
      case 'PROGRAM':
        return 'bg-blue-100 text-blue-800';
      case 'PROJECT':
        return 'bg-green-100 text-green-800';
      case 'GRANT':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg border border-gray-200">

      {/* ✅ HEADER */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Audit Records
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center">

          {/* ✅ TABLE HEAD */}
          <thead className="text-xs uppercase tracking-[0.2em] text-gray-500 bg-gray-50">
            <tr>
              <th className="px-6 py-3">Audit ID</th>
              <th className="px-6 py-3">Scope</th>
              <th className="px-6 py-3">Officer</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          {/* ✅ TABLE BODY */}
          <tbody>
            {audits.length > 0 ? (
              audits.map((audit) => (
                <tr
                  key={audit.auditId}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* ✅ Audit ID */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {audit.auditId}
                  </td>

                  {/* ✅ Scope with Color */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getScopeColor(audit.scope)}`}
                    >
                      {audit.scope}
                    </span>
                  </td>

                  {/* ✅ Officer */}
                  <td className="px-6 py-4 text-gray-700">
                    {audit.officer?.name}
                  </td>

                  {/* ✅ Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(audit.status)}`}
                    >
                      {audit.status.replaceAll("_", " ")}
                    </span>
                  </td>

                  {/* ✅ Date */}
                  <td className="px-6 py-4 text-gray-700">
                    {audit.date}
                  </td>

                  {/* ✅ Action */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleSelectAudit(audit)}
                      className="text-green-600 hover:text-green-800 font-semibold"
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-6 text-gray-500">
                  No audit records found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AuditList;
