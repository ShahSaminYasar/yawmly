"use client";
import { useSettings } from "@/services/SettingsProvider";
import { useSession } from "next-auth/react";

const LoadingScreen = () => {
  const { colors, updatingUserData, globalLoading } = useSettings();
  const { status } = useSession();

  const isVisible = updatingUserData || globalLoading || status === "loading";

  return (
    <div
      className={`fixed h-screen w-[100vw] items-center justify-center gap-3 bg-white top-0 left-0 z-[100] fade ${
        isVisible ? "flex pointer-events-auto" : "hidden pointer-events-none"
      }`}
      style={{
        color: colors?.primary,
      }}
    >
      <span className="text-3xl font-semibold block text-center">
        Loading...
      </span>
    </div>
  );
};
export default LoadingScreen;
