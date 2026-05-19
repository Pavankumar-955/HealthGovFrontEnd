import { useState } from 'react'

const programs = [
  {
    id: 1,
    name: 'Ayushman Bharat',
    status: 'Ongoing',
    category: 'Health Insurance',
    description: 'World\'s largest health insurance scheme providing coverage up to 5 lakhs per family per year.',
    icon: '🏥',
    beneficiaries: '12 Crore+',
    coverage: '₹5,00,000',
    launchDate: 'Sept 2018',
    reach: '28 States & UTs',
    details: {
      objective: 'Provide universal healthcare coverage to vulnerable populations',
      keyBenefits: [
        'Free hospitalization',
        'Free medicines and diagnostics',
        'Cashless treatment',
        'Coverage for 1,350+ procedures',
      ],
      eligibility: 'Based on SECC data and occupational criteria',
    },
  },
  {
    id: 2,
    name: 'National Health Mission',
    status: 'Ongoing',
    category: 'Healthcare Delivery',
    description: 'Strengthens primary health care infrastructure and digital access across India.',
    icon: '🏢',
    beneficiaries: '50+ Crore',
    coverage: 'Pan-India',
    launchDate: 'May 2005',
    reach: '28 States & UTs',
    details: {
      objective: 'Strengthen healthcare delivery system at all levels',
      keyBenefits: [
        'Improved health infrastructure',
        'Trained health workers',
        'Maternal and child health focus',
        'Disease prevention programs',
      ],
      eligibility: 'All citizens across all states',
    },
  },
  {
    id: 3,
    name: 'PMJAY - Ayushman Health Account',
    status: 'Ongoing',
    category: 'Digital Health',
    description: 'Digital health ID system providing secure access to medical records and telemedicine.',
    icon: '📱',
    beneficiaries: '25 Crore+',
    coverage: 'Digital Records',
    launchDate: 'Oct 2021',
    reach: 'Pan-India',
    details: {
      objective: 'Create unique health identifiers for integrated health record management',
      keyBenefits: [
        'Lifelong health records',
        'Seamless data sharing',
        'Telemedicine access',
        'Prescription management',
      ],
      eligibility: 'All Indian citizens',
    },
  },
  {
    id: 4,
    name: 'Reproductive & Child Health Program',
    status: 'Ongoing',
    category: 'Maternal & Child Health',
    description: 'Comprehensive program focusing on maternal health, immunization, and nutrition.',
    icon: '👶',
    beneficiaries: '5 Crore+ Mothers',
    coverage: 'Free Services',
    launchDate: 'Ongoing since 1997',
    reach: 'All States',
    details: {
      objective: 'Reduce maternal and infant mortality rates',
      keyBenefits: [
        'Antenatal checkups',
        'Immunization programs',
        'Nutrition support',
        'Postnatal care',
      ],
      eligibility: 'Pregnant women and children',
    },
  },
  {
    id: 5,
    name: 'National Mental Health Program',
    status: 'Ongoing',
    category: 'Mental Health',
    description: 'Integrated mental health services including counseling, therapy, and psychiatric care.',
    icon: '🧠',
    beneficiaries: '2 Crore+',
    coverage: 'Mental Health Services',
    launchDate: 'Nov 1982',
    reach: 'All States & UTs',
    details: {
      objective: 'Ensure availability and accessibility of minimum mental health care',
      keyBenefits: [
        'Free counseling',
        'Psychiatric consultation',
        'Suicide prevention',
        'Rehabilitation services',
      ],
      eligibility: 'All citizens requiring mental health support',
    },
  },
  {
    id: 6,
    name: 'Integrated Disease Surveillance Program',
    status: 'Ongoing',
    category: 'Disease Control',
    description: 'Real-time monitoring and control of communicable diseases across India.',
    icon: '🦠',
    beneficiaries: '135 Crore',
    coverage: 'Disease Monitoring',
    launchDate: 'Jan 1997',
    reach: 'National Network',
    details: {
      objective: 'Monitor and control disease outbreaks',
      keyBenefits: [
        'Early warning systems',
        'Rapid response teams',
        'Vaccination programs',
        'Data analytics',
      ],
      eligibility: 'All populations',
    },
  },
  {
    id: 7,
    name: 'National Cancer Control Program',
    status: 'Upcoming',
    category: 'Cancer Care',
    description: 'Comprehensive cancer prevention, screening, and treatment program launching soon.',
    icon: '🎗️',
    beneficiaries: 'Expected 5 Crore',
    coverage: 'Cancer Services',
    launchDate: 'June 2026',
    reach: 'Pan-India (planned)',
    details: {
      objective: 'Reduce cancer burden through prevention and early detection',
      keyBenefits: [
        'Free screening camps',
        'Treatment subsidies',
        'Support groups',
        'Palliative care',
      ],
      eligibility: 'To be announced',
    },
  },
  {
    id: 8,
    name: 'Digital Wellness Centers',
    status: 'Upcoming',
    category: 'Digital Health',
    description: 'Community-based digital health hubs providing services and telemedicine facilities.',
    icon: '💻',
    beneficiaries: 'Expected 10 Crore+',
    coverage: 'Community Access',
    launchDate: 'July 2026',
    reach: 'Metro & Tier 2 cities',
    details: {
      objective: 'Bring digital healthcare closer to communities',
      keyBenefits: [
        'Telemedicine kiosks',
        'Health screening',
        'Digital literacy',
        'Health records access',
      ],
      eligibility: 'To be announced',
    },
  },
]

const programStats = [
  {
    label: 'Active Programs',
    value: '6',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    label: 'Upcoming Programs',
    value: '2',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    label: 'Total Beneficiaries',
    value: '135 Cr+',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    label: 'Coverage',
    value: 'Pan-India',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
]

export default function Program() {
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')

  const filteredPrograms = filterStatus === 'All'
    ? programs
    : programs.filter(prog => prog.status === filterStatus)

  const statusStyles = {
    'Ongoing': 'bg-emerald-100 text-emerald-800 border border-emerald-300',
    'Upcoming': 'bg-blue-100 text-blue-800 border border-blue-300',
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen w-full">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 mb-6">
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Health Programs</span>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-6">HealthGov Programs</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive government health programs designed to provide universal healthcare coverage, preventive care, and digital health services to all citizens.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programStats.map((stat) => (
              <div key={stat.label} className={`rounded-3xl ${stat.bgColor} p-6 shadow-sm`}>
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-widest">{stat.label}</p>
                <p className={`mt-3 text-4xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setFilterStatus('All')}
              className={`rounded-full px-6 py-2 font-semibold transition ${
                filterStatus === 'All'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-500'
              }`}
            >
              All Programs ({programs.length})
            </button>
            <button
              onClick={() => setFilterStatus('Ongoing')}
              className={`rounded-full px-6 py-2 font-semibold transition ${
                filterStatus === 'Ongoing'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-500'
              }`}
            >
              Ongoing ({programs.filter(p => p.status === 'Ongoing').length})
            </button>
            <button
              onClick={() => setFilterStatus('Upcoming')}
              className={`rounded-full px-6 py-2 font-semibold transition ${
                filterStatus === 'Upcoming'
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-500'
              }`}
            >
              Upcoming ({programs.filter(p => p.status === 'Upcoming').length})
            </button>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                onClick={() => setSelectedProgram(selectedProgram?.id === program.id ? null : program)}
                className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg hover:border-emerald-300"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-5xl">{program.icon}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[program.status]}`}>
                    {program.status}
                  </span>
                </div>

                {/* Title & Category */}
                <h3 className="mb-2 text-xl font-bold text-slate-900">{program.name}</h3>
                <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {program.category}
                </p>

                {/* Description */}
                <p className="mb-4 text-sm text-slate-600">{program.description}</p>

                {/* Key Metrics */}
                <div className="mb-4 grid gap-2 rounded-2xl bg-slate-50 p-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">Beneficiaries</span>
                    <span className="font-semibold text-slate-900">{program.beneficiaries}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">Launch</span>
                    <span className="font-semibold text-slate-900">{program.launchDate}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">Reach</span>
                    <span className="font-semibold text-slate-900">{program.reach}</span>
                  </div>
                </div>

                {/* Expand Button */}
                <button className="w-full rounded-full border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
                  {selectedProgram?.id === program.id ? 'Show Less' : 'Learn More'}
                </button>

                {/* Expanded Details */}
                {selectedProgram?.id === program.id && (
                  <div className="mt-6 space-y-4 border-t border-slate-200 pt-6">
                    <div>
                      <h4 className="mb-2 font-bold text-slate-900">Objective</h4>
                      <p className="text-sm text-slate-600">{program.details.objective}</p>
                    </div>

                    <div>
                      <h4 className="mb-3 font-bold text-slate-900">Key Benefits</h4>
                      <ul className="space-y-2">
                        {program.details.keyBenefits.map((benefit, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-slate-600">
                            <span className="text-emerald-600 font-bold">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2 font-bold text-slate-900">Eligibility</h4>
                      <p className="text-sm text-slate-600">{program.details.eligibility}</p>
                    </div>

                    <button className="w-full rounded-full bg-emerald-700 px-4 py-2 font-semibold text-white transition hover:bg-emerald-800">
                      Check Eligibility
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">Program Categories</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Health Insurance',
                icon: '💳',
                programs: 'Ayushman Bharat, PMJAY',
                description: 'Insurance schemes providing financial protection',
              },
              {
                name: 'Healthcare Delivery',
                icon: '🏥',
                programs: 'National Health Mission',
                description: 'Infrastructure & service delivery systems',
              },
              {
                name: 'Digital Health',
                icon: '📱',
                programs: 'Health ID, Digital Centers',
                description: 'Technology-driven healthcare solutions',
              },
              {
                name: 'Maternal & Child Health',
                icon: '👶',
                programs: 'RCH Program, ICDS',
                description: 'Programs focused on mothers & children',
              },
              {
                name: 'Disease Control',
                icon: '🦠',
                programs: 'IDSP, Vaccination',
                description: 'Prevention & control of diseases',
              },
              {
                name: 'Mental Health',
                icon: '🧠',
                programs: 'NMHP, Counseling',
                description: 'Mental wellness & psychiatric support',
              },
            ].map((cat, idx) => (
              <div key={idx} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm hover:shadow-lg transition">
                <div className="mb-4 text-4xl">{cat.icon}</div>
                <h3 className="mb-2 font-bold text-slate-900">{cat.name}</h3>
                <p className="mb-3 text-sm text-slate-600">{cat.description}</p>
                <p className="text-xs font-semibold text-emerald-700">{cat.programs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-slate-900">Ready to Explore Programs?</h2>
          <p className="mb-8 text-lg text-slate-600">
            Check your eligibility and enroll in the programs that suit your healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="rounded-full bg-emerald-700 px-8 py-3 font-semibold text-white transition hover:bg-emerald-800">
              Check Eligibility
            </button>
            <button className="rounded-full border-2 border-emerald-700 px-8 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50">
              View All Programs
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
