import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getResourcesByProgram,
  searchResourcesByProgram,
  updateResource,
  deleteResource,
  createResource,
} from "../../../api/resourceApi";

import toast from "react-hot-toast";

import ResourceSearch from "./ResourceSearch";
import ResourceTable from "./ResourceTable";
import AddResourceModal from "./AddResourceModal";
import EditResourceModal from "./EditResourceModal";
import DeleteResourceModal from "./DeleteResourceModal";

const ResourceTab = ({ programId: propProgramId }) => {
  const { id } = useParams();
  const programId = propProgramId || id;

  const [resourceList, setResourceList] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState({
    type: "",
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
const loadResources = async () => {
  if (!programId) return;

  try {
    setLoading(true);   // ✅ start loading
    setError(false);    // ✅ reset error

    const res = await getResourcesByProgram(programId);

    setResourceList(res.data || []);
    setOriginalData(res.data || []);

  } catch (err) {
    setError(true);     // ✅ error state
    toast.error("Failed to load resources ❌");

  } finally {
    setLoading(false);  // ✅ stop loading
  }
};

  useEffect(() => {
    loadResources();
  }, [programId]);

  // ✅ SEARCH
  const handleSearch = async () => {
    if (!search.type && !search.status) {
      setResourceList(originalData);
      toast("Showing all resources ✅");
      return;
    }

    try {
      const res = await searchResourcesByProgram(
        programId,
        search.type || null,
        search.status || null
      );

      setResourceList(res.data || []);
      setPage(1);
    } catch (err) {
      toast.error(err);
    }
  };

  // ✅ CLEAR FILTERS
  const handleClearFilters = () => {
    if (!search.type && !search.status) {
      toast("Already showing all ✅");
      return;
    }

    setSearch({ type: "", status: "" });
    setResourceList(originalData);
    setPage(1);

    toast.success("Filters cleared ✅");
  };

  // ✅ DELETE
  const handleDelete = (id) => {
    const fullResource = originalData.find(
      (item) => item.resourceId === id
    );

    setDeleteData(fullResource);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (id) => {
    try {
      await deleteResource(id);
      toast.success("Deleted ✅");
      setShowDeleteModal(false);
      loadResources();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  // ✅ EDIT
  const handleEdit = (resource) => {
    setEditData({ ...resource });
    setShowEditModal(true);
  };

  // ✅ UPDATE
  const handleUpdate = async (data) => {
    if (data.quantity < 0) {
      toast.error("Quantity must be ≥ 0 ❌");
      return;
    }

    try {
      await updateResource(data.resourceId, data);
      toast.success("Updated ✅");
      setShowEditModal(false);
      loadResources();
    } catch (err) {
      toast.error(err);
    }
  };

const mapBackendErrorForResource = (err) => {
  if (!err) return "Something went wrong";

  const message = err.toString().toLowerCase();

  if (message.includes("program") && message.includes("status")) {
    return "Resources can be assigned only for active programs";
  }

  if (message.includes("program") && message.includes("not found")) {
    return "Selected program does not exist";
  }

  if (message.includes("quantity")) {
    return "Resource quantity is invalid";
  }

  if (message.includes("funds") && message.includes("inactive")) {
    return "Inactive funds cannot be allocated";
  }

  if (message.includes("completed")) {
    return "Completed resources cannot be modified or reused";
  }

  if (message.includes("duplicate")) {
    return "This resource already exists for the program";
  }

  return err; // ✅ fallback (backend message)
};
 // ✅ CREATE RESOURCE (WITH CUSTOM ERROR HANDLING)
const handleCreate = async (data) => {
  if (data.quantity < 0) {
    toast.error("Quantity must be ≥ 0 ❌");
    return;
  }

  try {
    await createResource({ ...data, programId });
    toast.success("Resource Assigned ✅");
    setShowAddModal(false);
    loadResources();
  } catch (err) {
    toast.error(mapBackendErrorForResource(err));
  }
};

if (loading) {
  return (
    <div className="flex justify-center items-center h-64 pl-[50%]">
      <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full" />
    </div>
  );
}
if (error) {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh] text-center pl-[35%]">

      <h2 className="text-lg font-semibold text-red-600 mb-2">
        Resources Server Unavailable 🚫
      </h2>

      <p className="text-gray-500 mb-4">
        Unable to load resources for this program.
      </p>

      <button
        onClick={loadResources}  // ✅ better retry
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700  cursor-pointer transition"
      >
        Retry
      </button>

    </div>
  );
}
  return (
    <div className="flex flex-col flex-1 min-h-0 ">

      {/* ✅ HEADER (matched infra) */}
      <div className="flex justify-between items-center mb-2 pl-6 pt-4 pr-6">
        <h2 className="text-lg font-semibold">
          Resources
        </h2>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm hover:bg-green-200 cursor-pointer transition"
        >
          + Add Resource
        </button>
      </div>

      {/* ✅ SEARCH */}
      <div className="bg-white p-4 rounded-xl shadow mb-3">
        <ResourceSearch
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
          onClear={handleClearFilters}
        />
      </div>

      {/* ✅ TABLE (same scroll structure as infra) */}
      <div className="flex-1 min-h-0 flex flex-col">

        <div className="flex-1 min-h-0 bg-white rounded-xl shadow overflow-auto flex flex-col">

          {/* ✅ ONLY THIS SCROLLS */}
          <div className="flex-1 min-h-0 overflow-auto">
    
            <ResourceTable
              data={resourceList}
              page={page}
              setPage={setPage}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

        </div>

      </div>

      {/* ✅ MODALS */}
      <AddResourceModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreate={handleCreate}
      />

      <EditResourceModal
        show={showEditModal}
        data={editData}
        onClose={() => setShowEditModal(false)}
        onUpdate={handleUpdate}
      />

      <DeleteResourceModal
        show={showDeleteModal}
        data={deleteData}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default ResourceTab;