import { useEffect, useState } from "react";

const ProviderDashboard = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = [
        { id: 1, title: "Medicine Camp", status: "ACTIVE" },
        { id: 2, title: "Covid Vaccine", status: "PENDING" },
        { id: 3, title: "Blood Camp", status: "COMPLETED" },
      ];

      setPrograms(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-4 border-green-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          📊 Provider Dashboard
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your health programs
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-sm text-gray-500">Total Programs</p>
          <h3 className="text-2xl font-semibold mt-2">
            {programs.length}
          </h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-sm text-gray-500">Active</p>
          <h3 className="text-2xl text-green-600 mt-2">
            {programs.filter(p => p.status === "ACTIVE").length}
          </h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-sm text-gray-500">Pending</p>
          <h3 className="text-2xl text-yellow-500 mt-2">
            {programs.filter(p => p.status === "PENDING").length}
          </h3>
        </div>

      </div>

    </div>
  );
};

export default ProviderDashboard;
