import { useState } from 'react'

const researchAreas = [
  {
    id: 1,
    title: 'Digital Health Integration',
    description: 'Researching seamless digital health record systems and interoperability standards across Indian healthcare providers.',
    icon: '📱',
    status: 'Active',
    progress: 75,
    team: 'Dr. Sharma, Dr. Patel',
  },
  {
    id: 2,
    title: 'Telemedicine Effectiveness',
    description: 'Studying the impact and effectiveness of telemedicine services in rural and urban healthcare delivery.',
    icon: '🏥',
    status: 'Active',
    progress: 60,
    team: 'Dr. Gupta, Dr. Kumar',
  },
  {
    id: 3,
    title: 'Health Data Analytics',
    description: 'Advanced analytics on national health trends, disease patterns, and public health interventions.',
    icon: '📊',
    status: 'In Progress',
    progress: 45,
    team: 'Dr. Singh, Dr. Verma',
  },
  {
    id: 4,
    title: 'Ayushman Bharat Outcomes',
    description: 'Long-term outcome studies measuring the impact of Ayushman Bharat scheme on beneficiaries.',
    icon: '⚕️',
    status: 'Active',
    progress: 80,
    team: 'Dr. Desai, Dr. Nair',
  },
  {
    id: 5,
    title: 'Preventive Care Models',
    description: 'Developing and testing innovative community-based preventive care and wellness models.',
    icon: '💚',
    status: 'Planning',
    progress: 20,
    team: 'Dr. Iyer, Dr. Reddy',
  },
  {
    id: 6,
    title: 'Health System Resilience',
    description: 'Analyzing healthcare system resilience and disaster preparedness across Indian regions.',
    icon: '🛡️',
    status: 'Active',
    progress: 55,
    team: 'Dr. Chopra, Dr. Bhat',
  },
]

const researchStats = [
  {
    label: 'Active Projects',
    value: '12',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    label: 'Research Papers Published',
    value: '28',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
  {
    label: 'Research Institutions',
    value: '15+',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    label: 'Data Points Analyzed',
    value: '5M+',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
]

export default function Research() {
  const [selectedArea, setSelectedArea] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')

  const filteredAreas = filterStatus === 'All' 
    ? researchAreas 
    : researchAreas.filter(area => area.status === filterStatus)

  const statusColors = {
    'Active': 'bg-emerald-100 text-emerald-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Planning': 'bg-blue-100 text-blue-800',
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen w-full py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 space-y-4">
          <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Research & Innovation</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">HealthGov Research Initiatives</h1>
          <p className="max-w-3xl text-lg text-slate-600">
            Advancing healthcare through evidence-based research, data analytics, and innovative solutions for the Indian healthcare ecosystem.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {researchStats.map((stat) => (
            <div key={stat.label} className={`rounded-3xl ${stat.bgColor} p-6 shadow-sm`}>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-widest">{stat.label}</p>
              <p className={`mt-3 text-4xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filter Section */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setFilterStatus('All')}
            className={`rounded-full px-6 py-2 font-semibold transition ${
              filterStatus === 'All'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-500'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilterStatus('Active')}
            className={`rounded-full px-6 py-2 font-semibold transition ${
              filterStatus === 'Active'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-500'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterStatus('In Progress')}
            className={`rounded-full px-6 py-2 font-semibold transition ${
              filterStatus === 'In Progress'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-500'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilterStatus('Planning')}
            className={`rounded-full px-6 py-2 font-semibold transition ${
              filterStatus === 'Planning'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-500'
            }`}
          >
            Planning
          </button>
        </div>

        {/* Research Areas Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAreas.map((area) => (
            <div
              key={area.id}
              onClick={() => setSelectedArea(selectedArea?.id === area.id ? null : area)}
              className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg hover:border-emerald-300"
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="text-4xl">{area.icon}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[area.status]}`}>
                  {area.status}
                </span>
              </div>

              <h3 className="mb-2 text-xl font-bold text-slate-900">{area.title}</h3>
              <p className="mb-4 text-sm text-slate-600">{area.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">Progress</span>
                  <span className="text-xs font-bold text-emerald-600">{area.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                    style={{ width: `${area.progress}%` }}
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs font-semibold text-slate-600">Research Team</p>
                <p className="mt-2 text-sm text-slate-700">{area.team}</p>
              </div>

              {/* Expanded Details */}
              {selectedArea?.id === area.id && (
                <div className="mt-6 space-y-4 border-t border-slate-200 pt-6">
                  <div>
                    <h4 className="mb-2 font-semibold text-slate-900">Research Focus</h4>
                    <p className="text-sm text-slate-600">
                      This initiative focuses on {area.title.toLowerCase()} to improve healthcare delivery and outcomes across India.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-slate-900">Key Objectives</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Develop evidence-based solutions</li>
                      <li>• Improve healthcare accessibility</li>
                      <li>• Enhance system efficiency</li>
                    </ul>
                  </div>
                  <button className="w-full rounded-full bg-emerald-700 px-4 py-2 font-semibold text-white transition hover:bg-emerald-800">
                    View Detailed Report
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-emerald-50 to-cyan-50 p-8 sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Contribute to HealthGov Research</h2>
            <p className="mb-8 text-slate-600">
              Join our research initiatives and help advance healthcare innovation. We welcome partnerships from institutions, researchers, and healthcare professionals.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button className="rounded-full bg-emerald-700 px-8 py-3 font-semibold text-white transition hover:bg-emerald-800">
                Become a Research Partner
              </button>
              <button className="rounded-full border-2 border-emerald-700 px-8 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50">
                Download Research Reports
              </button>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-4 text-4xl">📚</div>
            <h3 className="mb-2 font-bold text-slate-900">Research Papers</h3>
            <p className="mb-4 text-sm text-slate-600">Access published research papers and findings from HealthGov studies.</p>
            <button className="text-sm font-semibold text-emerald-700 hover:underline">Explore Publications →</button>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-4 text-4xl">🔬</div>
            <h3 className="mb-2 font-bold text-slate-900">Data Repository</h3>
            <p className="mb-4 text-sm text-slate-600">Access anonymized health data for research and analysis purposes.</p>
            <button className="text-sm font-semibold text-emerald-700 hover:underline">Access Data →</button>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-4 text-4xl">🤝</div>
            <h3 className="mb-2 font-bold text-slate-900">Collaborations</h3>
            <p className="mb-4 text-sm text-slate-600">Collaborate with leading health institutions and research centers.</p>
            <button className="text-sm font-semibold text-emerald-700 hover:underline">Learn More →</button>
          </div>
        </div>
      </div>
    </main>
  )
}
