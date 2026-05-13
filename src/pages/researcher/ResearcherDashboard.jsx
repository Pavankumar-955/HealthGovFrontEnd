import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResearcherNavbar from "./ResearcherNavbar";
import { getProjects } from "../../api/researchApi";
import Footer from "../../components/ui/Footer";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const ResearcherDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    grants: 0,
  });

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
      console.error(err);
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
      <ResearcherNavbar onOpenReport={() => navigate("/researcher/projects")} />

      <div className="pt-20 bg-[#eef3f8] min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-3xl font-semibold">Dashboard Overview</h2>
          </div>

          {/* ROW 1: TOP CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card title="Total Projects" value={stats.total} />
            <Card title="✅ Approved" value={stats.approved} type="green" />
            <Card title="⏳ Pending" value={stats.pending} type="yellow" />
            <Card title="❌ Rejected" value={stats.rejected} type="red" />
          </div>

          {/* ROW 2: GRANTS (SMALL) + CHART (BIG) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT: TOTAL GRANTS (SAME SIZE AS APPROVED ✅) */}
            <div className="lg:col-span-1">
              <Card
                title="💰 Total Grants"
                value={`₹ ${stats.grants}`}
                type="blue"
              />
            </div>

            {/* RIGHT: BIG PIE CHART ✅ */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow border">
              <h3 className="text-lg font-semibold mb-4">
                📊 Project Status Distribution
              </h3>

              <div className="flex justify-center">
                <PieChart width={360} height={300}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label={({ value }) =>
                      `${((value / total) * 100).toFixed(0)}%`
                    }
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

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResearcherDashboard;

const Card = ({ title, value, type }) => {
  let bg = "bg-white text-gray-800";
  if (type === "green") bg = "bg-green-100 text-green-800";
  if (type === "yellow") bg = "bg-yellow-100 text-yellow-800";
  if (type === "red") bg = "bg-red-100 text-red-800";
  if (type === "blue") bg = "bg-blue-100 text-blue-800";

  return (
    <div className={`${bg} p-6 rounded-xl shadow border`}>
      <h4 className="text-sm">{title}</h4>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};
