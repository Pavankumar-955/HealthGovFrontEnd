import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

import { getAuditSummary } from '../../api/auditsAPI.js';

const AuditAnalytics = () => {

  const [summary, setSummary] = useState({
    totalAudits: 0,
    byStatus: {},
    byScopeType: {},
    byOfficer: {}
  });

  const [loading, setLoading] = useState(true);

  // ✅ FETCH DATA
  useEffect(() => {
    const loadSummary = async () => {
      try {
        setLoading(true);
        const res = await getAuditSummary();
        setSummary(res.data);
      } catch (err) {
        console.error("Error loading audit summary", err);
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, []);

  // ✅ STATUS COLORS
  const statusColorsMap = {
    SCHEDULED: "#3b82f6",
    IN_REVIEW: "#f59e0b",
    COMPLETED: "#10b981",
    FOLLOW_UP_REQUIRED: "#fb923c",
    CANCELLED: "#ef4444"
  };

  // ✅ FORMAT TEXT
  const formatText = (key) =>
    key.replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase());

  // ✅ DATA
  const statusData = Object.entries(summary.byStatus || {}).map(([k, v]) => ({
    name: formatText(k),
    value: Number(v),
    color: statusColorsMap[k]
  }));

  const scopeData = Object.entries(summary.byScopeType || {}).map(([k, v]) => ({
    name: k,
    count: Number(v)
  }));

  const officerData = Object.entries(summary.byOfficer || {}).map(([id, v]) => ({
    name: `Officer ${id}`,
    audits: Number(v)
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">

        {loading ? (
          <div className="bg-white p-10 text-center rounded-3xl shadow-lg">
            <p className="text-lg font-semibold">
              Loading Audit Analytics...
            </p>
          </div>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* ✅ 1. STATUS PIE */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border">
              <h2 className="text-lg font-bold mb-4">
                Audit Status
              </h2>

              <div className="h-[300px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                    >
                      {statusData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `${v} audits`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ✅ 2. OFFICER BAR CHART (MIDDLE ✅) */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-blue-200">

              {/* Header */}
              <div className="mb-4">
                <p className="text-sm font-semibold uppercase text-blue-600 tracking-wide">
                  Officer Distribution
                </p>
                <h2 className="text-lg font-bold text-gray-800">
                  Audits by Officer
                </h2>
              </div>

              {/* Chart */}
              <div className="h-[260px]">
                <ResponsiveContainer>
                  <BarChart
                    data={officerData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e5e7eb"
                    />

                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: "#374151" }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{ fontSize: 12, fill: "#374151" }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      formatter={(value) => `${value} audits`}
                      contentStyle={{
                        borderRadius: "10px",
                        border: "none",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
                      }}
                    />

                    <Bar
                      dataKey="audits"
                      fill="#3b82f6"
                      radius={[8, 8, 0, 0]}
                      barSize={35}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* ✅ 3. SCOPE BAR */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border">
              <h2 className="text-lg font-bold mb-4">
                Scope Type Distribution
              </h2>

              <div className="h-[300px]">
                <ResponsiveContainer>
                  <BarChart data={scopeData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />
                    <YAxis />

                    <Tooltip formatter={(v) => `${v} audits`} />

                    <Bar
                      dataKey="count"
                      fill="#fb923c"
                      radius={[8, 8, 0, 0]}     // ✅ same rounding as blue
                      barSize={35} />

                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AuditAnalytics;