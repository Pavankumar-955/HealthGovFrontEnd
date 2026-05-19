import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import ManagerNavbar from "./ManagerNavbar";
import Footer from "../../components/Footer";
import { getManagerProjects } from "../../api/managerApi";

const ManagerDashboard = () => {

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    totalGrants: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await getManagerProjects(); // Backend API call to fetch all projects
      const data = res.data;

      let approved = 0;
      let rejected = 0;
      let pending = 0;
      let totalGrants = 0;

      data.forEach((p) => {
        if (p.status === "APPROVED") {
          approved++;
          totalGrants += p.amount || 0;
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
        totalGrants,
      });

    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  /* PIE DATA */
  const total = stats.total || 1;

  const pieData = [
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
    { name: "Pending", value: stats.pending },
  ];

  const COLORS = ["#16a34a", "#dc2626", "#facc15"];

  return (
    <div className="flex h-screen overflow-hidden bg-[#eef3f8]">

      {/* SIDEBAR */}
      <ManagerNavbar />

      {/* MAIN WRAPPER */}
      <div className="flex flex-col flex-1 pt-20">

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 pb-24">

          <h2 className="text-3xl font-semibold mb-6">
            📊 Manager Dashboard
          </h2>

          {/* ROW 1: TOP CARDS */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <Card title="Total Applications" value={stats.total} />
            <Card title="✅ Approved Applications" value={stats.approved} type="green" />
            <Card title="⏳ Pending Applications" value={stats.pending} type="yellow" />
            <Card title="❌ Rejected Applications" value={stats.rejected} type="red" />
          </div>

          {/* ROW 2: TOTAL GRANTS + PIE CHART (HORIZONTAL ✅) */}
          <div className="grid grid-cols-4 gap-6 items-start">

            {/* TOTAL GRANTS — SAME SIZE AS PENDING */}
            <div className="col-span-1">
              <Card
                title="💰 Total Grants Approved"
                value={`₹ ${stats.totalGrants}`}
                type="blue"
              />
            </div>

            {/* PIE CHART — SAME ROW */}
            <div className="col-span-3 bg-white p-5 rounded-xl shadow border max-w-md">
              <h3 className="text-lg font-semibold mb-3">
                📊 Application Status Distribution
              </h3>

              <PieChart width={260} height={240}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ value }) =>
                    `${((value / total) * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40">
          <Footer />
        </div>

      </div>
    </div>
  );
};

export default ManagerDashboard;


/* CARD COMPONENT */
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