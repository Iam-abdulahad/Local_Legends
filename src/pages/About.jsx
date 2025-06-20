import { motion } from "framer-motion";
import heroImg from "../assets/Images/about-illustration.jpg";

const About = () => {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#0ABAB5]">
            About Local Legends
          </h1>
          <p className="text-lg text-[#7D0A0A] mt-4 max-w-3xl mx-auto">
            A movement to preserve stories, honor community heroes, and
            celebrate local cultures.
          </p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        >
          {/* Text Content */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              <strong className="text-[#0ABAB5]">Local Legends</strong> is a
              storytelling platform where community voices shine. In today's
              fast-paced world, countless cultural stories, traditions, and
              unsung heroes remain unheard or forgotten. We're here to change
              that.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Whether it's the tale of a humble village teacher, a cherished
              festival, or the journey of a small-town changemaker, we provide a
              stage for authentic voices. Our platform is a digital archive of
              inspiration, preserving the essence of what makes communities
              truly legendary.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Join us in uplifting these local legends. Share your story. Honor
              your roots. Inspire generations.
            </p>
          </div>

          {/* Image */}
          <div className="w-full h-72 md:h-full">
            <img
              loading="lazy"
              src={heroImg}
              alt="Illustration"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
