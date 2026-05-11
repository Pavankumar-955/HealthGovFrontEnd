
import React, { useState } from "react";
import {
  FolderIcon,
  DocumentIcon,
  CurrencyDollarIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ComplianceCard from "./ComplianceCard";

const ComplianceCardModal = ({ record, onClose, onSave }) => {
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl bg-blue-50 border border-blue-200 text-black">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white shadow hover:bg-gray-100 transition flex items-center justify-center"
          aria-label="Close"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        <div className="p-8">
          <ComplianceCard record={record} onClose={onClose} onSave={onSave} />
        </div>
      </div>
    </div>
  );
};


export default ComplianceCardModal;