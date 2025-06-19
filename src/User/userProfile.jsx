import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContex";
import { useNavigate } from "react-router-dom";
import ProfileLoading from "../Shared/Loading/porfileLoading";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserCircle,
} from "react-icons/fa";

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser?.uid) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such user profile!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  if (loading) return <ProfileLoading />;
  if (!userData)
    return <p className="text-center mt-10">User data not found.</p>;

  const {
    name,
    email,
    photoURL,
    phone,
    location,
    bio,
    gender,
    birthday,
    linkedin,
    facebook,
    twitter,
    skills,
    role,
    uid,
  } = userData;

  const socialLinks = [
    {
      icon: <FaFacebook />,
      url: facebook,
    },
    {
      icon: <FaLinkedin />,
      url: linkedin,
    },
    {
      icon: <FaTwitter />,
      url: twitter,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Profile Image */}
        <div className="flex-shrink-0 w-full md:w-1/3 text-center">
          {photoURL ? (
            <img
              src={photoURL}
              alt="Profile"
              className="w-40 h-40 mx-auto object-cover rounded-full border-4 border-blue-500"
            />
          ) : (
            <FaUserCircle className="text-blue-500 text-[160px] mx-auto" />
          )}
          <h2 className="text-2xl font-bold mt-4">{name || "Unnamed User"}</h2>
          <div>
            <p className="bg-gray-50 p-3 rounded">
              {bio || "No bio available."}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-4">
            {socialLinks.map(
              ({ icon, url }, index) =>
                url &&
                url.trim() !== "" && (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-xl transition-all"
                  >
                    {icon}
                  </a>
                )
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-4 text-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Info label="Email" value={email} icon={<FaEnvelope />} />
            <Info label="Phone" value={phone} icon={<FaPhoneAlt />} />
            <Info label="Gender" value={gender} />
            <Info label="Birthday" value={birthday} />
            <Info label="Location" value={location} icon={<FaMapMarkerAlt />} />
            <Info label="User ID" value={uid} />
          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <p className="text-lg font-semibold mb-1">Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Edit Button */}
          <div className="pt-4 animate-pulse">
            <button
              onClick={() =>
                navigate("/update-profile", { state: { userData } })
              }
              className="bg-[#7D0A0A] hover:bg-[#BF3131] text-white font-semibold px-6 py-2 rounded-lg shadow"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value, icon }) => (
  <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg shadow-sm">
    {icon && <span className="mt-1 text-blue-500">{icon}</span>}
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-sm">{value || "N/A"}</p>
    </div>
  </div>
);

export default Profile;
