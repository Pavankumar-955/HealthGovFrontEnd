import React, { useEffect, useState } from "react";
import ResearcherSidebar from "./ResearcherSidebar";
import { getProjects } from "../../api/researchApi";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const ResearcherDashboard = () => {

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    grants: 0,
  });

  // Fetch data
  const fetchStats = async () => {
    try {
      const res = await getProjects();
      const data = res.data;

      let approved = 0;
      let rejected = 0;
      let pending = 0;
      let totalGrant = 0;

      data.forEach((p) => {
        if (p.status === "APPROVED") {
          approved++;
          totalGrant += p.amount || 0;
        } else if (p.status === "REJECTED") {
          rejected++;
        } else if (p.status === "PENDING") {
          pending++;
        }
      });

      setStats({
        total: data.length,
        approved,
        rejected,
        pending,
        grants: totalGrant,
      });

    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const total = stats.total || 1;
  const pieData = [
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
    { name: "Pending", value: stats.pending },
  ];

  const COLORS = ["#16a34a", "#dc2626", "#facc15"];

  return (
    <>
      <ResearcherSidebar />

      <div className="ml-64 p-6 bg-[#eef3f8] min-h-screen">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-semibold">
            Dashboard Overview
          </h2>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-5 gap-6">

          <Card title="Total Projects" value={stats.total} />
          <Card title="✅ Approved" value={stats.approved} type="green" />
          <Card title="⏳ Pending" value={stats.pending} type="yellow" />
          <Card title="❌ Rejected" value={stats.rejected} type="red" />
          <Card title="💰 Total Grants" value={`₹ ${stats.grants}`} type="blue" />

        </div>

        {/* CHART */}
        <div className="mt-8 max-w-md">

          <div className="bg-white p-5 rounded-xl shadow border">

            <h3 className="text-lg font-semibold mb-3">
              📊 Project Status Distribution
            </h3>

            <PieChart width={260} height={240}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ value }) => `${((value / total) * 100).toFixed(0)}%`}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>

          </div>

        </div>

      </div>
    </>
  );
};

export default ResearcherDashboard;


// CARD COMPONENT
const Card = ({ title, value, type }) => {

  let bg = "bg-white text-gray-800";

  if (type === "green") bg = "bg-green-100 text-green-800";
  if (type === "yellow") bg = "bg-yellow-100 text-yellow-800";
  if (type === "red") bg = "bg-red-100 text-red-800";
  if (type === "blue") bg = "bg-blue-100 text-blue-800";

  return (
    <div className={`${bg} p-6 rounded-xl shadow border hover:-translate-y-2 hover:shadow-lg transition`}>
      <h4 className="text-sm">{title}</h4>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};