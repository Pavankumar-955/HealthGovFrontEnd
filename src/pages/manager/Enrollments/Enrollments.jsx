import React, { useEffect, useState } from "react";
import {
  getEnrollments,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  getEnrollmentById,
} from "../../../api/enrollmentApi";

import EnrollmentsTable from "./EnrollmentsTable";
import EnrollmentFormModel from "./EnrollmentFormModel";
import EnrollmentsDetails from "./EnrollmentsDetails";

import toast from "react-hot-toast";
import ManagerNavbar from "../ManagerNavbar";

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [searchId, setSearchId] = useState("");
  // ✅ FETCH
  const fetchEnrollments = async () => {
    try {
      const res = await getEnrollments();
      setEnrollments(res.data);
    } catch {
      toast.error("Failed to load enrollments ❌");
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // ✅ CREATE / UPDATE
  const handleSubmit = async (data) => {
    try {
      if (editData) {
        await updateEnrollment({
          ...data,
          enrollmentId: editData.enrollmentId,
        });
        toast.success("Updated ✅");
      } else {
        await createEnrollment(data);
        toast.success("Created ✅");
      }

      setShow(false);
      setEditData(null);
      fetchEnrollments();

    } catch (err) {
      console.error(err);
      toast.error("Operation failed ❌");
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete enrollment?")) return;

    try {
      await deleteEnrollment(id);
      toast.success("Deleted ✅");
      fetchEnrollments();
    } catch {
      toast.error("Delete failed ❌");
    }
  };
  // ✅ SEARCH
  const handleSearch = async () => {
    try {
      const res = await getEnrollmentById(searchId);
      setEnrollments([res.data]);
    } catch {
      toast.error("Not found ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#eef3f8]">

      {/* ✅ NAVBAR */}
      <ManagerNavbar />

      {/* ✅ CONTENT */}
      <div className="pt-20 px-6">

        {/* HEADER */}
        <div className="max-w-7xl mx-auto flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">📋 Enrollments</h2>

          <button
            onClick={() => setShow(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + New Enrollment
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
            className="bg-blue-100 px-3 py-2 rounded"
          >
            Search
          </button>
          <button
            onClick={fetchEnrollments}
            className="bg-gray-100 px-3 py-2 rounded"
          >
            Reset
          </button>
        </div>
        {/* TABLE */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow">
          <EnrollmentsTable
            enrollments={enrollments}
            onEdit={(e) => {
              setEditData(e);
              setShow(true);
            }}
            onDelete={handleDelete}
            onView={(e) => setSelectedEnrollment(e)}
          />
        </div>

      </div>

      {/* FORM */}
      <EnrollmentFormModel
        show={show}
        handleClose={() => {
          setShow(false);
          setEditData(null);
        }}
        handleSubmit={handleSubmit}
        editData={editData}
      />
      {/* DETAILS */}
      {selectedEnrollment && (
        <EnrollmentsDetails
          enrollment={selectedEnrollment}
          onClose={() => setSelectedEnrollment(null)}
        />
      )}

    </div>
  );
};

export default Enrollments;