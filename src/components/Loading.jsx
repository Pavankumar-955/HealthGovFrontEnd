import React from "react";

const Loading = ({ text = "Processing, please wait…" }) => {
  return (
    <div className="flex items-center justify-center gap-4 py-10">
      
      {/* Spinner */}
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>

      {/* Text */}
      <p className="text-sm font-medium text-gray-600">
        {text}
      </p>

    </div>
  );
};

export default Loading;