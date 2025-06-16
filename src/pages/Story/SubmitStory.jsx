import { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { motion } from "framer-motion";
import { getAuth } from "firebase/auth";

const SubmitStory = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [loading, setLoading] = useState(false);

  if (!currentUser) {
    alert("Please log in to submit a story.");
    return;
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    location: "",
    story: "",
    tags: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.displayName || "",
        email: currentUser.email || "",
      }));
    }
  }, [currentUser]);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          location: `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`,
        }));
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location.");
      }
    );
  };

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
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0);

      const userInfoArray = [
        currentUser.displayName || "Anonymous",
        currentUser.email || "No Email",
        currentUser.uid,
      ];

      const docRef = await addDoc(collection(db, "stories"), {
        ...formData,
        tags: tagsArray,
        userInfo: userInfoArray,
        createdAt: serverTimestamp(),
        reactions: {
          "❤️": 0,
          "👍": 0,
          "😂": 0,
          "😮": 0,
        },
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
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-[#7D0A0A] mb-6 text-center"
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
        className="bg-[#EEEEEE] p-6 md:p-8 rounded-2xl shadow-lg space-y-6"
      >

        <InputField
          label="Story Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <InputField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          placeholder="e.g., Sylhet, Rajshahi, or 'The Old Banyan Tree'"
        />
        <button
          type="button"
          onClick={handleDetectLocation}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          📍 Detect My Current Location
        </button>

        <InputField
          label="Tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g. hero, kindness, mystery"
        />

        <div>
          <label className="text-[#7D0A0A] font-medium">Your Story</label>
          <textarea
            name="story"
            value={formData.story}
            onChange={handleChange}
            required
            rows="6"
            className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
            placeholder="Share your heartfelt story..."
          />
        </div>

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

const InputField = ({ label, ...props }) => (
  <div>
    <label className="text-[#7D0A0A] font-medium">{label}</label>
    <input
      {...props}
      className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
    />
  </div>
);

export default SubmitStory;
