import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import LoadingScreen from "../../Shared/Loading/LoadingScreen";
import StoryCard from "./StoryCard";

const LatestStories = () => {
  const { allData, loading } = useData();

  if (loading) return <LoadingScreen />;

  const sortedStories = [...allData].sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;
    return b.createdAt.toDate() - a.createdAt.toDate();
  });

  const latestStories = sortedStories.slice(0, 9);

  return (
    <div className="relative z-20 px-4 md:px-10 text-[#0ABAB5] pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
          Latest Stories Shared by the Community
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Every story is a step into the past. Discover the tales shaping your
          region.
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {latestStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

      {/* Center the button with reduced gap */}
      <div className="flex justify-center mt-10">
        <Link
          to="/stories"
          className="inline-flex items-center gap-3 px-6 py-3 bg-[#0ABAB5] hover:bg-[#089E9A] text-gray-200 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 group"
        >
          See All Stories
        </Link>
      </div>
    </div>
  );
};

export default LatestStories;
