import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDataContext } from "../context/DataContext";
import {
  Home,
  MapPin,
  Info,
  Mail,
  LayoutDashboard,
  Users,
  BookOpen,
  Tag,
} from "lucide-react";

const navItems = [
  { label: "Home", path: "/", icon: <Home /> },
  { label: "Explore Map", path: "/explore-map", icon: <MapPin /> },
  { label: "All Stories", path: "/stories", icon: <BookOpen /> },
  { label: "Community", path: "/community", icon: <Users /> },
  { label: "About", path: "/about", icon: <Info /> },
  { label: "Contact", path: "/contact", icon: <Mail /> },
];

const LeftSidebar = ({ onLinkClick }) => {
  const location = useLocation();
  const { allData } = useDataContext();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const allTags = new Set();
    allData.forEach((story) => {
      if (Array.isArray(story.tags)) {
        story.tags.forEach((tag) => allTags.add(tag));
      }
    });

    setTags(Array.from(allTags).slice(0, 20));
  }, [allData]);

  return (
    <aside className="h-screen overflow-y-auto scrollbar-hide p-4  text-gray-900 flex flex-col justify-between">
      <div className="space-y-6">
        <h1 className="text-2xl text-[#0ABAB5] font-bold mb-6 tracking-wide font-[cursive] italic">
          Local Legends
        </h1>

        {/* Nav */}
        <nav className="space-y-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onLinkClick}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#0ABAB5] text-white font-semibold shadow"
                    : "hover:bg-[#0ABAB5]/20"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-base">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Popular Tags */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Tag className="w-5 h-5" />
            Popular Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${encodeURIComponent(tag)}`}
                className="bg-[#0ABAB5] text-white hover:bg-[#0ABAB5]/80  px-3 py-1 rounded-full text-sm transition"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
