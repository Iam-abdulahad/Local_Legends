import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import UpdateProfileLoading from "../Shared/Loading/UpdateProfileLoading";
import { useAuth } from "../context/AuthContex";
import { db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProfileUpdatePage = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  // Fetch user data
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

  const syncUserUpdates = async (uid, newData) => {
    const collectionsToUpdate = [
      { name: "stories", path: "userInfo" },
      { name: "testimonials", path: "" }, // assuming this has uid directly
    ];

    for (const { name, path } of collectionsToUpdate) {
      const snapshot = await getDocs(collection(db, name));
      const batch = writeBatch(db);

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();

        if (path === "userInfo" && Array.isArray(data.userInfo)) {
          const userInfo = data.userInfo;

          // Filter by UID at index 2
          if (userInfo[2] === uid) {
            const updatedUserInfo = [
              newData.name,
              newData.email,
              uid, // keep UID same
              newData.photoURL,
            ];

            batch.update(docSnap.ref, { userInfo: updatedUserInfo });
          }
        }

        // For testimonials or flat user data
        if (!path && data.uid === uid) {
          batch.update(docSnap.ref, {
            name: newData.name,
            email: newData.email,
          });
        }
      });

      await batch.commit();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !formData.name || !formData.email) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
      });
      return;
    }

    try {
      setUpdating(true);
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        ...formData,
        updatedAt: new Date(),
      });

      await syncUserUpdates(currentUser.uid, {
        name: formData.name,
        email: formData.email,
        photoURL: formData.photoURL,
      });

      await Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been successfully updated.",
        confirmButtonColor: "#3085d6",
      });

      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating your profile. Please try again.",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !formData) return <UpdateProfileLoading />;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-[#0ABAB5]">Update Profile</h2>

      {/* Profile picture (Image URL input) */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={
            formData.photoURL ||
            "https://via.placeholder.com/150x150.png?text=Profile"
          }
          className="w-24 h-24 rounded-full object-cover border"
          alt="Profile"
        />
        <div>
          <label className="block font-medium text-sm text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-1"
            placeholder="https://your-image-host.com/image.jpg"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
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
            <label className="block text-sm font-medium">Email</label>
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
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender</label>
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
            <label className="block text-sm font-medium">Birthday</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
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
          <label className="block text-sm font-medium">About/Bio</label>
          <textarea
            name="bio"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          ></textarea>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="facebook"
            placeholder="Facebook URL"
            value={formData.facebook}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            type="url"
          />
          <input
            name="twitter"
            placeholder="Twitter URL"
            value={formData.twitter}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            type="url"
          />
          <input
            name="linkedin"
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            type="url"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block font-medium text-sm text-gray-700 mb-1">
            Skills / Interests
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-[#0ABAB5]/20 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
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
            type="reset"
            onClick={() => window.location.reload()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updating}
            className="bg-[#0ABAB5] hover:bg-[#089E9A] text-gray-200 px-6 py-2 rounded shadow"
          >
            {updating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdatePage;
