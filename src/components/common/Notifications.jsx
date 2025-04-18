"use client";
import { useSettings } from "@/services/SettingsProvider";
import { urlB64ToUint8Array } from "@/utils/urlB64ToUint8Array";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuBellOff, LuBellRing } from "react-icons/lu";

const Notifications = () => {
  const { userData } = useSettings();

  // States
  const [notificationPermission, setNotificationPermission] =
    useState("default");

  // Effects
  useEffect(() => {
    if (Notification.permission === "default" && userData?.uid) {
      setTimeout(() => {
        console.log("Please grant notification permission");
        showNotification();
      }, 3500);
    }
  }, [userData]);

  useEffect(() => {
    const setup = async () => {
      const localSubscriptionKey = JSON.parse(
        localStorage.getItem("push-notification")
      );

      if (typeof window !== "undefined" && "Notification" in window) {
        setNotificationPermission(Notification.permission);

        if (Notification.permission === "granted") {
          await subscribeUser();
        }
      }

      if (
        userData.uid &&
        localSubscriptionKey?.subscriptionKey &&
        !localSubscriptionKey?.uid
      ) {
        await saveSubscriptionKey(
          userData?.uid,
          localSubscriptionKey?.subscriptionKey
        );
        localSubscriptionKey.uid = userData?.uid;
        localStorage.setItem(
          "push-notification",
          JSON.stringify(localSubscriptionKey)
        );
      }
    };

    setup();
  }, [userData]);

  //   useEffect(() => {
  //     const localSubscriptionKey = JSON.parse(
  //       localStorage.getItem("push-notification")
  //     );

  //     if (typeof window !== "undefined" && "Notification" in window) {
  //       setNotificationPermission(Notification.permission);

  //       if (Notification.permission === "granted" && !localSubscriptionKey) {
  //         subscribeUser();
  //       }
  //     }

  //     if (
  //       userData.uid &&
  //       localSubscriptionKey.subscriptionKey &&
  //       !localSubscriptionKey.uid
  //     ) {
  //       saveSubscriptionKey(userData?.uid, localSubscriptionKey?.subscriptionKey);
  //       localSubscriptionKey.uid = userData?.uid;
  //       return localStorage.setItem(
  //         "push-notification",
  //         JSON.stringify(localSubscriptionKey)
  //       );
  //     }
  //   }, [userData]);

  // Functions

  const showNotification = () => {
    console.log("notifications requested to be shown");
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
        if (permission === "granted") {
          subscribeUser();
        } else {
          return toast(
            "Please go to app settings and enable notifications to get daily reminders.",
            {
              icon: "🔔",
            }
          );
        }
      });
    } else {
      return toast.error("Notifications are not supported in this browser...");
    }
  };

  const subscribeUser = async () => {
    if ("serviceWorker" in navigator) {
      try {
        // const registration = await navigator.serviceWorker.getRegistration();
        // // console.log("REGISTRATION: ", registration);
        // if (registration) {
        //   generateSubscribeEndPoint(registration);
        // } else {
        //   const newRegistration = await navigator.serviceWorker.register(
        //     "/sw.js"
        //   );
        //   generateSubscribeEndPoint(newRegistration);
        // }

        let registration = await navigator.serviceWorker.getRegistration();

        if (!registration) {
          await navigator.serviceWorker.register("/sw.js");
        }

        // Wait until the service worker is active and controlling the page
        registration = await navigator.serviceWorker.ready;

        const existingSubscription =
          await registration.pushManager.getSubscription();

        if (existingSubscription) {
          let localKey = JSON.parse(localStorage.getItem("push-notification"));
          if (localKey && localKey?.uid) {
            localKey.subscriptionKey = existingSubscription;
            saveSubscriptionKey(localKey?.uid, existingSubscription);
          }
          return;
        }

        generateSubscribeEndPoint(registration);
      } catch (error) {
        return toast.error(
          error?.message ||
            "Error during service worker registration or subscription"
        );
      }
    } else {
      return toast.error(
        "Service workers are not supported in this browser..."
      );
    }
  };

  const generateSubscribeEndPoint = async (newRegistration) => {
    const applicationServerKey = urlB64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
    );

    const options = {
      applicationServerKey,
      userVisibleOnly: true,
    };

    const subscription = await newRegistration.pushManager.subscribe(options);

    const res = await axios.post("/api/post/save-subscription", {
      uid: userData?.uid || userData?._id,
      subscription,
    });

    if (res?.data?.ok) {
      localStorage.setItem(
        "push-notification",
        JSON.stringify({
          uid: userData?.uid || userData?._id,
          subscriptionKey: subscription,
        })
      );
      return toast.success(
        "Notifications enabled, you will get daily reminder notifications at your day-starting time."
      );
    } else {
      return toast.error(
        res?.data?.message || "Failed, might be network/server error"
      );
    }
  };

  const saveSubscriptionKey = async (uid, subscription) => {
    try {
      const res = await axios.post("/api/post/save-subscription", {
        uid,
        subscription,
      });

      if (!res?.data?.ok) {
        return console.log(
          res?.data?.message || "Failed to save subscription key"
        );
      }
    } catch (error) {
      return console.error(error);
    }
  };

  return notificationPermission === "granted" ? (
    <LuBellRing className="text-white text-lg fade-down" />
  ) : (
    <button onClick={showNotification} className="cursor-pointer">
      <LuBellOff className="text-white text-lg fade-down" />
    </button>
  );
};
export default Notifications;
