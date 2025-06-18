import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEdit,
  FaBookmark,
  FaRegNewspaper,
  FaSignOutAlt,
  FaTrashAlt,
} from "react-icons/fa";
import defaultAvatar from "../assets/icon/account.png";
import { useAuth } from "../context/AuthContex";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const accountItems = [
  { label: "View Profile", path: "/profile", icon: <FaUser /> },
  { label: "Update Profile", path: "/update-profile", icon: <FaEdit /> },
  { label: "Saved Stories", path: "/saved-stories", icon: <FaBookmark /> },
  { label: "My Stories", path: "/my-stories", icon: <FaRegNewspaper /> },
  { label: "Add Review", path: "/submit-review", icon: <FaEdit /> },
];

const RightSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, deleteAccount } = useAuth();
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
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  if (loading) return <p className="text-white">Loading...</p>;

  // If not logged in, show Login & Signup buttons
  if (!currentUser) {
    return (
      <aside className="text-white space-y-4">
        <div className="text-center">
          <img
            src={defaultAvatar}
            alt="Guest avatar"
            className="w-16 h-16 mx-auto rounded-full border-2 border-[#EAD196]"
          />
          <p className="mt-2 font-semibold">Welcome, Guest!</p>
          <p className="text-sm text-[#EAD196]">Please log in</p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-[#EAD196] text-[#7D0A0A] px-4 py-2 rounded hover:bg-[#e2bd66]"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="border border-[#EAD196] text-[#EAD196] px-4 py-2 rounded hover:bg-[#7D0A0A]/30"
          >
            Sign Up
          </button>
        </div>
      </aside>
    );
  }

  // If logged in, show user info + menu
  return (
    <aside className="text-white">
      {/* User Info Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#EAD196]">
        <img
          src={userData?.photoURL || defaultAvatar}
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover border-2 border-[#EAD196]"
        />
        <div>
          <p className="font-semibold text-lg">{userData?.name || "User"}</p>
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

        {/* 🔓 Sign Out */}
        <li>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600/40 transition-all duration-200"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="text-base">Sign Out</span>
          </button>
        </li>

        {/* ❌ Delete Account */}
        <li>
          <button
            onClick={deleteAccount}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-800/40 text-red-300 transition-all duration-200"
          >
            <FaTrashAlt className="text-lg" />
            <span className="text-base">Delete Account</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default RightSidebar;
