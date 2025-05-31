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
          const reactions = data.reactions || [];
          const savedBy = data.savedBy || [];
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
      className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition"
    >
      <Link to={`/stories/${story.id}`}>
        <h2 className="text-xl font-bold text-[#7D0A0A] mb-2">
          {story.title || "Untitled Story"}
        </h2>
        <p className="text-gray-600 line-clamp-3">
          {story.story || "No story content available."}
        </p>
      </Link>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleReaction}
          className={`text-lg flex items-center gap-1 transition ${
            hasReacted ? "text-red-500" : "text-gray-500"
          }`}
          aria-label="React to story"
        >
          <FaHeart />
        </button>
        <button
          onClick={handleSave}
          className="text-lg text-gray-500 hover:text-[#7D0A0A] transition"
          aria-label="Save story"
        >
          {isSaved ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>
    </motion.div>
  );
};

export default StoryCard;
