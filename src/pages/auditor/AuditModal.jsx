import { XMarkIcon } from "@heroicons/react/24/outline";
import AuditsCard from "./AuditsCard";

const AuditModal = ({ audit, onClose, onUpdateStatus }) => {
  if (!audit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="relative w-full max-w-3xl p-6 bg-white rounded-xl">

        <button
          onClick={onClose}
          className="absolute top-3 right-3"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <AuditsCard
          audit={audit}
          onSave={(data) => onUpdateStatus(data)}  // ✅ correct
          onClose={onClose}
        />

      </div>
    </div>
  );
};

export default AuditModal;