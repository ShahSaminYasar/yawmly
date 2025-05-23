import { HiMenuAlt1 } from "react-icons/hi";
import DDayViewer from "@/components/main/DDayViewer";
import { useSession } from "next-auth/react";
import { useSettings } from "@/services/SettingsProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Notifications from "../common/Notifications";

gsap.registerPlugin(useGSAP);

const Header = () => {
  const { toggleNavSidebarOpen, globalLoading } = useSettings();
  const { status } = useSession();

  const headerTL = gsap.timeline({ paused: true });

  // Effects
  useGSAP(() => {
    if (status !== "loading" && !globalLoading) {
      headerTL.play();
    }

    let heading = document.getElementById("heading");
    heading.innerHTML = heading?.textContent
      ?.split("")
      ?.map(
        (letter) =>
          `<span style='display: inline-block; transform: translate(0px, 50px); opacity: 50%;'>${
            letter === " " ? "&nbsp;" : letter
          }</span>`
      )
      ?.join("");

    headerTL
      .to("#heading", {
        opacity: 1,
        duration: 0,
        delay: 0,
      })
      .to("#heading span", {
        y: "0px",
        opacity: 1,
        duration: 0.15,
        stagger: 0.03,
        ease: "none",
      })
      .to("#subheading", {
        opacity: 1,
        duration: 0.18,
      })
      .to("#nav_burger, #d_day", {
        translateX: "0px",
        duration: 0.8,
        delay: 0,
        ease: "elastic.inOut(2,1)",
      });
  }, [status, globalLoading]);

  return (
    <header
      id="header"
      className="w-full p-5 bg-cover bg-no-repeat bg-fixed flex flex-col gap-0 items-center pb-10 bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255,99,2,0.75),rgba(255,99,2,0.75)), url(/assets/bg-5.png)`,
        backgroundBlendMode: "normal",
      }}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center text-white font-normal text-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleNavSidebarOpen}
            id="nav_burger"
            className="cursor-pointer -translate-x-[80px]"
          >
            <HiMenuAlt1 className="text-2xl" />
          </button>

          <Notifications />
        </div>

        <div id="d_day" className="translate-x-[80px]">
          <DDayViewer />
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-0 text-white py-[2vh]">
        <div className="overflow-hidden py-1">
          <h1
            id="heading"
            className="opacity-0 text-6xl font-semibold block text-center"
          >
            Yawmly
          </h1>
        </div>
        <h3 id="subheading" className="text-lg font-light mt-1 opacity-0">
          Productivity, daily.
        </h3>
      </div>
    </header>
  );
};
export default Header;
