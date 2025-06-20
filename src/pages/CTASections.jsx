import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";
import legendImage from "../assets/Images/earth-map.png";

const CTASection = () => {
  return (
    <section className="relative w-full bg-[#EAD196] text-[#7D0A0A] py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Your Story Matters.
            <span className="block text-[#BF3131] mt-2">
              Put it on the Map.
            </span>
          </h2>

          <p className="text-lg md:text-xl mt-6 text-[#7D0A0A]/80 max-w-xl">
            Local Legends is a community-driven map where real people like you
            share cultural stories, mysteries, and memories from your area. Let
            your voice echo across the map.
          </p>

          <Link
            to="/submit-story"
            className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-[#F2EFE7] hover:bg-[#BF3131] text-gray-900 rounded-full text-lg font-semibold shadow-md transition-all duration-300 group"
          >
            Submit Your Story
            <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Image / Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <img
            src={legendImage}
            alt="Legend Visual"
            className="w-full max-w-2xl md:max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto rounded-2xl"
          />
        </motion.div>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#BF3131]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#F2EFE7]/10 rounded-full blur-2xl animate-pulse" />
    </section>
  );
};

export default CTASection;
