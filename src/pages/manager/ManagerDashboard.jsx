import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import ManagerNavbar from "./ManagerNavbar";
import Footer from "../../components/ui/Footer";
import { getManagerProjects } from "../../api/managerApi";
import { getPrograms } from "../../api/ProgramApi"; // ✅ ADDED

const ManagerDashboard = () => {

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    totalGrants: 0,
  });

  // ✅ NEW STATE FOR PROGRAMS
  const [programStats, setProgramStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    completed: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await getManagerProjects();
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
      console.error(err);
    }
  };

  // ✅ FETCH PROGRAM DATA
  const fetchProgramStats = async () => {
    try {
      const res = await getPrograms();
      const data = res.data;

      let active = 0;
      let inactive = 0;
      let completed = 0;

      data.forEach((p) => {
        if (p.status === "ACTIVE") active++;
        else if (p.status === "INACTIVE") inactive++;
        else if (p.status === "COMPLETED") completed++;
      });

      setProgramStats({
        total: data.length,
        active,
        inactive,
        completed,
      });

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchProgramStats(); // ✅ ADDED
  }, []);

  const total = stats.total || 1;

  const pieData = [
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
    { name: "Pending", value: stats.pending },
  ];

  const programPieData = [ // ✅ NEW
    { name: "Active", value: programStats.active },
    { name: "Inactive", value: programStats.inactive },
    { name: "Completed", value: programStats.completed },
  ];

  const COLORS = ["#16a34a", "#dc2626", "#facc15"];
  const PROGRAM_COLORS = ["#16a34a", "#6b7280", "#2563eb"];

  return (
    <div className="flex h-screen overflow-hidden bg-[#eef3f8]">

      <ManagerNavbar />

      <div className="flex flex-col flex-1 pt-20">

        <main className="flex-1 overflow-y-auto p-6 pb-24">

          <h2 className="text-3xl font-semibold mb-6">
            📊 Manager Dashboard
          </h2>

          {/* EXISTING SECTION */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <Card title="Total Applications" value={stats.total} />
            <Card title="✅ Approved Applications" value={stats.approved} type="green" />
            <Card title="⏳ Pending Applications" value={stats.pending} type="yellow" />
            <Card title="❌ Rejected Applications" value={stats.rejected} type="red" />
          </div>

          <div className="grid grid-cols-4 gap-6 items-start">
            <div className="col-span-1">
              <Card
                title="💰 Total Grants Approved"
                value={`₹ ${stats.totalGrants}`}
                type="blue"
              />
            </div>

            <div className="col-span-3 bg-white p-5 rounded-xl shadow border max-w-md">
              <h3 className="text-lg font-semibold mb-3">
                📊 Application Status Distribution
              </h3>

              <PieChart width={260} height={240}>
                <Pie
                  data={pieData}
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

          {/* ✅ ✅ NEW HORIZONTAL LINE */}
          <hr className="my-10 border-gray-300" />

          {/* ✅ ✅ NEW PROGRAM SECTION */}
          <h3 className="text-2xl font-semibold mb-6">
            🏥 Program Overview
          </h3>

          {/* PROGRAM CARDS */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <Card title="Total Programs" value={programStats.total} />
            <Card title="✅ Active" value={programStats.active} type="green" />
            <Card title="⚪ Inactive" value={programStats.inactive} />
            <Card title="🔵 Completed" value={programStats.completed} type="blue" />
          </div>

          {/* PROGRAM PIE */}
          <div className="bg-white p-5 rounded-xl shadow border max-w-md">
            <h3 className="text-lg font-semibold mb-3">
              📊 Program Status Distribution
            </h3>

            <PieChart width={260} height={240}>
              <Pie
                data={programPieData}
                outerRadius={80}
                dataKey="value"
                label={({ value }) => {
                  const total = programStats.total || 1;
                  return `${((value / total) * 100).toFixed(0)}%`;
                }}
              >
                {programPieData.map((_, i) => (
                  <Cell key={i} fill={PROGRAM_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>

          </div>

        </main>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40">
          <Footer />
        </div>

      </div>
    </div>
  );
};

export default ManagerDashboard;


/* CARD */
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
