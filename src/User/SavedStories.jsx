import { FaBookmark } from "react-icons/fa";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContex";

const SavedStories = () => {
  const { allData, loading: storiesLoading } = useData();
  const { userData, loading: authLoading } = useAuth();

  const loading = storiesLoading || authLoading;

  if (loading) return <div className="text-center py-10">Loading saved stories...</div>;

  console.log("All stories:", allData);
  console.log("User data:", userData);

  if (!allData || !userData) return <div>Something went wrong loading data</div>;

  const savedIds = userData.savedStories || [];
  const savedStories = allData.filter((story) =>
    savedIds.includes(story.id)
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaBookmark className="text-blue-500" /> Saved Stories
      </h1>

      {savedStories.length === 0 ? (
        <p className="text-gray-500">You haven’t saved any stories yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedStories.map((story) => (
            <div
              key={story.id}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition duration-300 border border-gray-100"
            >
              <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
              <p className="text-gray-600 line-clamp-3">{story.description}</p>
              <p className="text-sm text-right mt-4 text-blue-500">
                — {story.author || "Anonymous"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedStories;
