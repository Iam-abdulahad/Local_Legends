// src/pages/Contact.jsx
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-12">
        {/* Left Side - Info Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold text-[#0ABAB5]">
            Contact Local Legends
          </h1>
          <p className="text-[#BF3131] text-lg">
            Have a story, suggestion, or want to get in touch? We’re here for
            you. <br />
            It's Demo form (Not Workable)
          </p>

          <div className="space-y-2 text-[#7D0A0A]">
            <p>
              <strong>Email:</strong> md.ahad6619@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +880-1795784766
            </p>
            <p>
              <strong>Location:</strong> Rajshahi, Bangladesh
            </p>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <div>
            <label className="block text-[#BF3131] font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              className="w-full border border-[#EAD196] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ABAB5]"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-[#BF3131] font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-[#EAD196] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ABAB5]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-[#BF3131] font-medium mb-1">
              Message
            </label>
            <textarea
              rows="4"
              className="w-full border border-[#EAD196] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ABAB5]"
              placeholder="Write your message"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#0ABAB5] text-white px-6 py-2 rounded-xl hover:bg-[#089e9a] transition duration-300"
          >
            Send Message
          </button>
        </motion.form>
      </div>

      {/* Optional Google Map */}
      <div className="max-w-6xl mx-auto mt-12 rounded-2xl overflow-hidden shadow-md">
        <iframe
          title="Google Map"
          className="w-full h-72"
          src="https://maps.google.com/maps?q=Rajshahi,%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
