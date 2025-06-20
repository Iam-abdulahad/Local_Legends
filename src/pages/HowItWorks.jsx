import { Lightbulb, MapPin, PenLine } from "lucide-react";

const steps = [
  {
    title: "Discover",
    description:
      "Explore stories and hidden legends near you on the interactive map.",
    icon: <MapPin className="w-8 h-8 text-[#7D0A0A]" />,
  },
  {
    title: "Share",
    description: "Submit your own local story with just a few clicks.",
    icon: <PenLine className="w-8 h-8 text-[#7D0A0A]" />,
  },
  {
    title: "Inspire",
    description:
      "Help preserve community history and inspire others through storytelling.",
    icon: <Lightbulb className="w-8 h-8 text-[#7D0A0A]" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#F2EFE7] text-[#7D0A0A] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#F2EFE7] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
              <p className="text-base text-[#5a3f3f]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
