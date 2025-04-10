"use client";
import { useSettings } from "@/services/SettingsProvider";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import NavSidebar from "@/components/main/NavSidebar";
import Header from "@/components/main/Header";
import Footer from "@/components/common/Footer";

gsap.registerPlugin(useGSAP);

const Layout = ({ children }) => {
  const { colors } = useSettings();

  return (
    <>
      {/* Header */}
      <Header />

      {/* Nav Sidebar */}
      <NavSidebar />

      {/* Main */}
      <main className="min-h-[67vh] p-5">
        <div className="w-full max-w-7xl mx-auto">{children}</div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};
export default Layout;
