import React, { useEffect, useState } from "react";
import  { useNavigate } from "react-router-dom";
import { getPrograms } from "../../api/ProgramApi";
import toast from "react-hot-toast";
import Footer from "../../components/ui/Footer";

const getStatusStyle = (status) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700";
    case "INACTIVE":
      return "bg-gray-100 text-gray-600";
    case "COMPLETED":
      return "bg-blue-100 text-blue-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-600";
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
    <div className="flex flex-col h-screen">

      {/* MAIN */}
      <main className="flex-1 overflow-hidden p-6 pb-10 pt-1">

        <div className="w-full flex flex-col h-full">

          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Health Programs
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage infrastructure and resources
            </p>
          </div>

          {/* TABLE WRAPPER */}
          <div className="flex-1 bg-white rounded-xl shadow border overflow-hidden">

            {/* SCROLL */}
            <div className="h-full overflow-y-auto">

              <table className="w-full text-sm">

                {/* HEADER */}
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left w-[80px]">ID</th>
                    <th className="px-4 py-3 text-left">Title</th>

                    {/* ✅ NEW BUDGET COLUMN */}
                    <th className="px-4 py-3 text-right w-[160px]">
                      Budget
                    </th>

                    <th className="px-4 py-3 text-center w-[140px]">Start</th>
                    <th className="px-4 py-3 text-center w-[140px]">End</th>
                    <th className="px-4 py-3 text-center w-[120px]">Status</th>
                    <th className="px-4 py-3 text-center w-[120px]">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {programs.length > 0 ? (
                    programs.map((p) => (
                      <tr
                        key={p.programId}
                        onClick={() =>
                          navigate(`/provider/programs/${p.programId}`, {
                            state: {
                              title: p.title,
                              budget: p.budget, // ✅ PASS BUDGET
                            },
                          })
                        }
                        className="border-t hover:bg-gray-50 cursor-pointer"
                      >

                        <td className="px-4 py-3">
                          {p.programId}
                        </td>

                        {/* TITLE */}
                        <td className="px-4 py-3 font-medium text-gray-800 truncate">
                          {p.title}
                        </td>

                        {/* ✅ BUDGET */}
                        <td className="px-4 py-3 text-right text-gray-700 font-medium">
                          ₹{p.budget?.toLocaleString()}
                        </td>

                        <td className="px-4 py-3 text-center">
                          {p.startDate}
                        </td>

                        <td className="px-4 py-3 text-center">
                          {p.endDate}
                        </td>

                        {/* STATUS */}
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                              p.status
                            )}`}
                          >
                            {p.status}
                          </span>
                        </td>

                        {/* ACTION */}
                        <td
                          className="px-4 py-3 text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() =>
                              navigate(`/provider/programs/${p.programId}`, {
                                state: {
                                  title: p.title,
                                  budget: p.budget, // ✅ PASS BUDGET
                                },
                              })
                            }
                            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-xs hover:bg-indigo-200"
                          >
                            View
                          </button>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-6 text-gray-500"
                      >
                        No Programs Available
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>

            </div>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-64 bg-white border-t z-40">
        <Footer />
      </div>

    </div>
  );
};

export default ProgramsPage;
