import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative w-full bg-[#EAD196] text-[#7D0A0A] py-20 px-4 md:px-8 flex flex-col items-center text-center overflow-hidden">
      {/* Animated Bounce Arrow (above headline) */}
      <motion.div
        className="absolute top-6 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-12 h-12 rounded-full border-4 border-[#7D0A0A]/30 flex items-center justify-center">
          <ArrowDown className="text-[#7D0A0A] w-6 h-6" />
        </div>
      </motion.div>

      {/* CTA Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl mb-6">
        Got a story to share?
        <br />
        <span className="text-[#BF3131]">Be a part of the legend.</span>
      </h2>

      {/* CTA Button with Arrow */}
      <Link
        to="/submit-story"
        className="mt-4 px-8 py-4 bg-[#7D0A0A] hover:bg-[#BF3131] text-white rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-2xl flex items-center gap-2 group"
      >
        Submit a Story
        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </section>
  );
};

export default CTASection;
