import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import InfraTab from "./infra/InfraTab";
import ResourceTab from "./resource/ResourceTab";

const ProgramDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const programTitle = location.state?.title;

  const [activeTab, setActiveTab] = useState("infra");
  const [program, setProgram] = useState(null);

  // ✅ TEMP (replace with API later)
  useEffect(() => {
    setProgram({
      programId: id,
      title: programTitle || "Program",
    });
  }, [id, programTitle]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">

      <main className="flex-1 overflow-hidden p-3 pb-10 flex flex-col gap-5">

        {/* ✅ HEADER */}
        <div className="flex items-center gap-4">

          {/* ✅ BACK BUTTON (LIGHT ✅) */}
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 text-sm transition cursor-pointer"
          >
            ← Back
          </button>

          {/* ✅ TITLE */}
          <h2 className="text-lg font-semibold text-gray-800">
            Program #{program?.programId} - {program?.title}
          </h2>

        </div>

        {/* ✅ TABS */}
        <div className="flex gap-3">

          <button
            onClick={() => setActiveTab("infra")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "infra"
                ? "bg-indigo-100 text-indigo-700 "
                : "bg-white border text-gray-700 hover:bg-gray-100 cursor-pointer"
            }`}
          >
            Infrastructure
          </button>

          <button
            onClick={() => setActiveTab("resource")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "resource"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-white border text-gray-700 hover:bg-gray-100 cursor-pointer"
            }`}
          >
            Resources
          </button>

        </div>

        {/* ✅ CONTENT */}
        <div className="flex-1 bg-white rounded-xl shadow overflow-hidden min-h-0">

          {activeTab === "infra" && (
            <div className="flex h-full min-h-0">
              <InfraTab programId={id} />
            </div>
          )}

          {activeTab === "resource" && (
            <div className="flex h-full min-h-0">
              <ResourceTab programId={id} />
            </div>
          )}

        </div>

      </main>

    </div>
  );
};

export default ProgramDetailsPage;
