import React from "react";

const InfraTable = ({ data = [], onEdit, onDelete }) => {
  const safeData = Array.isArray(data) ? data : [];

  //  SOFT STATUS COLORS (MANAGER STYLE )
  const getStatusStyle = (status) => {
    switch (status) {
      case "OPERATIONAL":
        return "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs";
      case "UNDER_MAINTENANCE":
        return "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs";
      case "TEMPORARILY_CLOSED":
        return "bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs";
      case "DECOMMISSIONED":
        return "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs";
      default:
        return "bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs";
    }
  };

  return (
    <div className="h-full">

      <table className="w-full text-sm">

        {/*  HEADER */}
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-left w-[80px]">ID</th>
            <th className="px-4 py-3 text-left w-[140px]">Type</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-left w-[120px]">Capacity</th>
            <th className="px-4 py-3 text-left w-[180px]">Status</th>
            <th className="px-4 py-3 text-center w-[160px]">Action</th>
          </tr>
        </thead>

        {/*  BODY */}
        <tbody>
          {safeData.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No Data Found
              </td>
            </tr>
          ) : (
            safeData.map((infra) => {
              const isEditDisabled =
                infra.status === "DECOMMISSIONED";

              const isDeleteBlocked =
                infra.status === "OPERATIONAL" ||
                infra.status === "DECOMMISSIONED";

              return (
                <tr
                  key={infra.infraId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{infra.infraId}</td>
                  <td className="px-4 py-3 font-medium">{infra.type}</td>
                  <td className="px-4 py-3">{infra.location}</td>
                  <td className="px-4 py-3">{infra.capacity}</td>

                  {/*  STATUS */}
                  <td className="px-4 py-3">
                    <span className={getStatusStyle(infra.status)}>
                      {infra.status}
                    </span>
                  </td>

                  {/*  ACTION */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">

                      <div title={isEditDisabled ? "Cannot edit decommissioned infra" : "Edit"}>
                        <button
                          disabled={isEditDisabled}
                          onClick={() => !isEditDisabled && onEdit(infra)}
                          className={`px-3 py-1 rounded text-xs ${isEditDisabled
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer"
                            }`}
                        >
                          Edit
                        </button>
                      </div>

                      <div title={
                        isDeleteBlocked
                          ? "Cannot delete operational or decommissioned infra"
                          : "Delete"
                      }>
                        <button
                          disabled={isDeleteBlocked}
                          onClick={() =>
                            !isDeleteBlocked && onDelete(infra.infraId)
                          }
                          className={`px-3 py-1 rounded text-xs ${isDeleteBlocked
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

export default InfraTable;
