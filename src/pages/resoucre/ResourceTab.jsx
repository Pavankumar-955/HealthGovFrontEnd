import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getResourcesByProgram,
  searchResourcesByProgram,
  updateResource,
  deleteResource,
  createResource,
} from "../../api/resourceApi";

import toast from "react-hot-toast";

import ResourceSearch from "./ResourceSearch";
import ResourceTable from "./ResourceTable";
import AddResourceModal from "./AddResourceModal";
import EditResourceModal from "./EditResourceModal";

const ResourceTab = ({ programId: propProgramId }) => {
  const { id } = useParams();

  // ✅ SAME fallback logic as Infra
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

  // ✅ LOAD DATA
  const loadResources = async () => {
    if (!programId) return;

    try {
      const res = await getResourcesByProgram(programId);
      setResourceList(res.data || []);
      setOriginalData(res.data || []);
    } catch (err) {
      toast.error(err);
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

    setSearch({
      type: "",
      status: "",
    });

    setResourceList(originalData);
    setPage(1);

    toast.success("Filters cleared ✅");
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource?")) return;

    try {
      await deleteResource(id);
      toast.success("Deleted ✅");
      loadResources();
    } catch (err) {
      toast.error(err);
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

  // ✅ CREATE
  const handleCreate = async (data) => {
    if (data.quantity < 0) {
      toast.error("Quantity must be ≥ 0 ❌");
      return;
    }

    try {
      await createResource({ ...data, programId });
      toast.success("Created ✅");
      setShowAddModal(false);
      loadResources();
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="pt-10 min-h-screen bg-[#eef3f8] px-6">

      {/* ✅ HEADER */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          📦 Resources
        </h2>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700"
        >
          + Add Resource
        </button>
      </div>

      {/* ✅ SEARCH */}
      <div className="max-w-7xl mx-auto bg-white p-4 rounded-xl shadow mb-4">
        <ResourceSearch
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
          onClear={handleClearFilters}
        />
      </div>

      {/* ✅ TABLE */}
      <div className="max-w-7xl mx-auto">
        <ResourceTable
          data={resourceList}
          page={page}
          setPage={setPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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

    </div>
  );
};

export default ResourceTab;