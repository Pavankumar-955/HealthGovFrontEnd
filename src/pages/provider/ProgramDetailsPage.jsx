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
      title: programTitle || "Program", // replace with API
    });
  }, [id]);

  return (
    <div className="flex flex-col h-full min-h-0">

      <main className="flex-1 overflow-hidden p-6 flex flex-col gap-5">

        {/* ✅ HEADER */}
        <div className="flex items-center gap-4">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 text-sm"
          >
            ← Back
          </button>

          {/* ✅ TITLE FIXED */}
          <div>
            <h2 className="text-lg font-semibold">
              📘 Program #{program?.programId} -  {program?.title}
            </h2>
          </div>

        </div>

        {/* ✅ TABS */}
        <div className="flex gap-3">

          <button
            onClick={() => setActiveTab("infra")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "infra"
                ? "bg-green-600 text-white"
                : "bg-white border text-gray-700 hover:bg-gray-100"
            }`}
          >
            🏥 Infrastructure
          </button>

          <button
            onClick={() => setActiveTab("resource")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "resource"
                ? "bg-green-600 text-white"
                : "bg-white border text-gray-700 hover:bg-gray-100"
            }`}
          >
            📦 Resources
          </button>

        </div>

        {/* ✅ CONTENT (NO GAP FIX ✅) */}
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
