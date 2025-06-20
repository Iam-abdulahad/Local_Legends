import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import defaultAvatar from "../assets/icon/account.png";
import { useAuth } from "../context/AuthContex";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Submit Story", href: "/submit" },
    { name: "Explore Map", href: "/map" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#F2EFE7] text-[#EAD196] px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wide">
          Local Legends
        </Link>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="hover:text-[#BF3131] transition-colors duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}

          {!user ? (
            <li>
              <Link
                to="/login"
                className="hover:text-[#BF3131] transition-colors duration-200"
              >
                Login
              </Link>
            </li>
          ) : (
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:text-[#BF3131] transition duration-200"
              >
                <img
                  src={user.photoURL || defaultAvatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="truncate max-w-[100px]">
                  {user.displayName}
                </span>
                <ChevronDown size={18} />
              </button>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-44 bg-[#F2EFE7] text-[#7D0A0A] rounded-lg shadow-lg py-2 z-50">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/submitted"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Submitted Stories
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4 pl-2 font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="block text-lg hover:text-[#BF3131] transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}

          {!user ? (
            <li>
              <Link
                to="/login"
                className="block text-lg hover:text-[#BF3131] transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
          ) : (
            <>
              <li className="flex items-center gap-2">
                <img
                  src={user.photoURL || defaultAvatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="truncate max-w-[150px]">
                  {user.displayName}
                </span>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="block text-lg hover:text-[#BF3131] transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/submitted"
                  className="block text-lg hover:text-[#BF3131] transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Submitted Stories
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block text-left text-lg hover:text-[#BF3131] transition-colors duration-200"
                >
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
