"use client";
import axios from "axios";
import gsap from "gsap";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

const SettingsProvider = ({ children }) => {
  const { data: session, status } = useSession();

  // States
  const [updatingUserData, setUpdatingUserData] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [blockAddModalVisible, setBlockAddModalVisible] = useState(false);
  const [tagAddModalVisible, setTagAddModalVisible] = useState(false);
  const [navSidebarOpen, setNavSidebarOpen] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [conflictingDataSets, setConflictingDataSets] = useState({});
  const [chooseDataSetModalVisible, setChooseDataSetModalVisible] =
    useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [
    notificationEnablingTutorialModalVisible,
    setNotificationEnablingTutorialModalVisible,
  ] = useState(false);
  const [firstEntryDone, setFirstEntryDone] = useState(false);
  const [loginPromptModalVisible, setLoginPromptModalVisible] = useState(false);

  // Refs
  const navSidebarTL = useRef(gsap.timeline({ paused: true }));

  // Functions
  const updateOnlineUserData = async (data) => {
    await axios.put("/api/put/users", data);
    // let res = await axios.put("/api/put/users", data);
    // console.log("PUT of online data (log): ", data);
  };

  const updateLastSeen = async (uid) => {
    if (!uid) return;
    try {
      await axios.put("/api/put/update-last-seen", {
        uid,
      });
      // console.log("updated");
    } catch (error) {
      return console.error(error?.message);
    }
  };

  // Effects
  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        setNotificationsEnabled(true);
      }
    }
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    // Load the local version
    let localUserData = JSON.parse(localStorage.getItem("user"));

    if (status === "authenticated") {
      // console.log("Session found: ", session);

      // If user doc (with uid) is present in the DB
      const getUserData = async () => {
        try {
          // Get the online version
          let onlineUserData = await axios.get(
            `/api/get/users?uid=${session?.user?.uid}`
          );
          onlineUserData = onlineUserData?.data?.data?.[0];

          // Local data is brand new but was modified by the user and online data was registered before
          if (
            localUserData &&
            !localUserData?.email &&
            onlineUserData?.email &&
            localUserData?.lastUpdatedAt > localUserData?.registeredAt
          ) {
            // console.log("Found conflicting data...");
            setConflictingDataSets({
              local: localUserData,
              online: onlineUserData,
            });
            return setChooseDataSetModalVisible(true);
          }

          // Compare local and online versions
          if (
            localUserData &&
            localUserData?.lastUpdatedAt > onlineUserData?.lastUpdatedAt
          ) {
            // If local version is the latest one, then set userData to local version
            if (!localUserData || localUserData?.plans?.length === 0) return;
            setUserData(localUserData);
            // console.log("User's data was set from LS: ", localUserData);

            // Replace the online version with the local one
            // console.log("Uploading user data: ", localUserData);
            updateOnlineUserData(localUserData);
          } else {
            // If online version is the latest one, then set userData to the online version
            if (!onlineUserData || onlineUserData?.length === 0) {
              setGlobalLoading(false);
              if (localUserData) return setUserData(localUserData);
              console.log("User's data in DB was found to be null/undefined");
              return;
            }
            setUserData(onlineUserData);
            // console.log("User's data was set from DB: ", onlineUserData);
          }
        } catch (error) {
          console.error(error);
          setGlobalLoading(false);
        }
        // return setGlobalLoading(false);
      };

      // If no user doc is present (sign up through google)
      const pushNewGoogleUser = async () => {
        try {
          let newUserDoc = {
            name: session?.user?.name || "Unnamed",
            email: session?.user?.email,
            settings: {
              wakeUpTime: "05:00",
              tags: {
                study: {
                  bg: "#fde4be",
                  text: "#ff6302",
                },
                coaching: {
                  bg: "#e0f3ff",
                  text: "#006eff",
                },
                college: {
                  bg: "#eae0ff",
                  text: "#d400ff",
                },
                rest: {
                  bg: "#fdffdb",
                  text: "#ffa200",
                },
                prayer: {
                  bg: "#c2ffe2",
                  text: "#00b377",
                },
                snacks: {
                  bg: "#f8e0ff",
                  text: "#9900ff",
                },
                nap: {
                  bg: "#3f9fde",
                  text: "#ebfcff",
                },
                sleep: {
                  bg: "#334f8e",
                  text: "#f5f9ff",
                },
                meal: {
                  bg: "#ffe0f7",
                  text: "#ff42a7",
                },
                washroom: {
                  bg: "#c2ffed",
                  text: "#00755e",
                },
              },
              preferredTimeFormat: "t",
            },
            registeredAt: new Date(),
            plans: [
              {
                title: "Default plan",
                createdOn: new Date(),
                plan: {
                  header: ["Time", "Session", "Remarks"],
                  rows: [
                    {
                      start: 300,
                      end: 300 + 50,
                      title: "Wake up and get ready",
                      tag: "rest",
                      remarks: {
                        checked: false,
                        note: "",
                      },
                    },
                  ],
                },
              },
            ],
            dDays: [],
            selectedPlan: 0,
            selectedDDay: 0,
            lastUpdatedAt: new Date().toISOString(),
            password: `google-oauth:${[...Array(16)]
              .map(() => Math.random().toString(36).charAt(2))
              .join("")}`,
          };

          let newUserPushRes = await axios.post(
            "/api/auth/new-user",
            newUserDoc
          );

          if (!newUserPushRes?.data?.ok) {
            setGlobalLoading(false);
            return toast.error("Failed to save user data");
          }

          newUserDoc.uid = newUserPushRes?.data?.uid;
          setUserData(newUserDoc);

          // return setGlobalLoading(false);
        } catch (error) {
          console.error(error);
          setGlobalLoading(false);
        } finally {
          setGlobalLoading(false);
        }
      };

      if (session?.user?.uid) {
        // console.log("Found UID and Session - Normal Sync running...");
        getUserData();
      } else if (session?.user?.name && session?.user?.email) {
        if (localUserData?.uid) {
          // console.log(
          //   "Found Session and Local User Doc - Google Login running..."
          // );
          let registerBody = {
            ...localUserData,
            name: session?.user?.name,
            email: session?.user?.email,
            password: `google-oauth:${[...Array(16)]
              .map(() => Math.random().toString(36).charAt(2))
              .join("")}`,
          };

          let googleEmailConnect = async () => {
            // console.log("Uploading new google account: ", registerBody);
            let res = await axios.put("/api/put/users", registerBody);

            if (!res?.data?.ok)
              return toast.error("Failed to sync data, please refresh the app");

            setUserData(registerBody);
            setGlobalLoading(false);
            return toast.success("Google account connected successfully!");
          };

          googleEmailConnect();
        } else {
          // console.log(
          //   "Found Session and no Local Doc - Google Signup running..."
          // );
          pushNewGoogleUser();
        }
      }
    }

    if (status === "unauthenticated" && localUserData) {
      setUserData(localUserData);
      // console.log("User's data was set from local data.");

      // setGlobalLoading(false);
    }

    if (!session?.user && status === "unauthenticated" && !localUserData) {
      // console.log("No saved data found.");
      setUserData({});
    }

    return setGlobalLoading(false);
  }, [status, session]);

  useEffect(() => {
    if (!userData?.plans) return;

    const timeout = setTimeout(() => {
      if (status === "authenticated") {
        localStorage.setItem("user", JSON.stringify(userData));
        updateOnlineUserData(userData);
        // console.log("Set userData to local and db");
      }
      if (
        status !== "authenticated" &&
        localStorage.getItem("user") &&
        userData?.settings
      ) {
        localStorage.setItem("user", JSON.stringify(userData));
        updateLastSeen(userData?.uid);
        // console.log("Local data uptated. ", userData);
      }
    }, 500);

    const TEN_DAYS_MS = 864000000;
    const ONE_WEEK_MS = 604800000;

    if (!firstEntryDone) {
      if (!userData?.lastUpdatedAt || !userData?.registeredAt) return;

      if (status === "unauthenticated") {
        let ageOfUser =
          new Date(userData?.lastUpdatedAt) - new Date(userData?.registeredAt);
        let localFlags = JSON.parse(localStorage.getItem("flags")) || {};
        let lastPromptedForLogin = localFlags?.lastPromptedForLogin;

        let today = new Date();

        let promptLogin = () => {
          setLoginPromptModalVisible(true);
          localStorage.setItem(
            "flags",
            JSON.stringify({
              ...localFlags,
              lastPromptedForLogin: new Date(),
            })
          );
        };

        if (ageOfUser >= TEN_DAYS_MS) {
          if (lastPromptedForLogin) {
            if (today - new Date(lastPromptedForLogin) >= ONE_WEEK_MS) {
              promptLogin();
            }
          } else {
            promptLogin();
          }
        }
      }

      setFirstEntryDone(true);
    }

    return () => clearTimeout(timeout);
  }, [userData]);

  // Functions
  const toggleNavSidebarOpen = () => {
    if (navSidebarOpen) {
      navSidebarTL.current.reverse();
    } else {
      navSidebarTL.current.play();
    }
    setNavSidebarOpen((prev) => !prev);
  };

  const enableNotifications = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setNotificationsEnabled(true);
        return redirect("/");
      } else {
        setNotificationEnablingTutorialModalVisible(true);
        return toast(
          "Notification permissions were not given. Please go to the website and give notification permission by clicking the 🔒 icon on the address bar."
        );
      }
    });
  };

  // Values which are shared all accross the app
  const values = {
    colors: {
      primary: "#ff914d",
      secondary: "#fde4be",
      accent: "#ff6302",
      neutral: "#666e76",
      shade: "#f6f6f6",
    },
    updatingUserData,
    setUpdatingUserData,
    globalLoading,
    setGlobalLoading,
    userData,
    setUserData,
    blockAddModalVisible,
    setBlockAddModalVisible,
    tagAddModalVisible,
    setTagAddModalVisible,
    toggleNavSidebarOpen,
    navSidebarTL,
    setNavSidebarOpen,
    logoutModalVisible,
    setLogoutModalVisible,
    chooseDataSetModalVisible,
    setChooseDataSetModalVisible,
    conflictingDataSets,
    setConflictingDataSets,
    enableNotifications,
    notificationsEnabled,
    setNotificationsEnabled,
    notificationEnablingTutorialModalVisible,
    setNotificationEnablingTutorialModalVisible,
    loginPromptModalVisible,
    setLoginPromptModalVisible,
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};
export default SettingsProvider;
