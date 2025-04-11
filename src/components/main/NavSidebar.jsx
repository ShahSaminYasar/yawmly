import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useSettings } from "@/services/SettingsProvider";
import {
  FaArrowRight,
  FaCheck,
  FaChevronLeft,
  FaFacebook,
  FaGithub,
  FaGlobe,
  FaInstagram,
} from "react-icons/fa6";
import { GoGear, GoHome } from "react-icons/go";
import { redirect, usePathname } from "next/navigation";
import { LuBlocks } from "react-icons/lu";
import { IoTodayOutline } from "react-icons/io5";
import DDayViewer from "./DDayViewer";
import moment from "moment";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const NavSidebar = () => {
  const { navSidebarTL, toggleNavSidebarOpen, colors, userData, setUserData } =
    useSettings();
  const pathname = usePathname();

  // Effects
  useGSAP(() => {
    const ctx = gsap.context(() => {
      navSidebarTL.current.clear().pause(0);

      gsap.set("#nav_sidebar_container", {
        opacity: 0,
        pointerEvents: "none",
      });
      gsap.set("#nav_sidebar", { translateX: "-150%" });

      navSidebarTL.current
        .to("#nav_sidebar_container", {
          opacity: 1,
          pointerEvents: "all",
          duration: 0.01,
        })
        .to("#nav_sidebar", {
          translateX: "0%",
          duration: 0.12,
          ease: "power1.inOut",
          delay: -0.03,
        });
    });

    return () => ctx.revert();
  }, [navSidebarTL]);

  const visitNavLink = (link) => {
    toggleNavSidebarOpen();
    setTimeout(() => {
      return redirect(link);
    }, 100);
  };

  return (
    <nav
      id="nav_sidebar_container"
      className="opacity-0 pointer-events-none fixed z-40 top-0 left-0 w-full h-full min-h-screen bg-[rgba(255,82,35,0.12)] backdrop-blur-xs p-5"
    >
      {/* Nav Closer Layer */}
      <div
        onClick={toggleNavSidebarOpen}
        className="absolute top-0 left-0 w-full h-full bg-transparent z-[-1]"
      ></div>

      <div
        id="nav_sidebar"
        className="-translate-x-[150%] w-[90%] max-w-[270px] h-full overflow-y-auto bg-white shadow-lg rounded-lg relative p-5 flex flex-col gap-2 items-start pt-12 z-40"
      >
        {/* Navbar Collapse Button */}
        <button
          onClick={toggleNavSidebarOpen}
          className="rounded-sm bg-white border-2 p-1 absolute top-3 right-3 cursor-pointer"
          style={{
            color: colors?.primary,
            borderColor: colors?.primary,
            backgroundColor: colors?.shade,
          }}
        >
          <FaChevronLeft className="text-sm" />
        </button>

        <button
          className={`text-sm font-medium cursor-pointer active:scale-[96%] flex items-center gap-2 w-full px-3 py-2 rounded-sm ${
            pathname === "/" ? "shadow-sm" : "shadow-none"
          }`}
          onClick={() => visitNavLink("/")}
          style={{
            color: pathname === "/" ? colors.primary : "#1b1b1b",
            backgroundColor: pathname === "/" ? colors.shade : "transparent",
          }}
        >
          <GoHome className="text-sm" /> Home
        </button>

        <button
          className={`text-sm font-medium cursor-pointer active:scale-[96%] flex items-center gap-2 w-full px-3 py-2 rounded-sm ${
            pathname === "/plans" ? "shadow-sm" : "shadow-none"
          }`}
          onClick={() => visitNavLink("/plans")}
          style={{
            color: pathname === "/plans" ? colors.primary : "#595959",
            backgroundColor:
              pathname === "/plans" ? colors.shade : "transparent",
          }}
        >
          <LuBlocks className="text-sm" /> My Plans
        </button>

        <button
          className={`text-sm font-medium cursor-pointer active:scale-[96%] flex items-center gap-2 w-full px-3 py-2 rounded-sm ${
            pathname === "/ddays" ? "shadow-sm" : "shadow-none"
          }`}
          onClick={() => visitNavLink("/ddays")}
          style={{
            color: pathname === "/ddays" ? colors.primary : "#595959",
            backgroundColor:
              pathname === "/ddays" ? colors.shade : "transparent",
          }}
        >
          <IoTodayOutline className="text-sm" /> D-Days
        </button>

        {/* Plans */}
        <button
          onClick={() => visitNavLink("/plans")}
          className="cursor-pointer font-normal text-sm w-full border-t border-t-slate-200 pt-2 text-slate-600 flex flex-row justify-between gap-2 items-center mt-3 mb-0"
        >
          <span>Plans</span>
          {/* <span className="flex flex-row items-center gap-1 text-xs text-slate-500">
            View all <FaArrowRight />
          </span> */}
        </button>
        <div className="w-full mt-0 min-h-[55px] max-h-[90px] overflow-y-auto">
          {userData?.plans?.map((plan, index) => (
            <button
              key={`${plan?.title}_${index}`}
              className={`cursor-pointer w-full p-3 rounded-sm flex flex-row justify-between items-center text-sm font-medium`}
              style={{
                backgroundColor:
                  index === userData?.selectedPlan
                    ? colors?.secondary
                    : "transparent",
                color:
                  index === userData?.selectedPlan ? colors?.accent : "#595959",
              }}
              onClick={() =>
                setUserData((prev) => ({ ...prev, selectedPlan: index }))
              }
            >
              <span>{plan?.title}</span>
              {index === userData?.selectedPlan && <FaCheck />}
            </button>
          ))}
        </div>

        {/* D-Days */}
        <button
          onClick={() => visitNavLink("/ddays")}
          className="cursor-pointer font-normal text-sm w-full border-t border-t-slate-200 pt-2 text-slate-600 flex flex-row justify-between gap-2 items-center mt-1 mb-0"
        >
          <span>D-Days</span>
          {/* <span className="flex flex-row items-center gap-1 text-xs text-slate-500">
            View all <FaArrowRight />
          </span> */}
        </button>
        <div className="w-full mt-0 flex flex-col gap-1 min-h-[55px] max-h-[108px] overflow-y-auto">
          {userData?.dDays?.map((dDay, index) => (
            <button
              key={`${dDay?.name}_${index}`}
              className={`cursor-pointer w-full px-3 py-2 rounded-lg flex flex-row justify-between items-center text-sm font-medium relative`}
              style={{
                backgroundColor: dDay?.bgColor,
                color: dDay?.textColor,
              }}
              onClick={() =>
                setUserData((prev) => ({ ...prev, selectedDDay: index }))
              }
            >
              <DDayViewer dDate={dDay?.date} className={"text-xl font-bold"} />

              <div className="flex flex-col items-end gap-0">
                <span className="text-sm font-semibold">{dDay?.name}</span>
                <span className="text-xs font-light">
                  {moment(dDay?.date).format("D/MM/YYYY")}
                </span>
              </div>

              {index === userData?.selectedDDay && (
                <span
                  style={{
                    color: dDay?.bgColor,
                    backgroundColor: dDay?.textColor,
                    borderColor: dDay?.bgColor,
                  }}
                  className="block aspect-square p-[2px] rounded-full absolute top-0 left-0 shadow-sm border"
                >
                  <FaCheck className="text-[8px]" />
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bottom Part of Sidebar */}
        <div className="w-full mt-auto">
          {/* Account & Settings */}
          <button
            className={`text-sm font-medium cursor-pointer active:scale-[96%] flex items-center gap-2 w-full px-3 py-2 rounded-sm ${
              pathname === "/settings" ? "shadow-sm" : "shadow-none"
            }`}
            onClick={() => visitNavLink("/settings")}
            style={{
              color: pathname === "/plans" ? colors.primary : "#595959",
              backgroundColor:
                pathname === "/plans" ? colors.shade : "transparent",
            }}
          >
            <GoGear className="text-sm" /> Settings & Account
          </button>

          {/* Developer - Handles */}
          <div className="text-slate-400 flex flex-row justify-center gap-3 items-center w-full pt-3 my-2 border-t border-t-slate-200">
            <Link href={"https://shahsaminyasar.vercel.app"} target="_blank">
              <FaGlobe className="text-lg hover:text-indigo-600" />
            </Link>
            <Link href={"https://github.com/ShahSaminYasar"} target="_blank">
              <FaGithub className="text-lg hover:text-slate-900" />
            </Link>
            <Link
              href={"https://www.instagram.com/shah_samin_yasar"}
              target="_blank"
            >
              <FaInstagram className="text-lg hover:text-pink-600" />
            </Link>
            <Link
              href={"https://www.facebook.com/shahsaminyasar"}
              target="_blank"
            >
              <FaFacebook className="text-lg hover:text-blue-600" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavSidebar;
