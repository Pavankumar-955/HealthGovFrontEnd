import React from "react";
import { FaTimes } from "react-icons/fa";
 
export default function ProgramDetailsModal({ program, onClose }) {
  if (!program) return null;
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Program Details</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{program.title}</h2>
            <p className="text-sm text-slate-500">
              {program.startDate} → {program.endDate} • {program.status}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close details"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
 
        <div className="space-y-6 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Program ID</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{program.programId}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Budget</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">₹{program.budget}</p>
            </div>
          </div>
 
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-bold text-slate-900">Description</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{program.description}</p>
          </div>
 
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Dates</h3>
              <p className="mt-2 text-sm text-slate-600">{program.startDate} to {program.endDate}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Status</h3>
              <p className="mt-2 text-sm text-slate-600">{program.status}</p>
            </div>
          </div>
 
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}