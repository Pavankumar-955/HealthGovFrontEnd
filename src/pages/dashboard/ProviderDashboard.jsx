import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import { getInfraReport } from "../../api/infraApi";
import { getResourceReport } from "../../api/resourceApi";
import { getPrograms } from "../../api/ProgramApi"; // ✅ correct casing

// ✅ COLORS – MATCHES YOUR TABLE BADGES & THEME
const COLORS = {
  // Infrastructure
  operational: "#22C55E",        // green
  maintenance: "#FACC15",        // yellow
  tempClosed: "#a5abb8ff",         // gray
  decommissioned: "#EF4444",     // red

  // Resources
  allocated: "#3B82F6",          // blue
  active: "#22C55E",             // green
  inactive: "#c3c7cfff",           // gray
  completed: "#8B5CF6",          // purple
};

const ProviderDashboard = () => {
  const [infraData, setInfraData] = useState(null);
  const [resourceData, setResourceData] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // ✅ ADD

  // ✅ LOAD DASHBOARD DATA
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);   // ✅ start loading
        setError(false);    // ✅ reset error

        const [infraRes, resourceRes, programRes] = await Promise.all([
          getInfraReport(),
          getResourceReport(),
          getPrograms(),
        ]);

        setInfraData(infraRes?.data || null);
        setResourceData(resourceRes?.data || null);
        setPrograms(programRes?.data || []);

      } catch (err) {
        setError(true);     // ✅ mark error
        toast.error("Failed to load dashboard ❌");

      } finally {
        setLoading(false);  // ✅ stop loading
      }
    };

    loadDashboard();
  }, []);

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center">

        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Server Unavailable 🚫
        </h2>

        <p className="text-gray-500 mb-4">
          Unable to load dashboard data. Please try again later.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer transition"
        >
          Retry
        </button>

      </div>
    );
  }

  // ✅ TOP KPI VALUES
  const totalPrograms = programs.length;
  const activePrograms = programs.filter(p => p.status === "ACTIVE").length;
  const totalInfras = infraData?.summary?.totalInfrastructure ?? 0;
  const totalResources =
    resourceData?.physicalResourcesReport?.reduce(
      (sum, r) => sum + (r.totalResources || 0),
      0
    ) ?? 0;

  // ✅ INFRA CHART DATA
  const infraBarData =
    infraData?.infrastructureAvailability?.map(i => {
      const total = i.total || 1;
      return {
        type: i.type,
        operational: (i.operational / total) * 100,
        maintenance: (i.underMaintenance / total) * 100,
        tempClosed: (i.temporarilyClosed / total) * 100,
        decommissioned: (i.decommissioned / total) * 100,

        operationalCount: i.operational,
        maintenanceCount: i.underMaintenance,
        tempClosedCount: i.temporarilyClosed,
        decommissionedCount: i.decommissioned,
        total,
      };
    }) || [];

  // ✅ RESOURCE CHART DATA
  const resourceBarData =
    resourceData?.physicalResourcesReport?.map(r => {
      const total = r.totalResources || 1;
      return {
        type: r.type,
        allocated: (r.allocated / total) * 100,
        active: (r.active / total) * 100,
        inactive: (r.inactive / total) * 100,
        completed: (r.completed / total) * 100,

        allocatedCount: r.allocated,
        activeCount: r.active,
        inactiveCount: r.inactive,
        completedCount: r.completed,
        total,
      };
    }) || [];

  // ✅ CLEAN TOOLTIP
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow text-sm">
        <p className="font-semibold mb-2">{d.type}</p>

        {d.operational !== undefined && (
          <>
            <p>Operational: {d.operationalCount}</p>
            <p>Maintenance: {d.maintenanceCount}</p>
            <p>Temp Closed: {d.tempClosedCount}</p>
            <p>Decommissioned: {d.decommissionedCount}</p>
          </>
        )}

        {d.allocated !== undefined && (
          <>
            <p>Allocated: {d.allocatedCount}</p>
            <p>Active: {d.activeCount}</p>
            <p>Inactive: {d.inactiveCount}</p>
            <p>Completed: {d.completedCount}</p>
          </>
        )}
      </div>
    );
  };

  return (

    <div className="w-full flex flex-col gap-4">

      {/* ✅ HEADER */}
      <h2 className="text-xl font-semibold">Provider Dashboard</h2>

      {/* ✅ KPI CARDS – ONE LINE */}
      {/* ✅ KPI CARDS – ONE LINE */}
      {/* ✅ KPI CARDS – RESPONSIVE */}
      <div className="flex flex-wrap gap-4 w-full">

        <div className="flex-1 min-w-[220px]">
          <Card title="Total Programs" value={totalPrograms} />
        </div>

        <div className="flex-1 min-w-[220px]">
          <Card
            title="Active Programs"
            value={activePrograms}
            color="text-green-600"
          />
        </div>

        <div className="flex-1 min-w-[220px]">
          <Card title="Total Infrastructure" value={totalInfras} />
        </div>

        <div className="flex-1 min-w-[220px]">
          <Card title="Total Resources" value={totalResources} />
        </div>

      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="flex-1 min-w-[220px]">
          <ChartCard title="Infrastructure Status">
            <BarChart data={infraBarData} barSize={50} >
              <CartesianGrid stroke="#f1f5f9" />
              <XAxis dataKey="type" />
              <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ backgroundColor: "transparent", border: "none" }}
                cursor={{ fill: "transparent" }}
              />
              <Legend />

              <Bar dataKey="operational" name="Operational" fill={COLORS.operational} stackId="a" />
              <Bar dataKey="maintenance" name="Main." fill={COLORS.maintenance} stackId="a" />
              <Bar dataKey="tempClosed" name="TempClosed" fill={COLORS.tempClosed} stackId="a" />
              <Bar dataKey="decommissioned" name="Decom." fill={COLORS.decommissioned} stackId="a" />
            </BarChart>
          </ChartCard>
        </div>

        <div className="flex-1 min-w-[220px]">
          <ChartCard title="Resource Status">
            <BarChart data={resourceBarData} barSize={50}>
              <CartesianGrid stroke="#f1f5f9" />
              <XAxis dataKey="type" />
              <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ backgroundColor: "transparent", border: "none" }}
                cursor={{ fill: "transparent" }}
              />
              <Legend />
              <Bar dataKey="allocated" stackId="a" fill={COLORS.allocated} />
              <Bar dataKey="active" stackId="a" fill={COLORS.active} />
              <Bar dataKey="inactive" stackId="a" fill={COLORS.inactive} />
              <Bar dataKey="completed" stackId="a" fill={COLORS.completed} />
            </BarChart>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

// ✅ KPI CARD
const Card = ({ title, value, color }) => (
  <div className="bg-white p-3 rounded-xl shadow text-sm">
    <p className="text-gray-500">{title}</p>
    <h3 className={`text-xl font-semibold ${color || ""}`}>{value}</h3>
  </div>
);

// ✅ CHART CONTAINER
const ChartCard = ({ title, children }) => (
  <div className="bg-white p-3 rounded-xl shadow">
    <h3 className="text-sm font-semibold mb-2">{title}</h3>
    <ResponsiveContainer width="100%" height={375}>
      {children}
    </ResponsiveContainer>
  </div>
);

export default ProviderDashboard;