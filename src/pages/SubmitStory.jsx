import { useState } from "react";
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../firebase/firebaseConfig";

const SubmitStory = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    location: "",
    story: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "stories"), formData);
      console.log("Story submitted with ID: ", docRef.id);
      alert("Story submitted successfully!");

      // Clear the form after submission
      setFormData({
        name: "",
        email: "",
        title: "",
        location: "",
        story: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting story. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[#7D0A0A] mb-6 text-center">
        Submit a Local Legend
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#EEEEEE] p-6 rounded-2xl shadow-lg space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#7D0A0A] font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
            />
          </div>
          <div>
            <label className="block text-[#7D0A0A] font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#7D0A0A] font-medium mb-1">
            Story Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          />
        </div>

        <div>
          <label className="block text-[#7D0A0A] font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          />
        </div>

        <div>
          <label className="block text-[#7D0A0A] font-medium mb-1">
            Story Details
          </label>
          <textarea
            name="story"
            value={formData.story}
            onChange={handleChange}
            required
            rows="6"
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
            placeholder="Share your local tale..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#7D0A0A] text-[#EAD196] px-6 py-2 rounded-lg hover:bg-[#BF3131] transition-all"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default SubmitStory;
