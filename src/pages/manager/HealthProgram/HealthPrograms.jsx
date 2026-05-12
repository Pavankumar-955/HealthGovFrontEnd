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
 
  // ✅ Fetch
  const fetchPrograms = async () => {
    try {
      const res = await getPrograms();
      setPrograms(res.data);
      console.log("Fetched programs:", res.data);
    } catch {
      toast.error("Failed to load programs ❌");
    }
  };
 
  useEffect(() => {
    fetchPrograms();
  }, []);
 
  // ✅ CREATE / UPDATE
  const handleSubmit = async (data) => {
    try {
      if (editData) {
        await updateProgram(editData.programId, data);
        toast.success("Updated ✅");
      } else {
        await createProgram(data);
        toast.success("Created ✅");
      }
 
      setShow(false);
      setEditData(null);
      fetchPrograms();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed ❌");
    }
  };
 
  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete program?")) return;
 
    try {
      await deleteProgram(id);
      toast.success("Deleted ✅");
      fetchPrograms();
    } catch {
      toast.error("Delete failed ❌");
    }
  };
 
  // ✅ SEARCH
  const handleSearch = async () => {
    try {
      const res = await getProgramById(searchId);
      setPrograms([res.data]);
    } catch {
      toast.error("Program not found ❌");
    }
  };
 
  return (
  <div className="flex h-screen overflow-hidden bg-[#eef3f8]">

    {/* ✅ SIDEBAR */}
    <ManagerSidebar />

    {/* ✅ MAIN CONTENT AREA */}
    <div className="flex flex-col flex-1 ml-64">

      {/* ✅ SCROLLABLE BODY */}
      <main className="flex-1 overflow-y-auto pt-10 px-6 pb-24">

        {/* HEADER */}
        <div className="max-w-7xl mx-auto flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">🏥 Health Programs</h2>

          <button
            onClick={() => setShow(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + New Program
          </button>
        </div>

        {/* SEARCH */}
        <div className="max-w-7xl mx-auto flex gap-3 mb-4">
          <input
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Search by ID"
            className="border px-3 py-2 rounded"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200"
          >
            Search
          </button>

          <button
            onClick={fetchPrograms}
            className="bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* TABLE */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow">
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

      {/* ✅ FIXED FOOTER */}
      <div className="fixed bottom-0 right-0 left-64 bg-white border-t z-40">
        {/* If you have Footer component, include here */}
      </div>
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