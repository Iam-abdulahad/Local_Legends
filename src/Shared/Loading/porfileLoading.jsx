const ProfileLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <div className="animate-pulse bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        {/* Avatar & Name Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 sm:mb-0"></div>
          <div className="flex-1 w-full space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        {/* Bio/Description */}
        <div className="mt-6 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Stats / Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
          <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
          <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
