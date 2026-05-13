import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Notifications({ isOpen, onClose, notifications }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Side Panel */}
      <div className="relative ml-auto h-full w-full max-w-md bg-white shadow-2xl rounded-l-3xl">
        <div className="flex items-center justify-between p-4 border-b border-emerald-200">
          <h2 className="text-lg font-semibold text-emerald-800">Notifications</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-emerald-50 transition"
          >
            <XMarkIcon className="h-6 w-6 text-emerald-600" />
          </button>
        </div>
        
        <div className="p-4 space-y-3 max-h-[calc(100vh-80px)] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <div key={item.id} className="rounded-3xl border border-emerald-100 bg-emerald-50 p-4 hover:bg-emerald-100 transition">
                <p className="font-semibold text-emerald-800">{item.title}</p>
                <p className="mt-1 text-sm text-emerald-600">{item.subtitle}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-emerald-500 py-8">No new notifications</p>
          )}
        </div>
      </div>
    </div>
  );
}