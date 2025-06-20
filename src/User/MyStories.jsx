import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContex";
import { useData } from "../context/DataContext";

const MyStories = () => {
  const { currentUser } = useAuth();
  const { allData, loading } = useData();
  const [myStories, setMyStories] = useState([]);

  useEffect(() => {
    if (currentUser && allData.length > 0) {
      const filtered = allData.filter(
        (story) => story.userInfo && story.userInfo[2] === currentUser.uid
      );
      setMyStories(filtered);
    }
  }, [currentUser, allData]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading your stories...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="text-center py-10 text-red-500">
        Please log in to view your stories.
      </div>
    );
  }

  if (myStories.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        You haven't submitted any stories yet.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Submitted Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myStories.map((story) => (
          <div
            key={story.id}
            className="bg-[#F2EFE7] shadow-md rounded-2xl p-5 border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {story.title}
            </h3>
            <p className="text-gray-700 mb-3 text-sm">
              {story.story.slice(0, 200)}...
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {story.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-400">
              Submitted by: {story.userInfo[0]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyStories;
