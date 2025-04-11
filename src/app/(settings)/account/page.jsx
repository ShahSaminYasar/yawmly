"use client";
import AuthPage from "@/components/auth/AuthPage";
import { useSettings } from "@/services/SettingsProvider";
import { signOut } from "next-auth/react";

const page = () => {
  const { userData, setLogoutModalVisible } = useSettings();

  return userData?.email ? (
    <>
      {`Logged in as ${userData?.name}`}

      <button
        onClick={() => setLogoutModalVisible(true)}
        className="bg-red-600 text-white text-sm rounded-sm"
      >
        Logout
      </button>
    </>
  ) : (
    <AuthPage />
  );
};
export default page;
