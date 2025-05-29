import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { motion } from "framer-motion";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useAuth } from "../../context/AuthContex";
import { db } from "../../firebase/firebaseConfig";

const emojiOptions = ["❤️", "👍", "😂", "😮"];

const StoryDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [story, setStory] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
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
    const storyRef = doc(db, "stories", id);
    await updateDoc(storyRef, {
      [`reactions.${emoji}`]: increment(1),
    });

    // Refresh UI after reaction
    const updatedSnap = await getDoc(storyRef);
    setStory({ id: updatedSnap.id, ...updatedSnap.data() });
  };

  const handleSave = async () => {
    if (!currentUser) return alert("Please log in to save stories.");
    const storyRef = doc(db, "stories", id);
    await updateDoc(storyRef, {
      savedBy: isSaved
        ? arrayRemove(currentUser.uid)
        : arrayUnion(currentUser.uid),
    });
    setIsSaved(!isSaved);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!story) return <div className="text-center py-10">Story not found.</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-xl mt-6"
    >
      <h1 className="text-3xl font-bold text-[#7D0A0A] mb-2">{story.title}</h1>
      <p className="text-sm text-gray-400 mb-4">Location: {story.location}</p>
      <p className="text-gray-700 whitespace-pre-line mb-4">{story.story}</p>

      <div className="text-sm text-gray-600 mb-4">
        Tags:{" "}
        {story.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="inline-block bg-[#EAD196] text-[#7D0A0A] px-2 py-1 rounded-full mr-2 text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-4">
        {emojiOptions.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleReaction(emoji)}
            className="text-2xl hover:scale-110 transition-transform"
          >
            {emoji} {story.reactions?.[emoji] ?? 0}
          </button>
        ))}

        <button
          onClick={handleSave}
          className="text-lg text-gray-500 hover:text-[#7D0A0A]"
        >
          {isSaved ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>
    </motion.div>
  );
};

export default StoryDetails;
