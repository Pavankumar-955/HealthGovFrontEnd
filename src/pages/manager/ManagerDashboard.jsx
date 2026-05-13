import React, { useEffect, useState } from "react";
import ManagerSidebar from "./ManagerSidebar.jsx";
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex min-h-screen bg-[#eef3f8]">

      {/* ✅ MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ✅ SIDEBAR */}
      <div
        className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-lg
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block
        `}
      >
        <ManagerSidebar />
      </div>

      {/* ✅ MAIN CONTENT */}
      <div className="flex-1 flex flex-col lg:ml-64">

        {/* ✅ TOP BAR (Mobile Only) */}
        <div className="flex items-center justify-between p-4 bg-white shadow lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl"
          >
            ☰
          </button>
          <h2 className="font-semibold text-lg">Dashboard</h2>
        </div>

        {/* ✅ CONTENT */}
        <div className="p-4 sm:p-6 flex-1">

          <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold mb-6">
            📊 Manager Dashboard
          </h2>

          {/* ✅ RESPONSIVE GRID */}
          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-5
            gap-4 sm:gap-6
          ">

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
              title="💰 Total Grants"
              value={`₹ ${stats.totalGrants}`}
              type="blue"
            />

          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ManagerDashboard;


/////////////////////////////////////////////////////
// ✅ CARD COMPONENT
/////////////////////////////////////////////////////

const Card = ({ title, value, type }) => {

  let bg = "bg-white text-gray-800";

  if (type === "green") bg = "bg-green-100 text-green-800";
  if (type === "yellow") bg = "bg-yellow-100 text-yellow-800";
  if (type === "red") bg = "bg-red-100 text-red-800";
  if (type === "blue") bg = "bg-blue-100 text-blue-800";

  return (
    <div
      className={`${bg} 
        p-4 sm:p-6 
        rounded-xl shadow border
        hover:-translate-y-1 sm:hover:-translate-y-2 
        hover:shadow-lg 
        transition duration-300`}
    >
      <h4 className="text-xs sm:text-sm font-medium">
        {title}
      </h4>

      <p className="text-lg sm:text-2xl lg:text-3xl font-semibold mt-1">
        {value}
      </p>
    </div>
  );
};
