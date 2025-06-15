const UpdateProfileLoading = () => {
  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="animate-pulse bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl space-y-6">
        {/* Page Title */}
        <div className="h-6 w-1/3 bg-gray-200 rounded"></div>

        {/* Profile Picture Placeholder */}
        <div className="flex justify-center">
          <div className="w-28 h-28 rounded-full bg-gray-200"></div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded"></div>

          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded"></div>

          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded"></div>

          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>

        {/* Save Button Placeholder */}
        <div className="w-32 h-10 bg-gray-200 rounded-lg mx-auto mt-6"></div>
      </div>
    </div>
  );
};

export default UpdateProfileLoading;
