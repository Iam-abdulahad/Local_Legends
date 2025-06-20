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

    const fetchData = async () => {
      try {
        // Check if reacted
        const storyRef = doc(db, "stories", story.id);
        const storySnap = await getDoc(storyRef);
        if (storySnap.exists()) {
          const data = storySnap.data();
          const reactions = Array.isArray(data.reactions) ? data.reactions : [];
          setHasReacted(reactions.includes(currentUser.uid));
        }

        // Check if saved (from user's own data)
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const saved = Array.isArray(userData.savedStories)
            ? userData.savedStories
            : [];
          setIsSaved(saved.includes(story.id));
        }
      } catch (error) {
        console.error("Error loading story data:", error);
      }
    };

    fetchData();
  }, [currentUser, story]);

  const handleReaction = async () => {
    if (!currentUser) return alert("Please log in to react.");
    const storyRef = doc(db, "stories", story.id);
    try {
      await updateDoc(storyRef, {
        reactions: hasReacted
          ? arrayRemove(currentUser.uid)
          : arrayUnion(currentUser.uid),
      });
      setHasReacted(!hasReacted);
    } catch (error) {
      console.error("Error reacting to story:", error);
    }
  };

  const handleSave = async () => {
    if (!currentUser) return alert("Please log in to save.");
    const userRef = doc(db, "users", currentUser.uid);
    try {
      await updateDoc(userRef, {
        savedStories: isSaved ? arrayRemove(story.id) : arrayUnion(story.id),
      });
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error saving story:", error);
    }
  };

  if (!story || !story.id) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-xl shadow-md border p-5 mb-6 w-full max-w-xl mx-auto transition"
    >
      {/* Header: User Info */}
      <div className="flex items-center mb-4">
        <img
          src={
            story.userInfo?.[3] ||
            "https://i.ibb.co/dT9hLmH/Chat-GPT-Image-Jun-15-2025-11-01-01-PM.png"
          }
          alt="User"
          className="w-12 h-12 rounded-full object-cover border mr-3"
        />
        <div>
          <h3 className="text-base font-semibold text-gray-800">
            {story.userInfo?.[0] || "Unknown User"}
          </h3>
          <p className="text-xs text-gray-500">
            {story.createdAt
              ? new Date(story.createdAt.seconds * 1000).toLocaleString(
                  "en-US",
                  {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }
                )
              : "Unknown date"}
          </p>
        </div>
      </div>

      {/* Body: Title & Story */}
      <h2 className="text-lg font-bold text-gray-900 mb-2">
        {story.title || "Untitled Story"}
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4 line-clamp-5">
        {story.story || "No story available."}
      </p>

      {/* Footer: Actions */}
      <div className="flex justify-between items-center pt-2 border-t">
        <Link to={`/stories/${story.id}`}>
          <button className="text-sm text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded shadow-sm">
            Read more
          </button>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={handleReaction}
            className={`text-xl transition ${
              hasReacted ? "text-red-500" : "text-gray-500 hover:text-red-400"
            }`}
          >
            <FaHeart />
          </button>
          <button
            onClick={handleSave}
            className="text-xl text-gray-500 hover:text-yellow-600 transition"
          >
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default StoryCard;
