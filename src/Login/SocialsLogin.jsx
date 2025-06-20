import { useNavigate, useLocation } from "react-router-dom";
import googleIcon from "../assets/icon/google12.png";
import { useAuth } from "../context/AuthContex";

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithGoogle } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle(); 
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 bg-[#F2EFE7] border border-[#0ABAB5] text-[#7D0A0A] font-medium py-2 rounded hover:bg-[#089E9A] hover:text-gray-100 transition"
    >
      <img src={googleIcon} alt="Google icon" className="w-5 h-5" />
      Continue with Google
    </button>
  );
};

export default SocialLogin;
