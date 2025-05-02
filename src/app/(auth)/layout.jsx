"use client";
import { useSettings } from "@/services/SettingsProvider";
import { useSession } from "next-auth/react";

const layout = ({ children }) => {
  const { colors } = useSettings();
  const { status } = useSession();

  return (
    <main className="w-full relative">
      <div
        className="w-[50%] h-full min-h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(255,99,2,0.75),rgba(255,99,2,0.75)), url(/assets/auth-bg.png)`,
          backgroundPosition: "0% 0%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      ></div>
      <div
        className="w-[90%] max-w-[400px] h-fit rounded-lg bg-white shadow-sm p-3 absolute z-10 left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] border-[3px]"
        style={{
          borderColor: colors.accent,
        }}
      >
        {status === "authenticated" && (
          <span className="my-10 block text-center text-xl font-normal text-slate-600 fade-up">
            Login Successful ✅
          </span>
        )}
        {children}
      </div>
    </main>
  );
};
export default layout;
