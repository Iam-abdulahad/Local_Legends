import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { submitTestimonial } from "../firebase/testimonialService";
import { useAuth } from "../context/AuthContex";

const SubmitReviewPage = () => {
  const { currentUser, userData } = useAuth();
  const [form, setForm] = useState({ name: "", feedback: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData?.name || currentUser?.displayName) {
      setForm((prevForm) => ({
        ...prevForm,
        name: userData?.name || currentUser?.displayName || "",
      }));
    }
  }, [userData, currentUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.feedback.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!currentUser) {
      setError("You must be logged in to submit a review.");
      return;
    }

    try {
      setLoading(true);
      await submitTestimonial({
        name: form.name.trim(),
        feedback: form.feedback.trim(),
        uid: currentUser.uid,
        email: currentUser.email,
      });

      setSuccess(true);
      setForm({ name: form.name, feedback: "" });
    } catch (err) {
      if (err.message.includes("already submitted")) {
        setError("❌ You’ve already submitted a review. Thank you!");
      } else {
        console.error(err);
        setError("❌ Failed to submit review. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EFE7] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-200 rounded-3xl shadow-xl max-w-md w-full p-8"
      >
        <h1 className="text-[#0ABAB5] text-3xl font-bold mb-6 text-center">
          📢 Submit Your Review
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-800 bg-red-100 border border-red-400 rounded p-3">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-sm text-green-800 bg-green-100 border border-green-400 rounded p-3">
            ✅ Thank you for your feedback!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-[#7D0A0A] font-semibold mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="feedback"
              className="block text-[#7D0A0A] font-semibold mb-2"
            >
              Your Review
            </label>
            <textarea
              name="feedback"
              id="feedback"
              rows="5"
              value={form.feedback}
              onChange={handleChange}
              placeholder="Write your review here"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
              disabled={loading}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0ABAB5] text-gray-200 font-semibold py-3 rounded-lg hover:bg-[#089E9A] transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SubmitReviewPage;
