import { motion } from "framer-motion";
import heroImg from "../assets/Images/about-illustration.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-[#EEEEEE] px-6 py-12 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-8 flex flex-col justify-center"
        >
          <h1 className="text-4xl font-bold text-[#7D0A0A] mb-4">About Local Legend</h1>
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            <strong>Local Legend</strong> is a unique platform built to preserve and celebrate the stories, traditions, and hidden gems of local communities. In an era of globalization and fast-paced digital content, many beautiful cultural elements risk being forgotten. This platform gives everyday people the opportunity to share their experiences, folklore, local heroes, and inspiring events that make their hometowns legendary.
          </p>

          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            Whether it’s the tale of an unsung village teacher, an age-old community ritual, or the journey of a small-town entrepreneur, we want your story to be heard. By crowd-sourcing narratives, Local Legend aims to build a digital archive that not only entertains but educates and inspires generations.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            This is more than just a storytelling site—it’s a movement to reconnect with our roots and uplift voices from the heart of communities around the world. Join us, share your legend, and help keep the spirit of local culture alive.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
        >
          <img
            src={heroImg}
            alt="Illustration representing storytelling"
            className="object-cover h-full w-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
