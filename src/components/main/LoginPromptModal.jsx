"use client";
import { useSettings } from "@/services/SettingsProvider";
import GoogleLogin from "../auth/GoogleLogin";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa6";
import { redirect } from "next/navigation";

const LoginPromptModal = () => {
  const { loginPromptModalVisible, setLoginPromptModalVisible, colors } =
    useSettings();

  return (
    loginPromptModalVisible && (
      <div className="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-xs flex items-center justify-center fade p-4">
        {/* Modal Closer Layer */}
        <div
          className="absolute z-[-1] top-0 left-0 w-full h-full bg-transparent"
          onClick={() => setLoginPromptModalVisible(false)}
        ></div>

        {/* Modal Body */}
        <div
          className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down`}
        >
          {/* Title */}
          <span
            className="text-2xl font-normal block text-center mb-3"
            style={{
              color: colors?.primary,
            }}
          >
            Backup/Sync Plans
          </span>

          {/* Body */}
          <div className="w-full flex flex-col gap-2 items-center">
            <p className="block text-center text-slate-800 text-xs font-medium mb-3">
              Login to view your plans on all your devices.
            </p>

            <GoogleLogin
              className={"w-full sm:max-w-[300px] text-[12px] sm:text-[15px]"}
              style={{
                maxWidth: "300px",
              }}
            />

            <button
              onClick={() => {
                setLoginPromptModalVisible(false);
                return redirect("/account");
              }}
              className="w-full max-w-[300px] justify-center py-3 px-1 rounded-lg bg-[#ffffff] shadow-sm text-[#f7833c] text-[15px] font-medium flex items-center gap-2 cursor-pointer border-2 border-[#f7833c] hover:bg-[#ffdd93] hover:border-[#ffffff] hover:text-[#f7833c] mb-3"
            >
              <FaEnvelope className="text-lg" /> Login/Create account with Email
            </button>
          </div>

          {/* Tag Publish Button */}
          <button
            onClick={() => setLoginPromptModalVisible(false)}
            type="submit"
            className="w-full text-sm font-semibold block text-center text-slate-100 px-2 py-[8px] rounded-sm active:scale-[92%] mt-3 cursor-pointer"
            style={{
              backgroundColor: colors?.primary,
            }}
          >
            Remind me later 🤔
          </button>
        </div>
      </div>
    )
  );
};
export default LoginPromptModal;
