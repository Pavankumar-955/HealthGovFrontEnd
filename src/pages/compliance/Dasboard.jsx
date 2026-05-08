import React, { useState, useEffect } from 'react'
import { PencilIcon, XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, ClockIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const mockSummary = {
  totalRecords: 8,
  byResult: {
    COMPLIANT: 0,
    PARTIALLY_COMPLIANT: 0,
    NON_COMPLIANT: 2,
    UNDER_REVIEW: 6
  },
  byType: {
    PROGRAM: 5,
    PROJECT: 2,
    GRANT: 1
  }
}

const mockRecords = [
  {
    complianceId: 1,
    date: "2026-04-28",
    entity: {
      budget: 50000000,
      description: "A government initiative focused on improving rural healthcare facilities.",
      endDate: "2026-12-31",
      managerId: 4,
      programId: 1,
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
    notes: "Compliance created for Program: National Vaccination Drive xyz [ 2 ]",
    entity: {
      budget: 50000000,
      description: "A government initiative focused on improving rural healthcare facilities.",
      endDate: "2026-12-31",
      managerId: 4,
      programId: 2,
      startDate: "2026-04-25",
      status: "ACTIVE",
      title: "National Vaccination Drive xyz"
    },
    entityId: 2,
    result: "UNDER_REVIEW",
    type: "PROGRAM"
  },
  {
    complianceId: 3,
    date: "2026-04-25",
    notes: "Compliance created for Program: National Vaccination Drive xyz [ 3 ]",
    entity: {
      budget: 50000000,
      description: "A government initiative focused on improving rural healthcare facilities.",
      endDate: "2026-12-31",
      managerId: 16,
      programId: 3,
      startDate: "2026-04-25",
      status: "ACTIVE",
      title: "National Vaccination Drive xyz"
    },
    entityId: 3,
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
      researcherId: 3,
      startDate: "2026-05-01",
      status: "APPROVED",
      title: "MRI I"
    },
    entityId: 3,
    result: "UNDER_REVIEW",
    type: "PROJECT"
  },
  {
    complianceId: 5,
    date: "2026-04-25",
    entity: {
      amount: 250000.0,
      grantId: 2,
      projectId: 3,
      researcherId: 3,
      status: "APPROVED",
      title: "2:APPROVED"
    },
    entityId: 2,
    result: "COMPLIANT",
    type: "GRANT"
  },
  {
    complianceId: 6,
    date: "2026-04-25",
    entity: {
      description: "Research project focused on developing advanced immunotherapy treatments for cancer patients.",
      endDate: "2027-04-30",
      projectId: 4,
      researcherId: 3,
      startDate: "2026-05-01",
      status: "PENDING",
      title: "MRI I"
    },
    entityId: 4,
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
      managerId: 16,
      programId: 5,
      startDate: "2026-04-25",
      status: "ACTIVE",
      title: " xyz"
    },
    entityId: 5,
    result: "PARTIALLY_COMPLIANT",
    type: "PROGRAM"
  },
  {
    complianceId: 8,
    date: "2026-04-28",
    entity: {
      budget: 50000000,
      description: "A government initiative focused on improving rural healthcare facilities.",
      endDate: "2026-12-31",
      managerId: null,
      programId: 6,
      startDate: "2026-04-28",
      status: "ACTIVE",
      title: " xyz"
    },
    entityId: 6,
    result: "PARTIALLY_COMPLIANT",
    type: "PROGRAM"
  }
]

const Dashboard = () => {
  const [summary, setSummary] = useState(mockSummary)
  const [records, setRecords] = useState([])
  const [filteredRecords, setFilteredRecords] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(null)

  useEffect(() => {
    setRecords(mockRecords)
    setFilteredRecords(mockRecords)
  }, [])

  useEffect(() => {
    const filtered = records.filter(record =>
      record.complianceId.toString().includes(searchTerm.toLowerCase()) ||
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.result.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.entity.title && record.entity.title.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    const filteredWithAdvanced = filtered.filter(record => {
      const matchesStatus = statusFilter === 'ALL' || record.result === statusFilter
      const matchesType = typeFilter === 'ALL' || record.type === typeFilter
      const recordDate = new Date(record.date)
      const fromDateObj = dateFrom ? new Date(dateFrom) : null
      const toDateObj = dateTo ? new Date(dateTo) : null
      const matchesFrom = !fromDateObj || recordDate >= fromDateObj
      const matchesTo = !toDateObj || recordDate <= toDateObj
      return matchesStatus && matchesType && matchesFrom && matchesTo
    })
    setFilteredRecords(filteredWithAdvanced)
  }, [searchTerm, records, statusFilter, typeFilter, dateFrom, dateTo])

  const getResultColor = (result) => {
    switch (result) {
      case 'NON_COMPLIANT':
        return 'text-orange-400'
      case 'UNDER_REVIEW':
        return 'text-yellow-400'
      case 'COMPLIANT':
        return 'text-green-400'
      case 'PARTIALLY_COMPLIANT':
        return 'text-blue-400'
      default:
        return 'text-gray-400'
    }
  }

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

  const handleSelectRecord = (record) => {
    setSelectedRecord(record)
    setIsEditing(false)
    setEditData(null)
    setIsModalOpen(true)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditData({ ...selectedRecord })
  }

  const handleSaveEdit = () => {
    setRecords(records.map(r => r.complianceId === editData.complianceId ? editData : r))
    setSelectedRecord(editData)
    setIsEditing(false)
    setEditData(null)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditData(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRecord(null)
    setIsEditing(false)
    setEditData(null)
  }

  const handleEditChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setEditData({
        ...editData,
        [parent]: {
          ...editData[parent],
          [child]: value
        }
      })
    } else {
      setEditData({ ...editData, [field]: value })
    }
  }

  return (
  <div className="space-y-6">

    {/* ✅ DASHBOARD CARDS - CLEAN SINGLE ROW */}
    <div className="flex gap-4 overflow-x-auto pb-2">

      <div className="min-w-[200px] flex-1 bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-green-700 uppercase">
          Total Records
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {summary.totalRecords}
        </p>
      </div>

      <div className="min-w-[200px] flex-1 bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-green-700 uppercase">
          Compliant
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {summary.byResult.COMPLIANT}
        </p>
      </div>

      <div className="min-w-[200px] flex-1 bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-blue-700 uppercase">
          Partially Compliant
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {summary.byResult.PARTIALLY_COMPLIANT}
        </p>
      </div>

      <div className="min-w-[200px] flex-1 bg-orange-50 border border-orange-200 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-orange-700 uppercase">
          Non Compliant
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {summary.byResult.NON_COMPLIANT}
        </p>
      </div>

      <div className="min-w-[200px] flex-1 bg-yellow-50 border border-yellow-200 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-yellow-700 uppercase">
          Under Review
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {summary.byResult.UNDER_REVIEW}
        </p>
      </div>

    </div>

    {/* ✅ SEARCH + FILTER BAR (PRODUCTION SINGLE LINE) */}
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <div className="flex items-center gap-4 overflow-x-auto">

        {/* SEARCH */}
      <div className="relative min-w-[260px] flex-1">


  {/* INPUT */}
 <div className="flex items-center gap-3 min-w-[260px] flex-1 px-3 py-2 ">

  {/* ICON */}
  <MagnifyingGlassIcon className="h-8 w-8 text-gray-400" />

  {/* INPUT */}
  <input
    type="text"
    placeholder="Search compliance records..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-100"
  />

</div>

</div>


        {/* STATUS */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="min-w-[170px] px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-100"
        >
          <option value="ALL">All Status</option>
          <option value="COMPLIANT">Compliant</option>
          <option value="PARTIALLY_COMPLIANT">Partial</option>
          <option value="NON_COMPLIANT">Non Compliant</option>
          <option value="UNDER_REVIEW">Review</option>
        </select>

        {/* TYPE */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="min-w-[170px] px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-100"
        >
          <option value="ALL">All Types</option>
          <option value="PROGRAM">Program</option>
          <option value="PROJECT">Project</option>
          <option value="GRANT">Grant</option>
        </select>

        {/* FROM */}
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="min-w-[150px] px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-100"
        />

        {/* TO */}
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="min-w-[150px] px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-100"
        />

        {/* CLEAR BUTTON */}
        <button
          onClick={() => {
            setStatusFilter('ALL')
            setTypeFilter('ALL')
            setDateFrom('')
            setDateTo('')
          }}
          className="min-w-[140px] bg-green-600 text-white px-5 py-2.5 text-sm font-semibold rounded-lg hover:bg-green-100 transition"
        >
          Clear
        </button>

      </div>
    </div>

    {/* ✅ TABLE */}
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
              {filteredRecords.map((record) => (
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

      {/* Modal */}
{isModalOpen && selectedRecord && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    
    <div className="bg-green-50 border border-green-200 rounded-3xl p-8 max-w-3xl w-full shadow-xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-green-900">
          Compliance Record Details
        </h2>

        <div className="flex items-center gap-2">
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition"
            >
              <PencilIcon className="h-4 w-4" />
              Edit
            </button>
          )}

          <button
            onClick={handleCloseModal}
            className="h-10 w-10 rounded-full bg-white hover:bg-green-100 flex items-center justify-center transition"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ✅ VIEW MODE */}
      {!isEditing && (
        <>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Compliance ID</p>
              <p className="font-semibold">{selectedRecord.complianceId}</p>
            </div>

            <div>
              <p className="text-gray-500">Result</p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getResultTagColor(
                  selectedRecord.result
                )}`}
              >
                {selectedRecord.result.replace("_", " ")}
              </span>
            </div>

            <div>
              <p className="text-gray-500">Type</p>
              <p>{selectedRecord.type}</p>
            </div>

            <div>
              <p className="text-gray-500">Date</p>
              <p>{selectedRecord.date}</p>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-4">
            <p className="text-gray-500 text-sm">Notes</p>
            <div className="bg-white p-3 rounded-lg border mt-1">
              {selectedRecord.notes || "No notes available"}
            </div>
          </div>

          {/* Entity */}
          <div className="mt-4 bg-white p-4 rounded-xl border">
            <p className="font-semibold mb-2 text-gray-700">Entity Details</p>
            <p><strong>Title:</strong> {selectedRecord.entity.title}</p>
            <p><strong>Description:</strong> {selectedRecord.entity.description}</p>
            <p><strong>Status:</strong> {selectedRecord.entity.status}</p>
          </div>
        </>
      )}

      {/* ✅ EDIT MODE */}
      {isEditing && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Compliance Result
            </label>
            <select
              value={editData.result}
              onChange={(e) => handleEditChange("result", e.target.value)}
              className="w-full rounded-xl bg-white border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
            >
              <option value="COMPLIANT">Compliant</option>
              <option value="PARTIALLY_COMPLIANT">Partially Compliant</option>
              <option value="NON_COMPLIANT">Non Compliant</option>
              <option value="UNDER_REVIEW">Under Review</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancelEdit}
              className="px-6 py-2 rounded-full bg-gray-400 text-white font-semibold hover:bg-gray-500 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveEdit}
              className="px-6 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
)}

  </div>
)
}

export default Dashboard
