import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa6";

const GoogleLogin = ({ className }) => {
  // Functions
  const loginWithGoogle = async () => {
    localStorage.setItem(
      "flags",
      JSON.stringify({
        welcomed: true,
      })
    );

    const res = await signIn("google", { redirect: false, callbackUrl: "/" });
    // console.log("Signing in with Google: ", res);

    if (res?.error === "AccessDenied") {
      return toast.error(
        res?.error || "Account not registered, please register manually first"
      );
    }
  };

  return (
    <button
      onClick={loginWithGoogle}
      type="button"
      className={`w-full max-w-[320px] sm:max-w-fit justify-center p-3 rounded-lg bg-[#f7833c] shadow-sm text-[#ffffff] text-[15px] font-medium flex items-center gap-2 cursor-pointer border-2 border-[#f7833c] hover:bg-[#ffdd93] hover:border-[#f7833c] hover:text-[#f7833c] ${
        className && className
      }`}
    >
      <FaGoogle className="text-lg" /> Sign in with Google
    </button>
  );
};
export default GoogleLogin;
