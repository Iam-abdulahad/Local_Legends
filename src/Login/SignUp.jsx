import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SocialLogin from "./SocialsLogin";
import { useAuth } from "../context/AuthContex";
import { div } from "motion/react-client";

const Signup = () => {
  const { signupWithEmail } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = await signupWithEmail(form.name, form.email, form.password);
    setLoading(false);

    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2EFE7] p-6">
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-2xl">
        <h2 className="text-2xl text-[#0ABAB5] font-semibold text-center mb-4">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-[#0ABAB5] text-white py-2 rounded hover:bg-teal-600 transition"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#0ABAB5] font-medium hover:underline"
          >
            Login
          </Link>
        </div>

        <div className="my-4 text-center text-gray-500">or</div>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Signup;
