import { Link } from "react-router-dom";
import { FaUser, FaEdit, FaBookmark, FaRegNewspaper } from "react-icons/fa";

const RightSidebar = () => {
  return (
    <div className="space-y-6 p-4 text-[#7D0A0A]">
      <h2 className="text-xl font-bold border-b pb-2">Your Account</h2>

      <ul className="space-y-4">
        <li>
          <Link
            to="/profile"
            className="flex items-center gap-3 hover:text-[#BF3131] transition-colors"
          >
            <FaUser /> <span>View Profile</span>
          </Link>
        </li>
        <li>
          <Link
            to="/update-profile"
            className="flex items-center gap-3 hover:text-[#BF3131] transition-colors"
          >
            <FaEdit /> <span>Update Profile</span>
          </Link>
        </li>
        <li>
          <Link
            to="/saved-stories"
            className="flex items-center gap-3 hover:text-[#BF3131] transition-colors"
          >
            <FaBookmark /> <span>Saved Stories</span>
          </Link>
        </li>
        <li>
          <Link
            to="/your-stories"
            className="flex items-center gap-3 hover:text-[#BF3131] transition-colors"
          >
            <FaRegNewspaper /> <span>Your Stories</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default RightSidebar;
