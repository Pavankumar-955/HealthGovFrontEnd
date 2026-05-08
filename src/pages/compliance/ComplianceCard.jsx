import React from 'react'
import { CheckCircleIcon, ExclamationTriangleIcon, ClockIcon, DocumentIcon, FolderIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

const ComplianceCard = ({ summary, records }) => {
  if (!summary || !records) {
    return <div>Loading...</div>
  }

  const getResultColor = (result) => {
    switch (result) {
      case 'NON_COMPLIANT':
        return 'bg-orange-500'
      case 'UNDER_REVIEW':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'PROGRAM':
        return <FolderIcon className="h-6 w-6" />
      case 'PROJECT':
        return <DocumentIcon className="h-6 w-6" />
      case 'GRANT':
        return <CurrencyDollarIcon className="h-6 w-6" />
      default:
        return <DocumentIcon className="h-6 w-6" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Summary Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl bg-green-500/20 p-6 shadow-lg shadow-slate-950/20 border border-green-500/30">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="h-8 w-8 text-green-400" />
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-green-400">Total Records</p>
              <p className="mt-1 text-2xl font-semibold text-white">{summary.totalRecords}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-orange-500/20 p-6 shadow-lg shadow-slate-950/20 border border-orange-500/30">
          <div className="flex items-center gap-3">
            <ExclamationTriangleIcon className="h-8 w-8 text-orange-400" />
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-orange-400">Non Compliant</p>
              <p className="mt-1 text-2xl font-semibold text-white">{summary.byResult.NON_COMPLIANT || 0}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-yellow-500/20 p-6 shadow-lg shadow-slate-950/20 border border-yellow-500/30">
          <div className="flex items-center gap-3">
            <ClockIcon className="h-8 w-8 text-yellow-400" />
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">Under Review</p>
              <p className="mt-1 text-2xl font-semibold text-white">{summary.byResult.UNDER_REVIEW || 0}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-blue-500/20 p-6 shadow-lg shadow-slate-950/20 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <FolderIcon className="h-8 w-8 text-blue-400" />
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-blue-400">Programs</p>
              <p className="mt-1 text-2xl font-semibold text-white">{summary.byType.PROGRAM || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Records */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Compliance Records</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {records.map((record) => (
            <div key={record.complianceId} className="rounded-3xl bg-slate-800/80 p-6 shadow-lg shadow-slate-950/20 border border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getTypeIcon(record.type)}
                  <span className="text-sm uppercase tracking-[0.2em] text-slate-400">{record.type}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getResultColor(record.result)} text-white`}>
                  {record.result.replace('_', ' ')}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{record.entity.title || `ID: ${record.entityId}`}</h3>
              <p className="text-sm text-slate-300 mb-3">{record.entity.description}</p>
              <div className="space-y-2 text-sm">
                <p className="text-slate-400"><strong>Date:</strong> {record.date}</p>
                <p className="text-slate-400"><strong>Notes:</strong> {record.notes}</p>
                {record.entity.budget && <p className="text-slate-400"><strong>Budget:</strong> ${record.entity.budget.toLocaleString()}</p>}
                {record.entity.startDate && <p className="text-slate-400"><strong>Start:</strong> {record.entity.startDate}</p>}
                {record.entity.endDate && <p className="text-slate-400"><strong>End:</strong> {record.entity.endDate}</p>}
                {record.entity.status && <p className="text-slate-400"><strong>Status:</strong> {record.entity.status}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ComplianceCard