"use client";
import DayPlan from "@/components/main/DayPlan";
import { useSettings } from "@/services/SettingsProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { userData } = useSettings();

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
    <DayPlan
      plan={userData?.plans?.[userData?.selectedPlan]}
      planId={userData?.selectedPlan}
    />
  );
};
export default page;
