"use client";
import DDayViewer from "@/components/main/DDayViewer";
import { useSettings } from "@/services/SettingsProvider";
import Link from "next/link";
import { HiMenuAlt1 } from "react-icons/hi";

const layout = ({ children }) => {
  const { colors } = useSettings();

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
