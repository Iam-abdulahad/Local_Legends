import { Lightbulb, MapPin, PenLine } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Discover",
    description:
      "Explore stories and hidden legends near you on the interactive map.",
    icon: <MapPin className="w-8 h-8 text-[#0ABAB5]" />,
  },
  {
    title: "Share",
    description: "Submit your own local story with just a few clicks.",
    icon: <PenLine className="w-8 h-8 text-[#0ABAB5]" />,
  },
  {
    title: "Inspire",
    description:
      "Help preserve community history and inspire others through storytelling.",
    icon: <Lightbulb className="w-8 h-8 text-[#0ABAB5]" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="text-[#7D0A0A] py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-[#0ABAB5] font-extrabold mb-16"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4 bg-[#EAD196]/30 p-4 rounded-full shadow-sm">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
              <p className="text-[#5a3f3f] text-base leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
