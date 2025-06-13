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

  if (!story || !story.id) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden transition duration-300"
    >
      <div className="p-4 flex flex-col flex-1">
        <h5 className="mb-2 text-slate-800 text-xl font-semibold">
          {story.title || "Untitled Story"}
        </h5>
        <p className="text-slate-600 leading-relaxed font-light line-clamp-4">
          {story.story || "No story content available."}
        </p>

        <div className="mt-6 flex justify-between items-center">
          <Link to={`/stories/${story.id}`}>
            <button className="rounded-md bg-slate-800 py-2 px-4 text-sm text-white shadow-md hover:shadow-lg hover:bg-slate-700">
              Read more
            </button>
          </Link>

          <div className="flex gap-3">
            <button
              onClick={handleReaction}
              className={`transition text-lg ${
                hasReacted ? "text-red-500" : "text-gray-500 hover:text-red-400"
              }`}
              aria-label="React to story"
            >
              <FaHeart />
            </button>

            <button
              onClick={handleSave}
              className="text-gray-500 hover:text-[#7D0A0A] transition-colors text-lg"
              aria-label="Save story"
            >
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StoryCard;
