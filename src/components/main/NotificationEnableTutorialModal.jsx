"use client";

import { useSettings } from "@/services/SettingsProvider";
import Image from "next/image";
import { useEffect } from "react";

const NotificationEnableTutorialModal = () => {
  const {
    notificationEnablingTutorialModalVisible,
    setNotificationEnablingTutorialModalVisible,
    colors,
  } = useSettings();

  return (
    notificationEnablingTutorialModalVisible && (
      <div className="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-xs flex items-center justify-center fade p-4">
        {/* Modal Closer Layer */}
        <div
          className="absolute z-[-1] top-0 left-0 w-full h-full bg-transparent"
          onClick={() => setNotificationEnablingTutorialModalVisible(false)}
        ></div>

        {/* Modal Body */}
        <div
          className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down`}
        >
          {/* Title */}
          <span
            className="text-2xl font-normal block text-center mb-3"
            style={{
              color: colors?.primary,
            }}
          >
            Turn On Notifications{" "}
          </span>

          {/* Body */}
          <div className="w-full flex flex-col gap-2 items-center">
            <p className="block text-center text-slate-800 text-xs font-normal">
              Please follow the steps on your browser to turn on notifications.
            </p>

            <Image
              src={"/assets/yawmly_notifications_tutorial.gif"}
              width={300}
              height={300}
              alt="Tutorial GIF to turn on notifications"
              className="w-full max-w-[300px] rounded-xl border-4 border-orange-200"
            />
          </div>

          {/* Tag Publish Button */}
          <button
            onClick={() => setNotificationEnablingTutorialModalVisible(false)}
            type="submit"
            className="w-full text-sm font-semibold block text-center text-slate-100 px-2 py-[8px] rounded-sm active:scale-[92%] mt-3 cursor-pointer"
            style={{
              backgroundColor: colors?.primary,
            }}
          >
            Got it 👍
          </button>
        </div>
      </div>
    )
  );
};
export default NotificationEnableTutorialModal;
