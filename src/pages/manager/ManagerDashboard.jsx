import React, { useEffect, useState } from "react";
import ManagerSidebar from "./ManagerSidebar";
import Footer from "../../components/ui/Footer";
import { getManagerProjects } from "../../api/managerApi";

const ManagerDashboard = () => {

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    totalGrants: 0,
  });

  // Fetch stats
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
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <ManagerSidebar />

      <div className="ml-64 p-6 min-h-screen bg-[#eef3f8]">

        <h2 className="text-3xl font-semibold mb-6">
          📊 Manager Dashboard
        </h2>

        {/* ✅ CARDS ONLY */}
        <div className="grid grid-cols-5 gap-6">

          <Card title="Total Applications" value={stats.total} />

          <Card
            title="✅ Approved Applications"
            value={stats.approved}
            type="green"
          />

          <Card
            title="⏳ Pending Applications"
            value={stats.pending}
            type="yellow"
          />

          <Card
            title="❌ Rejected Applications"
            value={stats.rejected}
            type="red"
          />

          <Card
            title="💰 Total Grants Approved"
            value={`₹ ${stats.totalGrants}`}
            type="blue"
          />

        </div>

      </div>

      <Footer />
    </>
  );
};

export default ManagerDashboard;


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