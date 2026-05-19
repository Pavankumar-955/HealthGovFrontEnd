const SummaryCards = ({
  summary = { totalAudits: 0, byStatus: {} }
}) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-3">

      {/* TOTAL */}
      <div className="min-w-[160px] flex-1 bg-green-50 border border-green-200 rounded-2xl p-5 shadow-md">
        <p className="text-xs font-semibold uppercase text-green-700">
          Total
        </p>
        <p className="text-2xl font-bold mt-2">
          {summary.totalAudits || 0}
        </p>
      </div>

      {/* SCHEDULED */}
      <div className="min-w-[160px] flex-1 bg-green-50 border border-green-200 rounded-2xl p-5 shadow-md">
        <p className="text-xs font-semibold uppercase text-green-700">
          Scheduled
        </p>
        <p className="text-2xl font-bold mt-2">
          {summary.byStatus.SCHEDULED || 0}
        </p>
      </div>

      {/* IN REVIEW */}
      <div className="min-w-[160px] flex-1 bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-md">
        <p className="text-xs font-semibold uppercase text-blue-700">
          Review
        </p>
        <p className="text-2xl font-bold mt-2">
          {summary.byStatus.IN_REVIEW || 0}
        </p>
      </div>

      {/* COMPLETED */}
      <div className="min-w-[160px] flex-1 bg-orange-50 border border-orange-200 rounded-2xl p-5 shadow-md">
        <p className="text-xs font-semibold uppercase text-orange-700">
          Completed
        </p>
        <p className="text-2xl font-bold mt-2">
          {summary.byStatus.COMPLETED || 0}
        </p>
      </div>

      {/* FOLLOW UP */}
      <div className="min-w-[160px] flex-1 bg-yellow-50 border border-yellow-200 rounded-2xl p-5 shadow-md">
        <p className="text-xs font-semibold uppercase text-yellow-700">
          Follow Up
        </p>
        <p className="text-2xl font-bold mt-2">
          {summary.byStatus.FOLLOW_UP_REQUIRED || 0}
        </p>
      </div>

      {/* CANCELLED ✅ RED */}
      <div className="min-w-[160px] flex-1 bg-red-50 border border-red-200 rounded-2xl p-5 shadow-md">
        <p className="text-xs font-semibold uppercase text-red-700">
          Cancelled
        </p>
        <p className="text-2xl font-bold mt-2 text-red-800">
          {summary.byStatus.CANCELLED || 0}
        </p>
      </div>

    </div>
  );
};

export default SummaryCards;