import { Link, useLocation } from "react-router-dom";
import { FaUser, FaEdit, FaBookmark, FaRegNewspaper } from "react-icons/fa";
import defaultAvatar from "../assets/icon/account.png";
import { useAuth } from "../context/AuthContex";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const accountItems = [
  { label: "View Profile", path: "/profile", icon: <FaUser /> },
  { label: "Update Profile", path: "/update-profile", icon: <FaEdit /> },
  { label: "Saved Stories", path: "/saved-stories", icon: <FaBookmark /> },
  { label: "Your Stories", path: "/your-stories", icon: <FaRegNewspaper /> },
];

const RightSidebar = () => {
  const location = useLocation();
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

  if (loading) return <p>Loading....</p>;

  if (!userData) return <p>User data not found.</p>;

  return (
    <aside className="text-white">
      {/* 👤 User Info Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#EAD196]">
        <img
          src={userData?.photoURL || defaultAvatar}
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover border-2 border-[#EAD196]"
        />
        <div>
          <p className="font-semibold text-lg">
            {userData.name || "Guest"}
          </p>
          <p className="text-sm text-[#EAD196]">Logged In</p>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-3">
        {accountItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#EAD196] text-[#7D0A0A] font-semibold shadow"
                    : "hover:bg-[#7D0A0A]/30"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-base">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default RightSidebar;
