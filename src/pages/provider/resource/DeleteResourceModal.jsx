import React from "react";

const getStatusStyle = (status) => {
    switch (status) {
        case "PENDING":
            return "bg-yellow-500 text-white";

        case "ACTIVE":
            return "bg-green-600 text-white";

        case "COMPLETED":
            return "bg-blue-600 text-white";

        case "INACTIVE":
            return "bg-gray-500 text-white";

        case "ALLOCATED":
            return "bg-purple-600 text-white";

        default:
            return "bg-gray-400 text-white";
    }
};

const DeleteResourceModal = ({ show, data, onConfirm, onCancel }) => {
    if (!show || !data) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-2">
                        <span className="text-xl text-red-600">⚠️</span>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Delete Resource
                        </h3>
                    </div>

                    <button
                        onClick={onCancel}
                        className="text-gray-500 hover:text-black text-lg cursor-pointer"
                    >
                        ✖
                    </button>
                </div>

                {/* MESSAGE */}
                <p className="text-sm text-gray-600 mb-5">
                    Are you sure you want to delete this resource?
                </p>

                {/* DETAILS */}
                <div className="bg-gray-50 rounded-lg border p-4 mb-5 space-y-2 text-sm">

                    <p>
                        <span className="text-gray-500 mr-2">ID:</span>
                        <span className="font-medium">{data.resourceId}</span>
                    </p>

                    <p>
                        <span className="text-gray-500 mr-2">Type:</span>
                        <span className="font-medium">{data.type}</span>
                    </p>

                    <p>
                        <span className="text-gray-500 mr-2">Quantity:</span>
                        <span className="font-medium">{data.quantity}</span>
                    </p>

                    <p>
                        <span className="text-gray-500 mr-2">Status:</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusStyle(data.status)}`}>
                            {data.status}
                        </span>
                    </p>

                </div>

                {/* WARNING */}
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-lg mb-6">

                    {/* Bigger Icon */}
                    <span className="text-2xl leading-none">⚠️</span>

                    {/* Two-line Text */}
                    <p className="leading-snug">
                        <span className="font-medium block">
                            This action cannot be undone.
                        </span>
                        <span className="block text-xs">
                            Please confirm before deleting.
                        </span>
                    </p>
                </div>


                {/* BUTTONS */}
                <div className="flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onConfirm(data.resourceId)}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                    >
                        Delete
                    </button>

                </div>

            </div>
        </div>
    );
};

export default DeleteResourceModal;