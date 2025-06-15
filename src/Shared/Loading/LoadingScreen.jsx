import LoadingCard from "./LoadingCard";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-[#F9F6EE] flex flex-col justify-center items-center px-4">
      <div className="text-[#7D0A0A] text-xl font-bold mb-6">
        Loading Legendary Stories...
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {Array.from({ length: 6 }).map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;