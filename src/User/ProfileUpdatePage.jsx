import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContex";

const ProfileUpdatePage = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState(null); // initially null
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            bio: data.bio || "",
            gender: data.gender || "",
            birthday: data.birthday || "",
            location: data.location || "",
            facebook: data.facebook || "",
            twitter: data.twitter || "",
            linkedin: data.linkedin || "",
            skills: data.skills || [],
            photoURL: data.photoURL || "",
          });
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillAdd = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      setFormData({
        ...formData,
        skills: [...formData.skills, e.target.value.trim()],
      });
      e.target.value = "";
    }
  };

  const handleSkillRemove = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 👉 You can update user data in Firestore here using setDoc or updateDoc
    console.log("Updated profile data to save:", formData);
  };

  if (loading || !formData) {
    return <div className="text-center mt-10">Loading user data...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Profile</h2>

      {/* Profile picture */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <img
            src={
              formData.photoURL ||
              "https://via.placeholder.com/150x150.png?text=Profile"
            }
            className="w-24 h-24 rounded-full object-cover border"
            alt="Profile"
          />
          <label className="absolute bottom-0 right-0 bg-gray-100 p-1 rounded-full cursor-pointer shadow">
            <FaCamera />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({ ...formData, photoURL: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>

        <div>
          <p className="font-medium text-gray-700">{formData.name}</p>
          <p className="text-sm text-gray-500">{formData.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-sm text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">
              Birthday
            </label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block font-medium text-sm text-gray-700">
            About/Bio
          </label>
          <textarea
            name="bio"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          ></textarea>
        </div>

        {/* Social Media Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-sm text-gray-700">
              Facebook
            </label>
            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="https://facebook.com/username"
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">
              Twitter
            </label>
            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="https://twitter.com/username"
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">
              LinkedIn
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>

        {/* Skills / Interests */}
        <div>
          <label className="block font-medium text-sm text-gray-700 mb-1">
            Skills / Interests
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleSkillRemove(skill)}
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Press Enter to add"
            onKeyDown={handleSkillAdd}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => setFormData(userData)} // reset
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdatePage;
