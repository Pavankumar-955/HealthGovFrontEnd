import React, { useState, useEffect } from 'react'

const ComplianceList = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Mock API data - replace with actual fetch
    const mockRecords = [
      {
        complianceId: 1,
        date: "2026-04-28",
        entity: {
          budget: 50000000,
          description: "A government initiative focused on improving rural healthcare facilities.",
          endDate: "2026-12-31",
          enrollments: [],
          infrastructures: [],
          managerId: 4,
          programId: 1,
          resources: [],
          startDate: "2026-04-25",
          status: "ACTIVE",
          title: "National Vaccination Drive xyz"
        },
        entityId: 1,
        notes: "On-site inspection completed. All compliance requirements met.",
        result: "NON_COMPLIANT",
        type: "PROGRAM"
      },
      {
        complianceId: 2,
        date: "2026-04-25",
        entity: {
          budget: 50000000,
          description: "A government initiative focused on improving rural healthcare facilities.",
          endDate: "2026-12-31",
          enrollments: [],
          infrastructures: [],
          managerId: 4,
          programId: 2,
          resources: [],
          startDate: "2026-04-25",
          status: "ACTIVE",
          title: "National Vaccination Drive xyz"
        },
        entityId: 2,
        notes: "Compliance created for Program: National Vaccination Drive xyz [ 2 ]",
        result: "UNDER_REVIEW",
        type: "PROGRAM"
      },
      {
        complianceId: 3,
        date: "2026-04-25",
        entity: {
          budget: 50000000,
          description: "A government initiative focused on improving rural healthcare facilities.",
          endDate: "2026-12-31",
          enrollments: [],
          infrastructures: [],
          managerId: 16,
          programId: 3,
          resources: [],
          startDate: "2026-04-25",
          status: "ACTIVE",
          title: "National Vaccination Drive xyz"
        },
        entityId: 3,
        notes: "On-site inspection completed. All compliance requirements met.",
        result: "NON_COMPLIANT",
        type: "PROGRAM"
      },
      {
        complianceId: 4,
        date: "2026-04-25",
        entity: {
          description: "Research project focused on developing advanced immunotherapy treatments for cancer patients.",
          endDate: "2027-04-30",
          projectId: 3,
          reason: null,
          researcherId: 3,
          researcherName: null,
          startDate: "2026-05-01",
          status: "APPROVED",
          title: "MRI I"
        },
        entityId: 3,
        notes: "Compliance created for Project: MRI I [ 3 ]",
        result: "UNDER_REVIEW",
        type: "PROJECT"
      },
      {
        complianceId: 5,
        date: "2026-04-25",
        entity: {
          amount: 250000.0,
          grantId: 2,
          grantedAt: null,
          projectId: 3,
          researcherId: 3,
          status: "APPROVED",
          title: "2:APPROVED"
        },
        entityId: 2,
        notes: "Compliance created for Grant ID 2 (Project ID 3)",
        result: "UNDER_REVIEW",
        type: "GRANT"
      },
      {
        complianceId: 6,
        date: "2026-04-25",
        entity: {
          description: "Research project focused on developing advanced immunotherapy treatments for cancer patients.",
          endDate: "2027-04-30",
          projectId: 4,
          reason: null,
          researcherId: 3,
          researcherName: null,
          startDate: "2026-05-01",
          status: "PENDING",
          title: "MRI I"
        },
        entityId: 4,
        notes: "Compliance created for Project: MRI I [ 4 ]",
        result: "UNDER_REVIEW",
        type: "PROJECT"
      },
      {
        complianceId: 7,
        date: "2026-04-25",
        entity: {
          budget: 50000000,
          description: "A government initiative focused on improving rural healthcare facilities.",
          endDate: "2026-12-31",
          enrollments: [],
          infrastructures: [],
          managerId: 16,
          programId: 5,
          resources: [],
          startDate: "2026-04-25",
          status: "ACTIVE",
          title: " xyz"
        },
        entityId: 5,
        notes: "Compliance created for Program:  xyz [ 5 ]",
        result: "UNDER_REVIEW",
        type: "PROGRAM"
      },
      {
        complianceId: 8,
        date: "2026-04-28",
        entity: {
          budget: 50000000,
          description: "A government initiative focused on improving rural healthcare facilities.",
          endDate: "2026-12-31",
          enrollments: [],
          infrastructures: [],
          managerId: null,
          programId: 6,
          resources: [],
          startDate: "2026-04-28",
          status: "ACTIVE",
          title: " xyz"
        },
        entityId: 6,
        notes: "Compliance created for Program:  xyz [ 6 ]",
        result: "UNDER_REVIEW",
        type: "PROGRAM"
      }
    ];

    setRecords(mockRecords);
  }, []);

  if (records.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
        <section className="mx-auto max-w-6xl rounded-3xl bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
          <div className="rounded-3xl bg-slate-800/80 p-8 shadow-lg shadow-slate-950/20">
            <p className="text-slate-400">Loading compliance records...</p>
          </div>
        </section>
      </main>
    )
  }

  const getResultColor = (result) => {
    switch (result) {
      case 'NON_COMPLIANT':
        return 'text-orange-400'
      case 'UNDER_REVIEW':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <section className="mx-auto max-w-6xl rounded-3xl bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
        <div className="rounded-3xl bg-slate-800/80 p-8 shadow-lg shadow-slate-950/20">
          <h2 className="text-2xl font-semibold text-white mb-6">Compliance Records List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase tracking-[0.2em] text-slate-400 bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3">Compliance ID</th>
                  <th className="px-6 py-3">Result</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Entity ID</th>
                  <th className="px-6 py-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.complianceId} className="border-b border-slate-700 hover:bg-slate-900/30">
                    <td className="px-6 py-4 font-medium text-white">{record.complianceId}</td>
                    <td className={`px-6 py-4 font-semibold ${getResultColor(record.result)}`}>
                      {record.result.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 text-slate-300">{record.type}</td>
                    <td className="px-6 py-4 text-slate-300">{record.entityId}</td>
                    <td className="px-6 py-4 text-slate-300 max-w-xs truncate" title={record.notes}>
                      {record.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ComplianceList