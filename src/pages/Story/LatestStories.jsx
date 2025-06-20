import { useData } from "../../context/DataContext";
import LoadingScreen from "../../Shared/Loading/LoadingScreen";
import StoryCard from "./StoryCard";

const LatestStories = () => {
  const { allData, loading } = useData();

  if (loading)
    return (
      <LoadingScreen></LoadingScreen>
    );

  // Sort by createdAt descending
  const sortedStories = [...allData].sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;
    return b.createdAt.toDate() - a.createdAt.toDate();
  });

  const latestStories = sortedStories.slice(0, 9); // Show top 4 latest stories

  return (
    <div className="relative z-20  px-4 md:px-10 text-[#0ABAB5] pb-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
          Latest Stories Shared by the Community
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Every story is a step into the past. Discover the tales shaping your
          region.
        </p>
      </div>

      <div className="relative z-20 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-20">
        {latestStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default LatestStories;
