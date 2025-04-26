import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { motion } from "framer-motion";

const SubmitStory = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    location: "",
    story: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());
      const docRef = await addDoc(collection(db, "stories"), {
        ...formData,
        tags: tagsArray,
      });

      console.log("Story submitted with ID:", docRef.id);
      alert("Story submitted successfully!");

      setFormData({
        name: "",
        email: "",
        title: "",
        location: "",
        story: "",
        tags: "",
      });
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-[#7D0A0A] mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Share Your Local Legend ✨
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="bg-[#EEEEEE] p-8 rounded-2xl shadow-xl space-y-6"
      >
        {/* Name & Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-[#7D0A0A] font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
            />
          </div>
          <div>
            <label className="text-[#7D0A0A] font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
              placeholder="Optional"
            />
          </div>
        </div>

        {/* Title & Location */}
        <div>
          <label className="text-[#7D0A0A] font-medium">Story Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          />
        </div>

        <div>
          <label className="text-[#7D0A0A] font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
            placeholder="e.g., Dhaka, Sylhet, or 'The Old Banyan Tree'"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="text-[#7D0A0A] font-medium">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
            placeholder="Separate tags with commas (e.g. hero, kindness, history)"
          />
        </div>

        {/* Story */}
        <div>
          <label className="text-[#7D0A0A] font-medium">Story</label>
          <textarea
            name="story"
            value={formData.story}
            onChange={handleChange}
            required
            rows="6"
            className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
            placeholder="Share your heartfelt local story here..."
          />
        </div>
        
        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold transition-all flex justify-center items-center gap-2 ${
            loading
              ? "bg-[#BF3131]/70 cursor-not-allowed"
              : "bg-[#7D0A0A] hover:bg-[#BF3131]"
          } text-[#EAD196]`}
        >
          {loading ? (
            <div className="flex items-center gap-2 animate-pulse">
              <div className="w-4 h-4 border-2 border-[#EAD196] border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </div>
          ) : (
            "Submit Story"
          )}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default SubmitStory;
