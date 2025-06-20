import { useState } from "react";
import SocialLogin from "./SocialsLogin";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { motion } from "framer-motion";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    createdAt: serverTimestamp(),
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { name, email, password } = signupData;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      const userInfo = {
        uid: user.uid,
        name,
        email,
        photoURL: user.photoURL || "",
        role: "user",
        createdAt: new Date(),
      };

      await setDoc(doc(db, "users", user.uid), userInfo);

      
      Swal.fire({
        icon: "success",
        title: "Signup Successful",
        html: `Welcome, ${name}!<br/>A verification email has been sent to <strong>${email}</strong>. Please verify your email before logging in.`,
      });

      
      setSignupData({ name: "", email: "", password: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
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
              Signing Up...
            </div>
          ) : (
            "Sign Up"
          )}
        </motion.button>

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
