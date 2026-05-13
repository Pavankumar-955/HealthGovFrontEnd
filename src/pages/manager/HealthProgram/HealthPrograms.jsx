import React, { useEffect, useState } from "react";
import {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
  getProgramById,
} from "../../../api/ProgramApi";

import ProgramTable from "./ProgramTable";
import ProgramFormModal from "./ProgramFormModal";
import ProgramDetailsModal from "./ProgramDetailsModal";
import toast from "react-hot-toast";
import ManagerSidebar from "../ManagerSidebar";

const HealthPrograms = () => {

  const [programs, setPrograms] = useState([]);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchPrograms = async () => {
    try {
      const res = await getPrograms();
      setPrograms(res.data);
    } catch {
      toast.error("Failed to load programs ❌");
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (editData) {
        const idToUpdate = editData._id || editData.programId;
        const payloadToSend = {
          ...formData,
          programId: idToUpdate,
        };
        console.log("📤 Sending update request:");
        console.log("  Program ID:", idToUpdate);
        console.log("  Start Date:", payloadToSend.startDate);
        console.log("  Full payload:", payloadToSend);
        
        await updateProgram(idToUpdate, payloadToSend);
        toast.success("Program Updated ✅");
      } else {
        await createProgram(formData);
        toast.success("Program Created ✅");
      }

      setShow(false);
      setEditData(null);
      fetchPrograms();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this program?")) return;
    try {
      await deleteProgram(id);
      toast.success("Deleted ✅");
      fetchPrograms();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  const handleSearch = async () => {
    if (!searchId) return fetchPrograms();
    try {
      const res = await getProgramById(searchId);
      setPrograms(res.data ? [res.data] : []);
    } catch {
      toast.error("Program not found ❌");
    }
  };

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
          fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block
        `}
      >
        <ManagerSidebar />
      </div>

      {/* ✅ MAIN CONTENT */}
      <div className="flex-1 flex flex-col lg:ml-64">

        {/* ✅ TOP BAR (mobile only) */}
        <div className="flex items-center justify-between p-4 bg-white shadow lg:hidden">
          <button className="text-2xl" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <h2 className="font-semibold">Programs</h2>
        </div>

        {/* ✅ CONTENT */}
        <main className="flex-1 p-4 sm:p-6">

          {/* ✅ HEADER */}
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <h2 className="text-lg sm:text-2xl font-semibold">
              🏥 Health Programs
            </h2>

            <button
              onClick={() => {
                setEditData(null);
                setShow(true);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
            >
              + New Program
            </button>
          </div>

          {/* ✅ SEARCH BAR */}
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 mb-4">
            <input
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Search by ID"
              className="border px-3 py-2 rounded w-full sm:w-64"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
            >
              Search
            </button>

            <button
              onClick={fetchPrograms}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 w-full sm:w-auto"
            >
              Reset
            </button>
          </div>

          {/* ✅ TABLE WRAPPER (scrollable on mobile) */}
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow overflow-x-auto">

            <ProgramTable
              programs={programs}
              onEdit={(p) => {
                setEditData(p);
                setShow(true);
              }}
              onDelete={handleDelete}
              onView={(p) => setSelectedProgram(p)}
            />

          </div>
        </main>

      </div>

      {/* ✅ MODALS */}
      <ProgramFormModal
        show={show}
        handleClose={() => {
          setShow(false);
          setEditData(null);
        }}
        handleSubmit={handleSubmit}
        editData={editData}
      />

      {selectedProgram && (
        <ProgramDetailsModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </div>
  );
};

export default HealthPrograms;
