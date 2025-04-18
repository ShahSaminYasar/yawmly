"use client";
import Tags from "@/components/settings/Tags";
import TimeFormat from "@/components/settings/TimeFormat";
import WakeUpTime from "@/components/settings/WakeUpTime";
import { useSettings } from "@/services/SettingsProvider";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const { colors } = useSettings();

  // States
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Effects
  useEffect(() => {
    document.title = `Settings — YAWMLY`;

    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        setNotificationsEnabled(true);
      }
    }
  }, []);

  // Functions
  const enableNotifications = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setNotificationsEnabled(true);
        return redirect("/");
      } else {
        return toast(
          "Notification permissions were not given. Please go to the website and give notification permission by clicking the 🔒 icon on the address bar."
        );
      }
    });
  };

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
          <div className="my-5">
            <button
              onClick={enableNotifications}
              className="px-3 py-2 bg-blue-600 text-white text-xs font-medium block w-fit mr-auto shadow rounded-sm active:scale-95 cursor-pointer"
            >
              Enable Notifications
            </button>
          </div>
        )}

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
