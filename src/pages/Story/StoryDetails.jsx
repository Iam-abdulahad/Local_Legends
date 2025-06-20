import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useAuth } from "../../context/AuthContex";
import { db } from "../../firebase/firebaseConfig";
import StoryDetailLoading from "../../Shared/Loading/StoryDetailLoading";

const emojiOptions = ["❤️", "👍", "😂", "😮"];

const StoryDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [story, setStory] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "stories", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setStory({ id: docSnap.id, ...data });

          if (currentUser?.uid) {
            const userRef = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              const saved = Array.isArray(userData.savedStories)
                ? userData.savedStories
                : [];
              setIsSaved(saved.includes(docSnap.id));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id, currentUser]);

  const handleReaction = async (emoji) => {
    try {
      const storyRef = doc(db, "stories", id);
      await updateDoc(storyRef, {
        [`reactions.${emoji}`]: increment(1),
      });

      const updatedSnap = await getDoc(storyRef);
      setStory({ id: updatedSnap.id, ...updatedSnap.data() });
    } catch (error) {
      console.error("Error reacting:", error);
    }
  };

  const handleSave = async () => {
    if (!currentUser) return alert("Please log in to save stories.");
    try {
      const userRef = doc(db, "users", currentUser.uid);

      await updateDoc(userRef, {
        savedStories: isSaved ? arrayRemove(story.id) : arrayUnion(story.id),
      });

      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error updating saved stories in user data:", error);
    }
  };

  if (loading) return <StoryDetailLoading />;
  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold text-xl">
        Story not found.
      </div>
    );
  }

  const { userInfo } = story;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 md:p-10 my-10 bg-[#F2EFE7] rounded-3xl shadow-xl border border-gray-100"
    >
      {/* User Info */}
      {userInfo && (
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
          <img
            src={userInfo[3]}
            alt={userInfo[0]}
            className="w-14 h-14 rounded-full object-cover border"
          />
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              {userInfo[0]}
            </h4>
            <p className="text-sm text-gray-500">{userInfo[1]}</p>
          </div>
        </div>
      )}

      {/* Story Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#7D0A0A] mb-4">
        {story.title}
      </h1>

      {/* Location */}
      {story.location && (
        <p className="text-sm text-gray-500 mb-6 italic">
          📍 Location: {story.location}
        </p>
      )}

      {/* Story Content */}
      <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-6 text-[17px]">
        {story.story}
      </p>

      {/* Tags */}
      {story.tags?.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {story.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-[#F3E8D9] text-[#7D0A0A] px-3 py-1 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Reactions and Save */}
      <div className="flex flex-wrap items-center gap-4 border-t pt-6">
        {emojiOptions.map((emoji) => (
          <motion.button
            whileTap={{ scale: 1.2 }}
            whileHover={{ scale: 1.1 }}
            key={emoji}
            onClick={() => handleReaction(emoji)}
            className="text-2xl sm:text-3xl text-gray-700 hover:text-[#7D0A0A] transition-all"
          >
            {emoji} {story.reactions?.[emoji] ?? 0}
          </motion.button>
        ))}

        {/* Save Button */}
        <motion.button
          whileTap={{ scale: 1.2 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleSave}
          className={`text-2xl ml-auto transition-colors duration-200 ${
            isSaved ? "text-[#7D0A0A]" : "text-gray-400 hover:text-[#7D0A0A]"
          }`}
        >
          {isSaved ? <FaBookmark /> : <FaRegBookmark />}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StoryDetails;
