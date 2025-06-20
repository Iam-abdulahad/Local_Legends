import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NotFoundImg from "../assets/Images/NotFound.svg";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F2EFE7] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#F2EFE7] shadow-2xl rounded-2xl max-w-3xl w-full flex flex-col md:flex-row items-center overflow-hidden"
      >
        {/* Left Side - Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={NotFoundImg}
            alt="Page not found"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="md:w-1/2 w-full p-8 text-center md:text-left">
          <h1 className="text-6xl font-bold text-[#BF3131] mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-[#7D0A0A] mb-3">
            Oops! Page not found
          </h2>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-[#F2EFE7] text-gray-900 px-5 py-3 rounded-xl shadow-md hover:bg-[#BF3131] transition duration-300"
            >
              <ArrowLeft size={18} />
              Go Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#EAD196" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-[#F2EFE7] text-gray-900 px-5 py-3 rounded-xl shadow-md hover:bg-[#BF3131] transition duration-300"
            >
              <Home size={18} />
              Back to Home
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
