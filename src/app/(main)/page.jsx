"use client";
import DayPlan from "@/components/main/DayPlan";
import Overview from "@/components/main/Overview";
import PreferredPlanLayoutModal from "@/components/main/PreferredPlanLayoutModal";
import { useSettings } from "@/services/SettingsProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { userData } = useSettings();

  // States
  const [blocksArray, setBlocksArray] = useState([]);
  const [targetBlockYPos, setTargetBlockYPos] = useState(0);
  const [planLoading, setPlanLoading] = useState(true);

  // Effects
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
        blocksArray={blocksArray}
        setBlocksArray={setBlocksArray}
        targetBlockYPos={targetBlockYPos}
        setTargetBlockYPos={setTargetBlockYPos}
        planLoading={planLoading}
        setPlanLoading={setPlanLoading}
      />

      <span className="block w-[98%] mx-auto h-[1px] bg-slate-100 mt-10 mb-8"></span>

      <Overview />

      {userData?.name && !userData?.settings?.preferredPlanLayout && (
        <PreferredPlanLayoutModal
          blocksArray={blocksArray}
          setBlocksArray={setBlocksArray}
          targetBlockYPos={targetBlockYPos}
          setTargetBlockYPos={setTargetBlockYPos}
          planLoading={planLoading}
          setPlanLoading={setPlanLoading}
        />
      )}
    </>
  );
};
export default page;
