import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroMap from "../assets/Images/hero-map.png"; // Ensure this path is correct

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#EEE]">
      {/* Animated Background Map */}
      <motion.img
        src={heroMap}
        alt="Map Background"
        className="absolute w-full h-full object-cover opacity-30"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7D0A0A]/60 to-black/80 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 md:px-10 text-gray-900 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
          Discover & Share Your Local Legends
        </h1>
        <p className="text-lg md:text-xl mb-8 text-[#EAD196] font-medium">
          Unearth the hidden stories that shape your community. Be the voice of
          your town.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/explore-map"
            className="bg-[#BF3131] hover:bg-[#F2EFE7] text-gray-900 px-6 py-3 rounded-2xl shadow-lg transition-all duration-300"
          >
            Explore Map
          </Link>
          <Link
            to="/submit"
            className="bg-[#F2EFE7] text-[#7D0A0A] hover:bg-[#EAD196] px-6 py-3 rounded-2xl shadow-lg transition-all duration-300"
          >
            Submit Your Story
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
