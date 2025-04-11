"use client";
import LogoutModal from "@/components/auth/LogoutModal";
import { useSettings } from "@/services/SettingsProvider";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { GoGear, GoHome, GoPerson } from "react-icons/go";

const layout = ({ children }) => {
  const { colors, userData } = useSettings();
  const pathName = usePathname();
  const { status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    let localData = JSON.parse(localStorage.getItem("user"));
    let userWelcomed = JSON.parse(localStorage.getItem("flags"))?.welcomed;

    if (!localData || !localData.uid || localData.uid === "") {
      console.log("No uid found");
      if (userWelcomed) {
        return redirect("/login");
      } else {
        return redirect("/welcome");
      }
    }
  }, [status]);

  return (
    <div
      style={{
        backgroundColor: colors?.shade,
        minHeight: "100vh",
      }}
    >
      <header className="p-5 flex justify-between items-center gap-5">
        <Link
          href={"/"}
          className="text-[#1b1b1b] text-sm font-normal w-fit px-3 py-3 rounded-xl shadow-sm flex items-center gap-2 bg-white"
        >
          <GoHome className="text-lg" />
          Home
        </Link>

        <h1
          className="text-2xl font-semibold block text-center"
          style={{
            color: colors?.accent,
          }}
        >
          YAWMLY
        </h1>

        <span className="block w-[90px]"></span>
      </header>

      <main className="min-h-[80vh] w-full max-w-7xl px-5 mx-auto py-3 pb-[110px]">
        {children}
      </main>

      <nav className="w-[95%] max-w-[400px] sm:max-w-[230px] px-3 py-2 flex justify-around items-center gap-5 rounded-lg shadow-sm text-sm font-medium text-[#1b1b1b] mx-auto fixed bottom-5 left-[50%] -translate-x-[50%] z-50 bg-white">
        <Link
          href={"/settings"}
          className="flex flex-col items-center gap-1 text-[10px] font-normal"
          style={{
            color: pathName?.includes("/settings") ? colors?.accent : "#1b1b1b",
          }}
        >
          <GoGear className="text-sm" />
          <span>Settings</span>
        </Link>
        <Link
          href={"/account"}
          className="flex flex-col items-center gap-1 text-[10px] font-normal"
          style={{
            color: pathName?.includes("/account") ? colors?.accent : "#1b1b1b",
          }}
        >
          <GoPerson className="text-sm" />
          <span>Account</span>
        </Link>
      </nav>

      <LogoutModal />
    </div>
  );
};
export default layout;
