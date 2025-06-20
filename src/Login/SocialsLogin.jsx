import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import googleIcon from "../assets/icon/google12.png";
import { auth, db, provider } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
        createdAt: serverTimestamp(),
      };

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, userData);
        Swal.fire({
          icon: "success",
          title: "Logged in",
          text: "Welcome! Your account was created successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Welcome back!",
          text: "You have logged in successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message || "Something went wrong during sign-in.",
      });
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 bg-[#F2EFE7] border border-[#BF3131] text-[#7D0A0A] font-medium py-2 rounded hover:bg-[#BF3131] hover:text-gray-900 transition"
    >
      <img src={googleIcon} alt="Google icon" className="w-5 h-5" />
      Continue with Google
    </button>
  );
};

export default SocialLogin;
