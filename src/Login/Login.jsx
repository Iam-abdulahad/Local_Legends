import { useState } from "react";
import SocialLogin from "./SocialsLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Info:", loginData);
    // Handle login logic here
  };

  return (
    <div className="flex items-center justify-center bg-[#EEEEEE] p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-[#7D0A0A] mb-6">
          Login
        </h2>

        <label className="block text-[#7D0A0A] font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={loginData.email}
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
          value={loginData.password}
          onChange={handleChange}
          required
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
        />

        <button
          type="submit"
          className="w-full bg-[#7D0A0A] text-[#EAD196] py-2 rounded hover:bg-[#BF3131] transition"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#7D0A0A] font-semibold hover:underline"
          >
            Create an account
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

export default Login;
