import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { getComplianceSummary } from '../../api/complianceAPI.js';

const ComplianceAnalytics = () => {
  const [summary, setSummary] = useState({
    totalRecords: 0,
    byResult: {},
    byType: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        setLoading(true);
        const res = await getComplianceSummary();
        setSummary(res.data || summary);
      } catch (error) {
        console.error('Failed to load compliance summary', error);
      } finally {
        setLoading(false);
      }
    };
    loadSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resultColors = ['#ef4444', '#f59e0b', '#10b981', '#6366f1'];
  const typeColors = ['#fb923c', '#3b82f6', '#14b8a6', '#a855f7'];

  /* LABEL FIX (IMPORTANT) */
  const formatResultName = (key) => {
    const formatted = key
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

    const labelMap = {
      Compliant: 'Compliance',
      Noncompliant: 'Non-Compliance',
    };

    return labelMap[formatted] || formatted;
  };

  const resultData = Object.entries(summary.byResult || {}).map(
    ([key, value], index) => ({
      name: formatResultName(key),
      value: Number(value) || 0,
      color: resultColors[index % resultColors.length],
    })
  );

  const typeData = Object.entries(summary.byType || {}).map(
    ([key, value], index) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
      value: Number(value) || 0,
      color: typeColors[index % typeColors.length],
    })
  );

  const totalRecords =
    summary.totalRecords ||
    resultData.reduce((sum, item) => sum + item.value, 0);

  const timelineData = typeData.map((item) => ({
    category: item.name,
    count: item.value,
  }));

  const statusTimelineData = Object.entries(summary.byResult || {}).map(
    ([key, value]) => ({
      status: formatResultName(key),
      count: Number(value) || 0,
    })
  );

  return (
    <div className="min-h-screen bg-gradient-to-br p-8">
      <div className="mx-auto max-w-7xl space-y-20">

        {loading ? (
          <div className="rounded-3xl border border-orange-200 bg-white p-12 text-center shadow-lg">
            <p className="text-xl font-semibold text-slate-800">
              Loading analytics...
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Fetching the latest summary from your compliance dashboard.
            </p>
          </div>
        ) : (
          <>
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">

              {/* PIE CHART */}
              <div className="rounded-[32px] w-full border border-orange-200 bg-white p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
                      Status Pie Chart
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                      Compliance Status
                    </h2>
                  </div>
                  <div className="rounded-full bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700">
                    Updated now
                  </div>
                </div>

                <div className="h-[360px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={resultData}
                        cx="50%"
                        cy="50%"
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={3}
                      >
                        {resultData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} records`} />
                      <Legend verticalAlign="bottom" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* BAR CHART */}
              <div className="rounded-[32px] w-full border border-orange-200 bg-white p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
                      Type Based
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                      Record Type Trend
                    </h2>
                  </div>
                  <div className="rounded-full bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700">
                    Trend view
                  </div>
                </div>

                <div className="h-[360px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        fill="#fb923c"
                        barSize={35}
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ComplianceAnalytics;