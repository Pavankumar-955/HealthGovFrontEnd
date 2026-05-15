import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Notifications({ isOpen, onClose, notifications }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Side Panel (25% width) */}
      <div className="relative ml-auto h-full w-[35%] min-w-[300px] bg-white shadow-2xl rounded-l-xl">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-200">
          <h2 className="text-lg font-semibold text-blue-800">
            Notifications
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-green-50 transition"
          >
            <XMarkIcon className="h-6 w-6 text-blue-600" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 max-h-[calc(100vh-80px)] overflow-y-auto">

          {notifications.length > 0 ? (
            notifications.map((item) => (

              <div
                key={item.notificationId}
                className="w-full rounded-xl border border-green-200 bg-green-50 p-3 hover:bg-orange-100 transition"
              >
                {/* Message */}
                <p className="font-medium text-sm text-green-800 leading-snug">
                  {item.message}
                </p>

                {/* Category */}
                <p className="mt-1 text-xs text-orange-600 font-bold">
                  {item.category}
                </p>

                {/* Date */}
                <p className="mt-2 text-[11px] text-gray-500 text-right">
                  {item.createdDate
                    ? new Date(item.createdDate).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "No date"}
                </p>
              </div>

            ))
          ) : (
            <p className="text-center text-black-500 py-8">
              No new notifications
            </p>
          )}

        </div>
      </div>
    </div>
  );
}
