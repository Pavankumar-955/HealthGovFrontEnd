import React, { useEffect, useState } from "react";
import {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
  getProgramById,
} from "../../api/ProgramApi";

import ProgramTable from "./ProgramTable";
import ProgramFormModal from "./ProgramFormModal";
import ProgramDetailsModal from "./ProgramDetailsModal";

import Footer from "../../components/ui/Footer";
import toast from "react-hot-toast";

const ProgramManagerDashboard = () => {
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
    <>
      <div className="ml-64">
        <div className="pt-10 min-h-screen bg-[#eef3f8] px-6">

          {/* HEADER */}
          <div className="max-w-7xl mx-auto flex justify-between mb-6">
            <h2 className="text-2xl font-semibold">🏥 Program Manager</h2>

            <button
              onClick={() => setShow(true)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              + New Program
            </button>
          </div>

          {/* ✅ SEARCH */}
          <div className="flex gap-3 mb-4">
            <input
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Search by ID"
              className="border p-2"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-3 py-2"
            >
              Search
            </button>

            <button
              onClick={fetchPrograms}
              className="bg-gray-500 text-white px-3 py-2"
            >
              Reset
            </button>
          </div>

          {/* TABLE */}
          <ProgramTable
            programs={programs}
            onEdit={(p) => {
              setEditData(p);
              setShow(true);
            }}
            onDelete={handleDelete}
            onRowClick={(p) => setSelectedProgram(p)}
          />

          {/* FORM */}
          <ProgramFormModal
            show={show}
            handleClose={() => {
              setShow(false);
              setEditData(null);
            }}
            handleSubmit={handleSubmit}
            editData={editData}
          />

          {/* DETAILS */}
          {selectedProgram && (
            <ProgramDetailsModal
              program={selectedProgram}
              onClose={() => setSelectedProgram(null)}
            />
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ProgramManagerDashboard;