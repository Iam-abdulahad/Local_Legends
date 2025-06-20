import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F2EFE7] text-gray-800 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo / Name */}
        <div>
          <h1 className="text-2xl text-[#0ABAB5] font-bold mb-6 tracking-wide font-[cursive] italic">
            Local Legends
          </h1>
          <p className="text-sm text-gray-700">
            Uncover the hidden stories around you.
          </p>
        </div>

        {/* Navigation Links */}

        <div className="flex flex-col gap-2 ">
          <h3 className="text-lg text-[#0ABAB5] font-semibold mb-4">Quick Links</h3>
          <Link to="/" className="hover:text-[#BF3131] transition">
            Home
          </Link>
          <Link to="/submit" className="hover:text-[#BF3131] transition">
            Submit Story
          </Link>
          <Link to="/explore-map" className="hover:text-[#BF3131] transition">
            Explore Map
          </Link>
          <Link to="/about" className="hover:text-[#BF3131] transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-[#BF3131] transition">
            Contact
          </Link>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg text-[#0ABAB5] font-semibold mb-4">Connect With Developer</h3>
          <p className="text-sm text-gray-700">
            Have suggestions or feedback? Connect with me:
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://ahad-dev.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-800 hover:scale-110 transition-transform duration-300"
            >
              <FaGlobe className="text-2xl" />
            </a>
            <a
              href="https://github.com/Iam-abdulahad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-800 hover:scale-110 transition-transform duration-300"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/iam-abdulahad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-800 hover:scale-110 transition-transform duration-300"
            >
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-[#EAD196]/30 pt-4 text-sm text-center text-[#0ABAB5]/70">
        © {new Date().getFullYear()} Local Legends. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
