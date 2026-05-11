import React, { useEffect, useState } from "react";
import {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../../api/ProgramApi.js";

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

  // CREATE & UPDATE
  const handleSubmit = async (data) => {
    try {
      if (editData) {
        await updateProgram(editData.programId, data);
        toast.success("Program updated ✅");
      } else {
        await createProgram(data);
        toast.success("Program created ✅");
      }

      setShow(false);
      setEditData(null);
      fetchPrograms();
    } catch {
      toast.error("Operation failed ❌");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete program?")) return;

    try {
      await deleteProgram(id);
      toast.success("Program deleted ✅");
      fetchPrograms();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <>
      <div className="ml-64">
        <div className="pt-10 min-h-screen bg-[#eef3f8] px-6">

          {/* HEADER */}
          <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">🏥 Program Manager</h2>

            <button
              onClick={() => setShow(true)}
              className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700"
            >
              + New Program
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

          {/* MODAL */}
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