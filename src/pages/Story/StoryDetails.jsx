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
            setIsSaved(
              Array.isArray(data.savedBy) &&
                data.savedBy.includes(currentUser.uid)
            );
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
      const storyRef = doc(db, "stories", id);
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

  if (loading)
    return (
    <StoryDetailLoading></StoryDetailLoading>
    );

  if (!story)
    return (
      <div className="min-h-screen flex items-center justify-center text-[#7D0A0A] font-semibold text-xl">
        Story not found.
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-6 sm:p-8 my-8 bg-white rounded-2xl shadow-lg"
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-[#7D0A0A] mb-2">
        {story.title}
      </h1>
      <p className="text-sm text-gray-500 mb-4 italic">
        📍 Location: {story.location}
      </p>
      <p className="text-gray-800 whitespace-pre-line leading-relaxed mb-6">
        {story.story}
      </p>

      {story.tags?.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {story.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-[#EAD196] text-[#7D0A0A] px-3 py-1 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 border-t pt-4">
        {emojiOptions.map((emoji) => (
          <motion.button
            whileTap={{ scale: 1.2 }}
            whileHover={{ scale: 1.1 }}
            key={emoji}
            onClick={() => handleReaction(emoji)}
            className="text-2xl sm:text-3xl transition-all"
          >
            {emoji} {story.reactions?.[emoji] ?? 0}
          </motion.button>
        ))}

        <motion.button
          whileTap={{ scale: 1.2 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleSave}
          className="text-2xl text-gray-500 hover:text-[#7D0A0A] ml-auto"
        >
          {isSaved ? <FaBookmark /> : <FaRegBookmark />}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StoryDetails;
