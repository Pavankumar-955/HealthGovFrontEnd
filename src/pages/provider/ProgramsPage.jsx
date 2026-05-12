import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPrograms } from "../../api/ProgramApi";
import toast from "react-hot-toast";

const getStatusStyle = (status) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-50 text-green-700 ring-1 ring-green-200";
    case "INACTIVE":
      return "bg-gray-50 text-gray-600 ring-1 ring-gray-200";
    case "COMPLETED":
      return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
    case "PENDING":
      return "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200";
    default:
      return "bg-gray-50 text-gray-700 ring-1 ring-gray-200";
  }
};

const ProgramsPage = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const res = await getPrograms();
        setPrograms(res.data || []);
      } catch {
        toast.error("Failed to load programs ❌");
      }
    };

    loadPrograms();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">

      {/* ✅ HEADER */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-800">
          🏥 Health Programs
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Select a program to manage infrastructure and resources
        </p>
      </div>

      {/* ✅ LIST CONTAINER */}
      <div className="space-y-5">

        {programs.length > 0 ? (
          programs.map((p) => (
            <div
              key={p.programId}
              onClick={() =>
                navigate(`/provider/programs/${p.programId}`)
              }
              className="group bg-white border border-gray-100 rounded-2xl px-6 py-5
                         shadow-sm hover:shadow-lg hover:border-green-200
                         transition-all duration-200 cursor-pointer"
            >

              <div className="flex justify-between items-center">

                {/* ✅ LEFT SECTION */}
                <div className="flex items-center gap-5">

                  {/* ICON */}
                  <div
                    className="w-12 h-12 rounded-xl 
                               bg-gradient-to-br from-green-100 to-green-200
                               flex items-center justify-center
                               text-green-700 font-semibold text-lg shadow-inner"
                  >
                    {p.title?.charAt(0)}
                  </div>

                  {/* TEXT */}
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Program ID: {p.programId}
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition">
                      {p.title}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      {p.startDate} → {p.endDate}
                    </p>
                  </div>

                </div>

                {/* ✅ RIGHT SECTION */}
                <div className="flex items-center gap-8">

                  {/* STATUS */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      p.status
                    )}`}
                  >
                    {p.status}
                  </span>

                  {/* ACTION */}
                  <div className="flex items-center gap-1 text-green-600 font-medium text-sm group-hover:translate-x-1 transition">
                    Open
                    <span className="text-lg">→</span>
                  </div>

                </div>

              </div>

            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
            No Programs Available
          </div>
        )}

      </div>

    </div>
  );
};

export default ProgramsPage;