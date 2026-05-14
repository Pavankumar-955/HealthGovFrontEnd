import React from "react";

const ResourceTable = ({ data = [], onEdit, onDelete }) => {

  const safeData = Array.isArray(data) ? data : [];

  // ✅ SOFT STATUS COLORS (match infra style)
  const getStatusStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs";
      case "ALLOCATED":
        return "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs";
      case "INACTIVE":
        return "bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs";
      case "COMPLETED":
        return "bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs";
      default:
        return "bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs";
    }
  };

  // ✅ DELETE MESSAGE
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

  // ✅ EDIT MESSAGE
  const getEditMessage = (status) => {
    if (status === "COMPLETED") {
      return "Completed resources cannot be edited";
    }
    return "Edit";
  };

  return (
    <div className="h-full">

      <table className="w-full text-sm  table-auto overflow-x-auto min-w-[600px]">

        {/* ✅ HEADER */}
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-left w-[100px]">ID</th>
            <th className="px-4 py-3 text-left w-[140px]">Type</th>
            <th className="px-4 py-3 text-left w-[140px]">Quantity</th>
            <th className="px-4 py-3 text-left w-[180px]">Status</th>
            <th className="px-4 py-3 text-center w-[160px]">Action</th>
          </tr>
        </thead>

        {/* ✅ BODY */}
        <tbody>
          {safeData.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No Data Found
              </td>
            </tr>
          ) : (
            safeData.map((resource) => {

              const isCompleted = resource.status === "COMPLETED";
              const isDeleteBlocked = ["ACTIVE", "ALLOCATED", "COMPLETED"]
                .includes(resource.status);

              return (
                <tr
                  key={resource.resourceId}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-4 py-3">
                    {resource.resourceId}
                  </td>

                  <td className="px-4 py-3 font-medium">
                    {resource.type}
                  </td>

                  <td className="px-4 py-3">
                    {resource.quantity}
                  </td>

                  {/* ✅ STATUS */}
                  <td className="px-4 py-3">
                    <span className={getStatusStyle(resource.status)}>
                      {resource.status}
                    </span>
                  </td>

                  {/* ✅ ACTIONS */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">

                      {/* EDIT */}
                      <div title={getEditMessage(resource.status)}>
                        <button
                          disabled={isCompleted}
                          onClick={() =>
                            !isCompleted && onEdit(resource)
                          }
                          className={`px-3 py-1 rounded text-xs ${
                            isCompleted
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer"
                          }`}
                        >
                          Edit
                        </button>
                      </div>

                      {/* DELETE */}
                      <div title={getDeleteMessage(resource.status)}>
                        <button
                          disabled={isDeleteBlocked}
                          onClick={() =>
                            !isDeleteBlocked &&
                            onDelete(resource.resourceId)
                          }
                          className={`px-3 py-1 rounded text-xs ${
                            isDeleteBlocked
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer"
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
  );
};

export default ResourceTable;