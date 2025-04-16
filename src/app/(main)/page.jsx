"use client";
import DayPlan from "@/components/main/DayPlan";
import Overview from "@/components/main/Overview";
import { useSettings } from "@/services/SettingsProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { userData } = useSettings();

  // Effetcs
  useEffect(() => {
    document.title = `Plan - YAWMLY`;
  }, [userData]);

  useEffect(() => {
    if (status === "loading") return;

    const localUser = localStorage.getItem("user");
    const userWelcomed = JSON.parse(localStorage.getItem("flags"))?.welcomed;

    if (!session?.user?.uid && !localUser) {
      if (userWelcomed) {
        return router.push("/login");
      } else {
        router.push("/welcome");
      }
    }
  }, [session, status, router]);

  return (
    <>
      <DayPlan
        plan={userData?.plans?.[userData?.selectedPlan]}
        planId={userData?.selectedPlan}
      />

      <span className="block w-[98%] mx-auto h-[1px] bg-slate-100 my-10"></span>

      <Overview />
    </>
  );
};
export default page;
