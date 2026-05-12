import React, { useEffect } from "react";

const ResourceTable = ({ data = [], page, setPage, onEdit, onDelete }) => {
  const rowsPerPage = 5;

  // ✅ SAFE DATA
  const safeData = Array.isArray(data) ? data : [];

  const totalPages = Math.max(1, Math.ceil(safeData.length / rowsPerPage));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages, setPage]);

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData =
    safeData.slice(startIndex, startIndex + rowsPerPage);

  // ✅ STATUS STYLE
  const getStatusStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-600 text-white px-3 py-1 rounded-full text-xs";
      case "ALLOCATED":
        return "bg-blue-600 text-white px-3 py-1 rounded-full text-xs";
      case "PENDING":
        return "bg-yellow-500 text-white px-3 py-1 rounded-full text-xs";
      case "INACTIVE":
        return "bg-gray-500 text-white px-3 py-1 rounded-full text-xs";
      case "COMPLETED":
        return "bg-purple-600 text-white px-3 py-1 rounded-full text-xs";
      default:
        return "bg-gray-400 text-white px-3 py-1 rounded-full text-xs";
    }
  };

  // ✅ DYNAMIC DELETE MESSAGE
  const getDeleteMessage = (status) => {
    switch (status) {
      case "COMPLETED":
        return "Completed resources cannot be deleted";
      case "ALLOCATED":
        return "Allocated resources cannot be deleted";
      case "ACTIVE":
        return "Active resources cannot be deleted";
      default:
        return "Delete";
    }
  };

  // ✅ DYNAMIC EDIT MESSAGE
  const getEditMessage = (status) => {
    if (status === "COMPLETED") {
      return "Completed resources cannot be edited";
    }
    return "Edit";
  };

  return (
    <div>

      {/* ✅ TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow">

          {/* HEADER */}
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Type</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-5 text-gray-500">
                  No Data Found
                </td>
              </tr>
            ) : (
              paginatedData.map((resource) => {

                const isCompleted = resource.status === "COMPLETED";
                const isDeleteBlocked = ["ACTIVE", "ALLOCATED", "COMPLETED"]
                  .includes(resource.status);

                return (
                  <tr
                    key={resource.resourceId}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-3">{resource.resourceId}</td>
                    <td className="p-3">{resource.type}</td>
                    <td className="p-3">{resource.quantity}</td>

                    {/* STATUS */}
                    <td className="p-3">
                      <span className={getStatusStyle(resource.status)}>
                        {resource.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-3">
                      <div className="flex justify-center gap-3">

                        {/* ✅ EDIT */}
                        <div title={getEditMessage(resource.status)}>
                          <button
                            disabled={isCompleted}
                            onClick={() =>
                              !isCompleted && onEdit(resource)
                            }
                            className={`px-4 py-1 rounded-lg text-sm ${
                              isCompleted
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                            }`}
                          >
                            Edit
                          </button>
                        </div>

                        {/* ✅ DELETE */}
                        <div title={getDeleteMessage(resource.status)}>
                          <button
                            disabled={isDeleteBlocked}
                            onClick={() =>
                              !isDeleteBlocked &&
                              onDelete(resource.resourceId)
                            }
                            className={`px-4 py-1 rounded-lg text-sm ${
                              isDeleteBlocked
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                            }`}
                          >
                            Delete
                          </button>
                        </div>

                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>

      {/* ✅ PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-6">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-lg shadow text-sm ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-700 cursor-pointer"
          }`}
        >
          Prev
        </button>

        <span className="text-sm font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-lg shadow text-sm ${
            page === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-700 cursor-pointer"
          }`}
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default ResourceTable;