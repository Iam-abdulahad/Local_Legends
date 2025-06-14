import { Link, useLocation } from "react-router-dom";
import {
  Home,
  MapPin,
  UploadCloud,
  Info,
  Mail,
  LayoutDashboard,
  Users,
  BookOpen,
  Bookmark,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Home", path: "/", icon: <Home /> },
  { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
  { label: "Submit Story", path: "/submit", icon: <UploadCloud /> },
  { label: "Explore Map", path: "/map", icon: <MapPin /> },
  { label: "Saved Stories", path: "/saved", icon: <Bookmark /> },
  { label: "All Stories", path: "/stories", icon: <BookOpen /> },
  { label: "Community", path: "/community", icon: <Users /> },
  { label: "About", path: "/about", icon: <Info /> },
  { label: "Contact", path: "/contact", icon: <Mail /> },
  { label: "Settings", path: "/settings", icon: <Settings /> },
];

const LeftSidebar = () => {
  const location = useLocation();

  return (
    <aside className="space-y-6 p-4 text-white">
      <h1 className="text-2xl font-bold mb-8 tracking-wide">Local Legends</h1>

      <nav className="space-y-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
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
          );
        })}
      </nav>
    </aside>
  );
};

export default LeftSidebar;
