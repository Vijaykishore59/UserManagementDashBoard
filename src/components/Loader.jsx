import React from 'react';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] p-6">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="mt-3 text-gray-600 text-sm">Fetching user data...</p>
    </div>
  );
}

