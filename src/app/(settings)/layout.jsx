"use client";
import LogoutModal from "@/components/auth/LogoutModal";
import { useSettings } from "@/services/SettingsProvider";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  GoCloudOffline,
  GoGear,
  GoHome,
  GoPerson,
  GoSignIn,
} from "react-icons/go";
import { FcUnlock } from "react-icons/fc";

const layout = ({ children }) => {
  const { colors } = useSettings();
  const pathName = usePathname();
  const { data: session, status } = useSession();

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
        backgroundColor: "#ffffff",
        minHeight: "100vh",
      }}
      className="p-2 sm:p-5"
    >
      <header
        className="px-3 sm:px-5 py-3 grid grid-cols-3 justify-between items-center gap-1 sm:gap-5 w-[100%] max-w-7xl rounded-lg shadow-lg mx-auto"
        style={{
          backgroundColor: colors?.shade,
        }}
      >
        <Link
          href={"/"}
          className="text-[#1b1b1b] text-xs sm:text-sm font-normal w-fit flex items-center gap-2"
        >
          <GoHome className="text-sm sm:text-lg" />
          Home
        </Link>

        <h1
          className="text-2xl font-semibold block text-center"
          style={{
            color: colors?.accent,
          }}
        >
          <Link href={"/"}>Yawmly</Link>
        </h1>

        <div>
          {status === "authenticated" ? (
            navigator?.onLine ? (
              <div className="flex flex-col items-end gap-0 text-[11px] text-right sm:text-sm font-normal text-slate-500 w-full overflow-x-hidden text-ellipsis">
                <span className="text-green-500 font-medium">Synced ✅</span>
                <span className="text-[10px] hidden sm:block text-right w-full overflow-hidden sm:text-xs font-medium text-ellipsis">
                  {session?.user?.email}
                </span>
              </div>
            ) : (
              <span className="flex items-center gap-1 text-xs sm:text-sm text-slate-600 w-fit ml-auto">
                Offline
                <GoCloudOffline />
              </span>
            )
          ) : (
            <Link
              href={"/account"}
              className="text-xs sm:text-sm font-medium rounded-md w-fit ml-auto px-1 sm:px-3 py-1 sm:py-2 flex items-center gap-1"
              style={{
                backgroundColor: colors?.primary,
                color: "#ffffff",
              }}
            >
              Login <GoSignIn className="text-sm" />
            </Link>
          )}
        </div>
      </header>

      <main className="min-h-[80vh] w-full max-w-7xl px-2 mx-auto pt-1 pb-[110px]">
        {children}
      </main>

      <div
        className="w-full fixed bottom-0 left-0 z-50 h-fit"
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <nav
          className="w-[95%] max-w-[400px] sm:max-w-[330px] px-3 py-2 flex justify-around items-center gap-5 rounded-lg shadow-sm text-sm font-medium text-[#1b1b1b] mx-auto -translate-y-3 sm:-translate-y-4"
          style={{
            backgroundColor: colors?.shade,
          }}
        >
          <Link
            href={"/admin"}
            className="flex flex-col items-center gap-1 text-[12px] font-normal"
            style={{
              color: pathName?.includes("/admin") ? colors?.accent : "#1b1b1b",
            }}
          >
            <FcUnlock className="text-lg" />
            <span></span>
          </Link>
          <Link
            href={"/settings"}
            className="flex flex-col items-center gap-1 text-[12px] font-normal"
            style={{
              color: pathName?.includes("/settings")
                ? colors?.accent
                : "#1b1b1b",
            }}
          >
            <GoGear className="text-lg" />
            <span>Settings</span>
          </Link>
          <Link
            href={"/account"}
            className="flex flex-col items-center gap-1 text-[12px] font-normal"
            style={{
              color: pathName?.includes("/account")
                ? colors?.accent
                : "#1b1b1b",
            }}
          >
            <GoPerson className="text-lg" />
            <span>Account</span>
          </Link>
        </nav>
      </div>

      <LogoutModal />
    </div>
  );
};
export default layout;
