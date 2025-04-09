"use client";
import DDayViewer from "@/components/main/DDayViewer";
import { useSettings } from "@/services/SettingsProvider";
import Link from "next/link";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { HiMenuAlt1 } from "react-icons/hi";
import { GoGear } from "react-icons/go";

const layout = ({ children }) => {
  const { colors, userData } = useSettings();

  console.log(userData?.plans);

  return (
    <>
      {/* Header */}
      <header
        className="w-full p-5 bg-cover bg-no-repeat flex flex-col gap-0 items-center pb-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,99,2,0.8),rgba(255,99,2,0.8)), url(/assets/bg-1.png)`,
        }}
      >
        <div className="w-full flex justify-between items-center text-white font-normal text-lg">
          <button className="cursor-pointer">
            <HiMenuAlt1 className="text-2xl" />
          </button>
          <DDayViewer />
        </div>
        <div className="w-full flex flex-col items-center gap-1 text-white">
          <h1 className="text-6xl font-semibold block text-center">Yawmly</h1>
          <h3 className="text-lg font-light">Productivity, daily.</h3>
        </div>
      </header>

      {/* Nav (Sidebar) */}
      <nav className="fixed z-40 top-0 left-0 w-full h-full min-h-screen bg-[rgba(255,82,35,0.12)] backdrop-blur-xs fade p-5">
        <div className="w-[90%] max-w-[270px] h-full bg-white shadow-lg rounded-lg relative p-5 flex flex-col gap-3 items-start pt-12">
          {/* Navbar Collapse Button */}
          <button
            className="rounded-sm bg-white border-2 p-1 absolute top-3 right-3 cursor-pointer"
            style={{
              color: colors?.primary,
              borderColor: colors?.primary,
              backgroundColor: colors?.shade,
            }}
          >
            <FaChevronLeft className="text-sm" />
          </button>

          {/* Plans */}
          <Link
            href={"/plans"}
            className="font-normal text-sm w-full border-b border-b-slate-200 pb-1 text-slate-600 flex flex-row justify-between gap-2 items-center"
          >
            <span>Plans</span>
            <span className="flex flex-row items-center gap-1 text-xs text-slate-500">
              View all <FaArrowRight />
            </span>
          </Link>
          <div className="w-full">
            {userData?.plans?.map((plan, index) => (
              <button
                key={`${plan?.title}_${index}`}
                className={`cursor-pointer w-full p-3 rounded-sm flex flex-row justify-between items-center text-sm ${
                  index === userData?.selectedPlan
                    ? "font-medium"
                    : "font-normal"
                }`}
                style={{
                  backgroundColor:
                    index === userData?.selectedPlan
                      ? colors?.secondary
                      : "transparent",
                  color:
                    index === userData?.selectedPlan
                      ? colors?.primary
                      : "#1c1c1c",
                }}
              >
                <span>{plan?.title}</span>
                {index === userData?.selectedPlan && (
                  <Link href={`/settings/plan/${index}`}>
                    <GoGear className="text-lg" />
                  </Link>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="min-h-[67vh] p-5">{children}</main>

      {/* Footer */}
      <footer
        style={{
          background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
        }}
        className="p-5 mt-auto"
      >
        <span className="block text-center text-sm text-white">
          Copyright 2025 &copy;{" "}
          <Link
            href={"https://shahsaminyasar.vercel.app"}
            target="_blank"
            className="font-medium"
          >
            SHAH SAMIN YASAR
          </Link>
        </span>
      </footer>
    </>
  );
};
export default layout;
