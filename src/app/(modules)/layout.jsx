"use client";
import Footer from "@/components/common/Footer";
import DDayViewer from "@/components/main/DDayViewer";
import NavSidebar from "@/components/main/NavSidebar";
import { useSettings } from "@/services/SettingsProvider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";

const layout = ({ children }) => {
  const { toggleNavSidebarOpen } = useSettings();
  const pathname = usePathname();

  // States
  const [title, setTitle] = useState("");

  // Effects
  useEffect(() => {
    if (pathname?.split("/")[1] === "plans") {
      setTitle("Plans");
    } else if (pathname?.split("/")[1] === "ddays") {
      setTitle("D-Days");
    }
  });

  return (
    <>
      <header
        className="w-full p-5 bg-cover bg-no-repeat flex flex-col gap-0 items-center pb-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,99,2,0.8),rgba(255,99,2,0.8)), url(/assets/bg-1.png)`,
        }}
      >
        <div className="w-full flex justify-between items-center text-white font-normal text-lg">
          <button onClick={toggleNavSidebarOpen} className="cursor-pointer">
            <HiMenuAlt1 className="text-2xl" />
          </button>
          <div>
            <DDayViewer />
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-1 text-white">
          <h1 className="text-6xl font-semibold block text-center">
            {title || "Yawmly"}
          </h1>
        </div>
      </header>

      <NavSidebar />

      <main className="px-5 py-8 min-h-[75vh]">
        <div className="w-full max-w-7xl mx-auto">{children}</div>
      </main>

      <Footer />
    </>
  );
};
export default layout;
