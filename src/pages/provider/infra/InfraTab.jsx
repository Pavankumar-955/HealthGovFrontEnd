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
import DeleteInfraModal from "./DeleteInfraModal";

const InfraTab = ({ programId: propProgramId }) => {
  const { id } = useParams();
  const programId = propProgramId || id;

  const [infraList, setInfraList] = useState([]);
  const [originalData, setOriginalData] = useState([]);

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

  const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

  // ✅ LOAD DATA
const loadInfra = async () => {
  if (!programId) return;

  try {
    setLoading(true);   // ✅ start loading
    setError(false);    // ✅ reset error

    const res = await getInfraByProgram(programId);
    setInfraList(res.data || []);
    setOriginalData(res.data || []);

  } catch {
    setError(true);     // ✅ mark error
    toast.error("Failed to load infrastructure ❌");

  } finally {
    setLoading(false);  // ✅ stop loading
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
    } catch {
      toast.error("Search failed ❌");
    }
  };

  // ✅ CLEAR FILTER
  const handleClearFilters = () => {
    if (!search.type && !search.location && !search.status) {
      toast("Already showing all ✅");
      return;
    }

    setSearch({ type: "", location: "", status: "" });
    setInfraList(originalData);
    toast.success("Filters cleared ✅");
  };

  // ✅ DELETE
  const handleDelete = (id) => {
    const full = originalData.find((i) => i.infraId === id);
    setDeleteData(full);
    setShowDeleteModal(true);
  };

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

  const mapBackendError = (err) => {
  if (!err) return "Something went wrong";

  if (err.includes("program with status")) {
    return "Infrastructure can be assigned only for active programs";
  }

  if (err.includes("not found")) {
    return "Selected program does not exist";
  }

  if (err.includes("capacity")) {
    return "Infrastructure capacity is invalid";
  }

  return err; // fallback
};
  // ✅ CREATE
  const handleCreate = async (data) => {
  if (data.capacity < 0) {
    toast.error("Capacity must be ≥ 0 ❌");
    return;
  }

  try {
    await createInfra({ ...data, programId });
    toast.success("Infrastructure Assigned ✅");
    setShowAddModal(false);
    loadInfra();
  } catch (err) {
    toast.error(mapBackendError(err)); // ✅ customized message
  }
};

if (loading) {
  return (
    <div className="flex justify-center items-center h-64 text-center pl-[50%]">
      <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full" />
    </div>
  );
}

if (error) {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh] text-center pl-[35%]">

      <h2 className="text-lg font-semibold text-red-600 mb-2">
        Infrastructure Server Unavailable 🚫
      </h2>

      <p className="text-gray-500 mb-4">
        Unable to load infrastructure data for this program.
      </p>

      <button
        onClick={loadInfra}   // ✅ retry without reload
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer transition"
      >
        Retry
      </button>

    </div>
  );
}
  return (
    <div className="flex flex-col flex-1 min-h-0">

      {/* ✅ HEADER */}
      <div className="flex justify-between items-center mb-2 pl-6 pt-4 pr-6">
        <h2 className="text-lg font-semibold ">Infrastructure</h2>

        <button
  onClick={() => setShowAddModal(true)}
  className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm hover:bg-green-200 cursor-pointer transition"
>
  + Add Infrastructure
</button>

      </div>

      {/* ✅ SEARCH */}
      <div className="bg-white p-4 rounded-xl shadow mb-3">
        <InfraSearch
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
          onClear={handleClearFilters}
        />
      </div>

      {/* ✅ ✅ FIXED TABLE LAYOUT */}
      <div className="flex-1 min-h-0 flex flex-col">

        <div className="flex-1 min-h-0 bg-white rounded-xl shadow overflow-hidden flex flex-col">

          {/* ✅ ONLY THIS SCROLLS */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <InfraTable
              data={infraList}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

        </div>

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