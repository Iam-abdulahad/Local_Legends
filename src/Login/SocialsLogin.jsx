import googleIcon from "../assets/icon/google12.png";


const SocialLogin = () => {
  const handleGoogleLogin = () => {
    console.log("Google login triggered");
    // Your Google sign-in logic here (e.g. Firebase)
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 bg-white border border-[#BF3131] text-[#7D0A0A] font-medium py-2 rounded hover:bg-[#BF3131] hover:text-white transition"
    >
      <img
        src={googleIcon}
        alt="Google icon"
        className="w-5 h-5"
      />
      Continue with Google
    </button>
  );
};

export default SocialLogin;
