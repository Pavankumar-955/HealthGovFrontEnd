import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getProgramById } from "../../api/ProgramApi";
import toast from "react-hot-toast";

const getStatusStyle = (status) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-600 text-white px-3 py-1 rounded-full text-xs";
    case "INACTIVE":
      return "bg-gray-500 text-white px-3 py-1 rounded-full text-xs";
    case "COMPLETED":
      return "bg-blue-600 text-white px-3 py-1 rounded-full text-xs";
    case "PENDING":
      return "bg-yellow-500 text-white px-3 py-1 rounded-full text-xs";
    default:
      return "bg-gray-400 text-white px-3 py-1 rounded-full text-xs";
  }
};

const ProgramDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [program, setProgram] = useState(location.state?.program || null);

  useEffect(() => {
    if (!program) {
      const fetchProgram = async () => {
        try {
          const res = await getProgramById(id);
          setProgram(res.data);
        } catch {
          toast.error("Failed to load program ❌");
        }
      };
      fetchProgram();
    }
  }, [id, program]);

  if (!program)
    return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="pt-10 min-h-screen bg-[#eef3f8] px-6">

      {/* ✅ HEADER */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">🏥 Program Details</h2>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
        >
          Back
        </button>
      </div>

      {/* ✅ CONTENT CARD */}
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* ✅ ROW 1 */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500">Program ID</p>
            <p className="text-lg font-semibold">{program.programId}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Title</p>
            <p className="text-lg font-semibold">{program.title}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Budget</p>
            <p className="text-lg font-semibold">₹{program.budget}</p>
          </div>
        </div>

        {/* ✅ ROW 2 */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500">Start Date</p>
            <p className="font-medium">{program.startDate}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">End Date</p>
            <p className="font-medium">{program.endDate}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <span className={getStatusStyle(program.status)}>
              {program.status}
            </span>
          </div>
        </div>

        {/* ✅ DESCRIPTION */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Description</p>
          <p className="text-gray-800">{program.description}</p>
        </div>

        {/* ✅ ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() =>
              navigate(
  `/manager/programs/${program.programId}/infrastructure`,
  { state: { programId: program.programId } }
)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 text-sm"
          >
            Infrastructure
          </button>

          <button
            onClick={() =>
              navigate(`/manager/programs/${program.programId}/resources`)
            }
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 text-sm"
          >
            Resources
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProgramDetailsPage;