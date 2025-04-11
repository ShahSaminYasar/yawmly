import { FaGoogle } from "react-icons/fa6";

const GoogleLogin = () => {
  return (
    <button className="w-full max-w-[320px] sm:max-w-fit justify-center p-3 rounded-lg bg-[#f7833c] shadow-sm text-[#ffffff] text-[15px] font-medium flex items-center gap-2 cursor-pointer border-2 border-[#f7833c] hover:bg-[#ffdd93] hover:border-[#f7833c] hover:text-[#f7833c]">
      <FaGoogle className="text-lg" /> Sign in with Google
    </button>
  );
};
export default GoogleLogin;
