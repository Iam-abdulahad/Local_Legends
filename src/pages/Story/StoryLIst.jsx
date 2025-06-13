import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { motion } from "framer-motion";
import StoryCard from "./StoryCard";
import heroMap from "../../assets/Images/hero-map.png";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black/80 to-[#7D0A0A]/60">
        <div className="w-12 h-12 border-4 border-[#BF3131] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#EEE]">
      {/* Animated Background */}
      <motion.img
        src={heroMap}
        alt="Map Background"
        className="absolute w-full h-full object-cover opacity-30"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#7D0A0A]/60 to-black/80 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 md:px-10 text-white pt-16 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
          Explore Local Legends Shared by the Community
        </h1>
        <p className="text-lg md:text-xl text-[#EAD196] mb-6">
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
