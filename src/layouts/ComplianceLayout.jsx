import { useState, useEffect } from 'react'
import ComplianceCard from "../pages/compliance/ComplianceCard"
import Dashboard from "../pages/compliance/Dasboard"

const complianceModules = [
  "Compliance Monitoring",
  "Issue Tracking",
  "Audit Logs",
];

const complianceLinks = [
  "Dashboard",
  "Compliance Records",
  "Audits",
  "Reports",
];

export default function ComplianceLayout() {
  const [summary, setSummary] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Mock API data - replace with actual fetch
    const mockSummary = {
      totalRecords: 8,
      byResult: {
        NON_COMPLIANT: 2,
        UNDER_REVIEW: 6
      },
      byType: {
        PROGRAM: 5,
        PROJECT: 2,
        GRANT: 1
      }
    };

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
      // Add more records as needed
    ];

    setSummary(mockSummary);
    setRecords(mockRecords);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 px-6 py-12">
      
        <div className="space-y-6">
          <Dashboard />
        </div>
    </main>
  )
}
