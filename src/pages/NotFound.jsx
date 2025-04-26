import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEEEEE] p-6">
      <div className="max-w-xl text-center bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-6xl font-extrabold text-[#BF3131] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#7D0A0A] mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist. It might’ve been
          moved or deleted.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#7D0A0A] text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-[#BF3131] transition"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
