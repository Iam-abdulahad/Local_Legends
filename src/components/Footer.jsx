import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#7D0A0A] text-[#EAD196] px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo / Name */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Local Legends</h2>
          <p className="text-sm text-[#EAD196]/80">
            Uncover the hidden stories around you.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2 md:items-center">
          <Link to="/" className="hover:text-[#BF3131] transition">
            Home
          </Link>
          <Link to="/submit" className="hover:text-[#BF3131] transition">
            Submit Story
          </Link>
          <Link to="/map" className="hover:text-[#BF3131] transition">
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
        <div className="flex md:justify-end items-center gap-4">
          <a href="#" className="hover:text-[#BF3131]" aria-label="Facebook">
            Facebook
          </a>
          <a href="#" className="hover:text-[#BF3131]" aria-label="Twitter">
            X
          </a>
          <a href="#" className="hover:text-[#BF3131]" aria-label="Instagram">
            IG
          </a>
        </div>
      </div>

      <div className="mt-8 border-t border-[#EAD196]/30 pt-4 text-sm text-center text-[#EAD196]/70">
        © {new Date().getFullYear()} Local Legends. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
