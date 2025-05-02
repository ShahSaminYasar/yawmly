"use client";
import PlanLayout from "@/components/settings/PlanLayout";
import Tags from "@/components/settings/Tags";
import TimeFormat from "@/components/settings/TimeFormat";
import WakeUpTime from "@/components/settings/WakeUpTime";
import { useSettings } from "@/services/SettingsProvider";
import { useEffect } from "react";
// import toast from "react-hot-toast";

const page = () => {
  const {
    colors,
    notificationsEnabled,
    enableNotifications,
    // setNotificationsEnabled,
  } = useSettings();

  // Effects
  useEffect(() => {
    document.title = `Settings — YAWMLY`;
  }, []);

  // Functions
  // const enableNotifications = () => {
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       setNotificationsEnabled(true);
  //       return redirect("/");
  //     } else {
  //       return toast(
  //         "Notification permissions were not given. Please go to the website and give notification permission by clicking the 🔒 icon on the address bar."
  //       );
  //     }
  //   });
  // };

  return (
    <>
      <section className="w-full flex flex-col gap-3 items-start text-slate-700 text-sm font-medium py-6 fade">
        <h3
          className="text-2xl font-semibold"
          style={{
            color: colors?.accent,
          }}
        >
          SETTINGS
        </h3>

        {!notificationsEnabled && (
          <div className="my-0 mb-2 flex flex-col items-start gap-1">
            <p>
              Enable notifications to receive daily routine reminders and stay
              updated.
            </p>
            <button
              onClick={enableNotifications}
              className="px-3 py-2 bg-blue-600 text-white text-xs font-medium block w-fit mr-auto shadow rounded-sm active:scale-95 cursor-pointer"
            >
              Enable Notifications
            </button>
          </div>
        )}

        {/* Plan Layout */}
        <PlanLayout />

        {/* Preferred Time Format */}
        <TimeFormat />

        {/* Wake up time */}
        <WakeUpTime />

        {/* Tags */}
        <Tags />
      </section>
    </>
  );
};
export default page;
