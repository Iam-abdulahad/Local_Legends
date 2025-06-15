// pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContex";
import { FaUserCircle } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import ProfileLoading from "../Shared/Loading/porfileLoading";

const Profile = () => {
  const { currentUser } = useAuth();
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

  if (loading) return <ProfileLoading></ProfileLoading>;

  if (!userData) return <p>User data not found.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <div className="flex items-center gap-4 mb-6">
        {/* User avatar or icon */}
        <div className="text-blue-500 text-5xl">
          <FaUserCircle />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {userData.name || "No Name"}
          </h2>
          <p className="text-sm text-gray-500">{userData.email}</p>
        </div>
      </div>

      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Role:</span>
          <span>{userData.role || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">User ID (UID):</span>
          <span className="truncate w-48 text-right">{userData.uid}</span>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => Navigate("/update-profile", { state: { userData } })}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
