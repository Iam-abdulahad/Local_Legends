// src/pages/SavedStories.jsx
import { FaBookmark } from "react-icons/fa";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContex";
import StoryCard from "../pages/Story/StoryCard";

const SavedStories = () => {
  const { allData, loading: storiesLoading } = useData();
  const { userData, loading: authLoading } = useAuth();

  const loading = storiesLoading || authLoading;
  if (loading)
    return <div className="text-center py-10">Loading saved stories...</div>;

  if (!allData || !userData)
    return <div>Something went wrong loading data.</div>;

  const savedIds = userData.savedStories || [];
  const savedStories = allData.filter((story) => savedIds.includes(story.id));

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaBookmark className="text-yellow-500" /> Saved Stories
      </h1>

      {savedStories.length === 0 ? (
        <p className="text-gray-500">You haven’t saved any stories yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {savedStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedStories;
