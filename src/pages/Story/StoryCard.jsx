import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegBookmark, FaBookmark, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../context/AuthContex";

const StoryCard = ({ story }) => {
  const { currentUser } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [hasReacted, setHasReacted] = useState(false);

  useEffect(() => {
    if (!story || !story.id || !currentUser) return;

    const checkReaction = async () => {
      try {
        const docRef = doc(db, "stories", story.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const reactions = Array.isArray(data.reactions) ? data.reactions : [];
          const savedBy = Array.isArray(data.savedBy) ? data.savedBy : [];

          setHasReacted(reactions.includes(currentUser.uid));
          setIsSaved(savedBy.includes(currentUser.uid));
        }
      } catch (error) {
        console.error("Error checking reactions:", error);
      }
    };

    checkReaction();
  }, [currentUser, story]);

  const handleReaction = async () => {
    if (!currentUser) return alert("Please log in to react.");
    if (!story?.id) return;

    const storyRef = doc(db, "stories", story.id);

    try {
      await updateDoc(storyRef, {
        reactions: hasReacted
          ? arrayRemove(currentUser.uid)
          : arrayUnion(currentUser.uid),
      });
      setHasReacted(!hasReacted);
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };

  const handleSave = async () => {
    if (!currentUser) return alert("Please log in to save stories.");
    if (!story?.id) return;

    const storyRef = doc(db, "stories", story.id);

    try {
      await updateDoc(storyRef, {
        savedBy: isSaved
          ? arrayRemove(currentUser.uid)
          : arrayUnion(currentUser.uid),
      });
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error saving story:", error);
    }
  };

  // Prevent rendering if story is missing
  if (!story || !story.id) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 max-w-4xl mx-auto bg-white"
    >
      {/* Image or background */}
      <Link to={`/stories/${story.id}`} className="block md:flex">
        <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-tr from-[#7D0A0A] to-pink-300 flex items-center justify-center text-white text-3xl font-bold">
          {/* Replace this div with an actual <img src={...}/> if you have a thumbnail */}
          IMG
        </div>

        {/* Text content */}
        <div className="flex-1 p-6 md:p-8 space-y-3">
          <h2 className="text-2xl font-extrabold text-gray-800 group-hover:text-[#7D0A0A] transition-colors duration-200">
            {story.title || "Untitled Story"}
          </h2>
          <p className="text-gray-600 line-clamp-4 leading-relaxed text-base">
            {story.story || "No story content available."}
          </p>
        </div>
      </Link>

      {/* Floating action area */}
      <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-md rounded-full px-4 py-2 flex gap-4 items-center shadow-md">
        <button
          onClick={handleReaction}
          className={`flex items-center gap-1 text-sm font-medium transition ${
            hasReacted ? "text-red-500" : "text-gray-500 hover:text-red-400"
          }`}
          aria-label="React to story"
        >
          <FaHeart className="text-lg" />
        </button>

        <button
          onClick={handleSave}
          className="text-gray-500 hover:text-[#7D0A0A] transition-colors"
          aria-label="Save story"
        >
          {isSaved ? (
            <FaBookmark className="text-lg" />
          ) : (
            <FaRegBookmark className="text-lg" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default StoryCard;
