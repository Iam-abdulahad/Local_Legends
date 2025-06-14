import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContex";
import defaultAvatar from "../assets/icon/account.png";

const LeftSidebar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Local Legends</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/submit">Submit Story</Link>
        <Link to="/map">Explore Map</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {user && (
        <div className="mt-10">
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL || defaultAvatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{user.displayName}</p>
              <Link to="/profile" className="text-sm text-[#BF3131] underline">
                View Profile
              </Link>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-4 text-sm text-[#BF3131] underline"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;
