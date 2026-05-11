const SummaryCards = ({ summary = { totalRecords: 0, byResult: {}, byType: {} }}) => {
   return (
    <div className="flex gap-4 overflow-x-auto pb-2">

      {/* TOTAL */}
      <div className="min-w-[200px] flex-1 bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-green-700 uppercase">
          Total Records
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {summary.totalRecords || 0}
        </p>
      </div>

      {/* COMPLIANT */}
      <div className="min-w-[200px] flex-1 bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-green-700 uppercase">
          Compliant
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {summary.byResult.COMPLIANT || 0}
        </p>
      </div>

      {/* PARTIALLY COMPLIANT */}
      <div className="min-w-[200px] flex-1 bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-blue-700 uppercase">
          Partially Compliant
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {summary.byResult.PARTIALLY_COMPLIANT || 0}
        </p>
      </div>

      {/* NON COMPLIANT */}
      <div className="min-w-[200px] flex-1 bg-orange-50 border border-orange-200 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-orange-700 uppercase">
          Non Compliant
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {summary.byResult.NON_COMPLIANT || 0}
        </p>
      </div>

      {/* UNDER REVIEW */}
      <div className="min-w-[200px] flex-1 bg-yellow-50 border border-yellow-200 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-yellow-700 uppercase">
          Under Review
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {summary.byResult.UNDER_REVIEW || 0}
        </p>
      </div>

    </div>
  );
};

export default SummaryCards;