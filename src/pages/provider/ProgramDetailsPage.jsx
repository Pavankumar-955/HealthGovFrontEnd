import React, { useState } from "react";
import { useParams } from "react-router-dom";
import InfraTab from "./infra/InfraTab";
import ResourceTab from "./resource/ResourceTab";

const ProgramDetailsPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("infra");

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* ✅ HEADER CARD */}
      <div className="bg-white rounded-2xl shadow-sm border px-6 py-5 flex justify-between items-center">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* ICON */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center font-bold text-green-700 text-lg">
            P
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Program ID
            </p>

            <h2 className="text-lg font-semibold text-gray-800">
              Program #{id}
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Manage infrastructure & resources
            </p>
          </div>
        </div>

        {/* STATUS */}
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 ring-1 ring-green-200">
          ACTIVE
        </span>

      </div>

      {/* ✅ TAB SELECTOR (PILL STYLE) */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">

        <button
          onClick={() => setActiveTab("infra")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === "infra"
              ? "bg-white shadow text-green-700"
              : "text-gray-600"
          }`}
        >
          🏥 Infrastructure
        </button>

        <button
          onClick={() => setActiveTab("resource")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === "resource"
              ? "bg-white shadow text-green-700"
              : "text-gray-600"
          }`}
        >
          📦 Resources
        </button>

      </div>

      {/* ✅ CONTENT AREA */}
      <div className="bg-white rounded-2xl shadow-sm border p-5">

        {activeTab === "infra" && (
          <div className="space-y-3">

            <h3 className="text-sm font-semibold text-gray-600">
              Infrastructure Details
            </h3>

            <div className="border-t pt-4">
              <InfraTab programId={id} />
            </div>

          </div>
        )}

        {activeTab === "resource" && (
          <div className="space-y-3">

            <h3 className="text-sm font-semibold text-gray-600">
              Resource Details
            </h3>

            <div className="border-t pt-4">
              <ResourceTab programId={id} />
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default ProgramDetailsPage;