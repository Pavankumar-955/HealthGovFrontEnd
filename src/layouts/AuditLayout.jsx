import React from 'react'

const auditLinks = ["Dashboard", "Audits", "Reports", "Analytics"]
const auditModules = ["Program Review", "Compliance Review", "KPI Dashboard"]
const auditHighlights = [
  { name: "Audit cycles", value: 12 },
  { name: "Open findings", value: 5 },
  { name: "Reports ready", value: 3 },
]

const AuditLayout = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <section className="mx-auto max-w-6xl rounded-3xl bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
        <header className="mb-10 space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-400/80">Audit Portal</p>
          <h1 className="text-4xl font-semibold text-white">Government Auditor Workspace</h1>
          <p className="max-w-3xl text-slate-300">
            Access audit summaries, review programs, and generate analytics for governance and compliance oversight.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-300">
            {auditLinks.map((item) => (
              <span key={item} className="rounded-full border border-slate-700 px-3 py-2 bg-slate-800/70">
                {item}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {auditHighlights.map((item) => (
                <div key={item.name} className="rounded-3xl bg-slate-800/80 p-6 shadow-lg shadow-slate-950/20">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{item.name}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-slate-800/80 p-8 shadow-lg shadow-slate-950/20">
              <h2 className="text-2xl font-semibold text-white">Audit focus</h2>
              <p className="mt-3 text-slate-300 leading-7">
                Review program performance, confirm compliance controls, and use analytics to identify risks and improvement areas.
              </p>
              <ul className="mt-5 space-y-3 text-slate-200">
                <li>• Validate audit evidence and risk scoring metrics.</li>
                <li>• Review program outcomes and performance benchmarks.</li>
                <li>• Share findings with stakeholders and regulators.</li>
              </ul>
            </div>
          </div>

          <aside className="space-y-6 rounded-3xl bg-slate-800/80 p-8 shadow-lg shadow-slate-950/20">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-400/80">Audit Modules</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Current review tools</h2>
            </div>
            <div className="space-y-4">
              {auditModules.map((module) => (
                <div key={module} className="rounded-3xl bg-slate-900/90 p-4 border border-slate-700">
                  <p className="text-base font-semibold text-white">{module}</p>
                  <p className="mt-2 text-slate-400 text-sm">Track the latest insights for each audit and review area.</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default AuditLayout