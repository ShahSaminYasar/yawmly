"use client";
import { useSettings } from "@/services/SettingsProvider";

const layout = ({ children }) => {
  const { colors } = useSettings();

  return (
    <main className="w-full relative">
      <div
        className="w-[50%] h-full min-h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(255,99,2,0.8),rgba(255,99,2,0.8)), url(/assets/bg-1.png)`,
        }}
      ></div>
      <div
        className="w-full max-w-[400px] h-fit rounded-lg bg-white shadow-sm p-3 absolute z-10 left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] border-[3px]"
        style={{
          borderColor: colors.accent,
        }}
      >
        {children}
      </div>
    </main>
  );
};
export default layout;
