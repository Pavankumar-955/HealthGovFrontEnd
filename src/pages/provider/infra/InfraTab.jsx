import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getInfraByProgram,
  searchInfraByProgram,
  updateInfra,
  deleteInfra,
  createInfra,
} from "../../../api/infraApi";

import toast from "react-hot-toast";

import InfraSearch from "./InfraSearch";
import InfraTable from "./InfraTable";
import AddInfraModal from "./AddInfraModal";
import EditInfraModal from "./EditInfraModal";
import DeleteInfraModal from "./DeleteInfraModal"; // ✅ IMPORTANT

const InfraTab = ({ programId: propProgramId }) => {
  const { id } = useParams();

  // ✅ fallback logic
  const programId = propProgramId || id;

  const [infraList, setInfraList] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState({
    type: "",
    location: "",
    status: "",
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  // ✅ LOAD DATA
  const loadInfra = async () => {
    if (!programId) return;

    try {
      const res = await getInfraByProgram(programId);
      setInfraList(res.data || []);
      setOriginalData(res.data || []);
    } catch {
      toast.error("Failed to load infrastructure ❌");
    }
  };

  useEffect(() => {
    loadInfra();
  }, [programId]);

  // ✅ SEARCH
  const handleSearch = async () => {
    if (!search.type && !search.location && !search.status) {
      setInfraList(originalData);
      toast("Showing all infrastructure ✅");
      return;
    }

    try {
      const res = await searchInfraByProgram(
        programId,
        search.type || null,
        search.location || null,
        search.status || null
      );

      setInfraList(res.data || []);
      setPage(1);
    } catch {
      toast.error("Search failed ❌");
    }
  };

  // ✅ CLEAR
  const handleClearFilters = () => {
    if (!search.type && !search.location && !search.status) {
      toast("Already showing all ✅");
      return;
    }

    setSearch({
      type: "",
      location: "",
      status: "",
    });

    setInfraList(originalData);
    setPage(1);

    toast.success("Filters cleared ✅");
  };

  // ✅ OPEN DELETE MODAL
const handleDelete = (id) => {
  // ✅ find full object using ID
  const fullInfra = originalData.find(
    (item) => item.infraId === id
  );

  console.log("FULL DELETE DATA:", fullInfra);

  setDeleteData(fullInfra);
  setShowDeleteModal(true);
};


  // ✅ CONFIRM DELETE
  const confirmDelete = async (id) => {
    try {
      await deleteInfra(id);
      toast.success("Deleted ✅");
      setShowDeleteModal(false);
      loadInfra();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  // ✅ EDIT
  const handleEdit = (infra) => {
    setEditData({ ...infra });
    setShowEditModal(true);
  };

  // ✅ UPDATE
  const handleUpdate = async (data) => {
    if (data.capacity < 0) {
      toast.error("Capacity must be ≥ 0 ❌");
      return;
    }

    try {
      await updateInfra(data.infraId, data);
      toast.success("Updated ✅");
      setShowEditModal(false);
      loadInfra();
    } catch {
      toast.error("Update failed ❌");
    }
  };

  // ✅ CREATE
  const handleCreate = async (data) => {
    if (data.capacity < 0) {
      toast.error("Capacity must be ≥ 0 ❌");
      return;
    }

    try {
      await createInfra({ ...data, programId });
      toast.success("Created ✅");
      setShowAddModal(false);
      loadInfra();
    } catch {
      toast.error("Create failed ❌");
    }
  };

  return (
    <div className="pt-10 min-h-screen bg-[#eef3f8] px-6">

      {/* ✅ HEADER */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          🏗 Infrastructure
        </h2>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 cursor-pointer text-sm"
        >
          + Add Infrastructure
        </button>
      </div>

      {/* ✅ SEARCH */}
      <div className="max-w-7xl mx-auto bg-white p-4 rounded-xl shadow mb-4">
        <InfraSearch
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
          onClear={handleClearFilters}
        />
      </div>

      {/* ✅ TABLE */}
      <div className="max-w-7xl mx-auto">
        <InfraTable
          data={infraList}
          page={page}
          setPage={setPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* ✅ MODALS */}
      <AddInfraModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreate={handleCreate}
      />

      <EditInfraModal
        show={showEditModal}
        data={editData}
        onClose={() => setShowEditModal(false)}
        onUpdate={handleUpdate}
      />

      <DeleteInfraModal
        show={showDeleteModal}
        data={deleteData}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

    </div>
  );
};

export default InfraTab;