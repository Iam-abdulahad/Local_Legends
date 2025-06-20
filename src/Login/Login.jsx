import { useState } from "react";
import SocialLogin from "./SocialsLogin";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

 const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { email, password } = loginData;

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      await signOut(auth);
      Swal.fire({
        icon: "warning",
        title: "Email Not Verified",
        text: "Please verify your email before logging in.",
      });
      setLoading(false);
      return;
    }

    // Success
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: `Welcome back, ${user.email}!`,
    });

    // Navigate or do something after login...

    setLoginData({ email: "", password: "" }); // Reset form if needed
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: error.message,
    });
  }

  setLoading(false);
};


  return (
    <div className="flex items-center justify-center bg-[#F2EFE7] p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[#F2EFE7] p-8 rounded-2xl shadow-xl w-full max-w-md"
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

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold transition-all flex justify-center items-center gap-2 ${
            loading
              ? "bg-[#BF3131]/70 cursor-not-allowed"
              : "bg-[#F2EFE7] hover:bg-[#BF3131]"
          } text-[#EAD196]`}
        >
          {loading ? (
            <div className="flex items-center gap-2 animate-pulse">
              <div className="w-4 h-4 border-2 border-[#EAD196] border-t-transparent rounded-full animate-spin"></div>
              logging in...
            </div>
          ) : (
            "Login"
          )}
        </motion.button>

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
