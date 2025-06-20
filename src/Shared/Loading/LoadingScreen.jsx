import LoadingCard from "./LoadingCard";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {Array.from({ length: 6 }).map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;