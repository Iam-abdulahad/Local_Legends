import { useState } from "react";
import SocialLogin from "./SocialsLogin";
import { Link } from "react-router-dom";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Info:", signupData);
    // Handle signup logic here
  };

  return (
    <div className="flex items-center justify-center bg-[#EEEEEE] p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-[#7D0A0A] mb-6">
          Create Account
        </h2>

        <label className="block text-[#7D0A0A] font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={signupData.name}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
        />

        <label className="block text-[#7D0A0A] font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={signupData.email}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
        />

        <label className="block text-[#7D0A0A] font-medium mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={signupData.password}
          onChange={handleChange}
          required
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
        />

        <button
          type="submit"
          className="w-full bg-[#7D0A0A] text-[#EAD196] py-2 rounded hover:bg-[#BF3131] transition"
        >
          Sign Up
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#7D0A0A] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
        <div className="flex items-center justify-center my-4">
          <hr className="w-full border-t border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="w-full border-t border-gray-300" />
        </div>
        <SocialLogin />
      </form>
    </div>
  );
};

export default Signup;
