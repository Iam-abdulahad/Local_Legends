import React from "react";

const LoadingCard = () => {
  return (
    <div className="animate-pulse bg-white shadow-md rounded-2xl p-4 w-full max-w-md mx-auto mb-6">
      <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="flex space-x-2 mt-4">
        <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
        <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default LoadingCard;