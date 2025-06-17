import { motion } from "framer-motion";

const communityHighlights = [
  {
    name: "Ayesha Rahman",
    role: "Top Storyteller of the Month",
    image: "https://ui-avatars.com/",
    story:
      "Ayesha has contributed over 10 verified legends and inspired others to preserve local history.",
  },
  {
    name: "Farhan Hossain",
    role: "Legend Mapper",
    image: "https://ui-avatars.com/",
    story:
      "Mapped 25+ historic locations and helped validate multiple submissions.",
  },
];

const testimonials = [
  {
    name: "Junaid Alam",
    feedback:
      "Local Legends brought me closer to my roots. I found stories I never knew existed about my village!",
  },
  {
    name: "Sadia Karim",
    feedback:
      "This platform is a gift. Sharing my grandfather’s story made our entire family emotional.",
  },
];

const CommunityPage = () => {
  return (
    <div className="bg-[#EEEEEE] text-[#7D0A0A] min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8"
        >
          🌟 Community Highlights & Testimonials
        </motion.h1>

        {/* Highlights Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {communityHighlights.map((user, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row gap-4 hover:shadow-xl transition"
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover mx-auto md:mx-0"
              />
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm italic text-[#BF3131]">{user.role}</p>
                <p className="mt-2 text-sm">{user.story}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold mt-16 mb-6 text-center"
        >
          💬 What Our Community Says
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#EAD196] text-[#7D0A0A] p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <p className="text-lg font-medium">“{t.feedback}”</p>
              <p className="mt-4 font-semibold text-right">— {t.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityPage;
