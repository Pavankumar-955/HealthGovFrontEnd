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
        <>
            {/* ✅ BLUR BACKGROUND (same as infra) */}
            <div
                className="fixed inset-0 backdrop-blur-sm bg-black/10 z-[9998]"
                onClick={onCancel}
            />

            {/* ✅ MODAL */}
            <div className="fixed inset-0 flex items-center justify-center z-[9999]">

                <div
                    className="bg-white w-full max-w-md rounded-xl shadow-xl p-6"
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* ✅ HEADER (matched) */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-lg text-red-500">⚠️</span>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Delete Resource
                            </h3>
                        </div>

                        <button
                            onClick={onCancel}
                            className="text-gray-400 hover:text-gray-700 text-lg cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>

                    {/* ✅ MESSAGE */}
                    <p className="text-sm text-gray-600 mb-4">
                        Are you sure you want to delete this resource?
                    </p>

                    {/* ✅ INFO CARD (matched spacing/borders) */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5 space-y-2 text-sm">

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
                            <span
                                className={`px-2 py-0.5 rounded-full text-xs ${getStatusStyle(
                                    data.status
                                )}`}
                            >
                                {data.status}
                            </span>
                        </p>

                    </div>

                    {/* ✅ WARNING BOX (infra style) */}
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-5">

                        <span className="text-lg leading-none">⚠️</span>

                        <div>
                            <p className="font-medium">
                                This action cannot be undone.
                            </p>
                            <p className="text-xs">
                                Please confirm before deleting.
                            </p>
                        </div>

                    </div>

                    {/* ✅ BUTTONS (matched style) */}
                    <div className="flex justify-end gap-3">

                        <button
                            onClick={onCancel}
                            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 cursor-pointer transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => onConfirm(data.resourceId)}
                            className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer transition"
                        >
                            Delete
                        </button>

                    </div>

                </div>
            </div>
        </>
    );
};

export default DeleteResourceModal;
