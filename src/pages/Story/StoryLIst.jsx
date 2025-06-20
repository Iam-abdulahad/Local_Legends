import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";;
import StoryCard from "./StoryCard";
import LoadingScreen from "../../Shared/Loading/LoadingScreen";

const StoriesList = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "stories"));
        const storyData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStories(storyData);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
     <LoadingScreen></LoadingScreen>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Content */}
      <div className="relative z-20 text-center px-4 md:px-10 text-[#0ABAB5] pt-16 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
          Explore Local Legends Shared by the Community
        </h1>
        <p className="text-lg md:text-xl text-gray-800 mb-6">
          Every story is a step into the past. Discover the tales shaping your region.
        </p>
      </div>

      {/* Story Cards */}
      <div className="relative z-20 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-20">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default StoriesList;
