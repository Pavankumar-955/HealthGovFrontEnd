import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50 px-6">
      
      <div className="max-w-md text-center space-y-6">

        {/* ✅ Animated Icon */}
        <div className="mx-auto h-16 w-16 animate-bounce rounded-full bg-red-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* ✅ Title */}
        <h1 className="text-2xl font-bold text-gray-800">
          Server Unavailable
        </h1>

        {/* ✅ Message */}
        <p className="text-sm text-gray-600">
          HealthGov services are temporarily unavailable.
          <br />
          Please check your connection or try again later.
        </p>

        {/* ✅ Hint */}
        <p className="text-xs text-gray-500">
          Our team has been notified and is working on the issue.
        </p>

        {/* ✅ Action */}
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center rounded-xl bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
        >
          Try Again
        </button>

      </div>
    </div>
  );
};

export default ErrorPage;