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

  // Refs
  const navSidebarTL = useRef(gsap.timeline({ paused: true }));

  // Functions
  const updateOnlineUserData = async (data) => {
    let res = await axios.put("/api/put/users", data);
    console.log("PUT of online data (log): ", res);
  };

  // Effects
  useEffect(() => {
    if (status === "loading") return;

    // Load the local version
    let localUserData = JSON.parse(localStorage.getItem("user"));

    if (status === "authenticated") {
      console.log("Session found: ", session);

      // If user doc (with uid) is present in the DB
      const getUserData = async () => {
        // Get the online version
        let onlineUserData = await axios.get(
          `/api/get/users?uid=${session?.user?.uid}`
        );
        onlineUserData = onlineUserData?.data?.data?.[0];

        // Compare local and online versions
        if (
          localUserData &&
          localUserData?.lastUpdatedAt > onlineUserData?.lastUpdatedAt
        ) {
          // If local version is the latest one, then set userData to local version
          if (!localUserData || localUserData?.length === 0) return;
          setUserData(localUserData);
          console.log("User's data was set from LS: ", localUserData);

          // Replace the online version with the local one
          console.log("Uploading user data: ", localUserData);
          updateOnlineUserData(localUserData);
        } else {
          // If online version is the latest one, then set userData to the online version
          if (!onlineUserData || onlineUserData?.length === 0) {
            if (localUserData) return setUserData(localUserData);
            console.log("User's data in DB was found to be null/undefined");
            return;
          }
          setUserData(onlineUserData);
          console.log("User's data was set from DB: ", onlineUserData);
        }
        return setGlobalLoading(false);
      };

      // If no user doc is present (sign up through google)
      const pushNewGoogleUser = async () => {
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
              rest: {
                bg: "#f6f6f6",
                text: "#ff914d",
              },
              namaz: {
                bg: "#e67e22",
                text: "#ffffff",
              },
              snack: {
                bg: "#2ecc71",
                text: "#000000",
              },
              nap: {
                bg: "#2980b9",
                text: "#ffffff",
              },
              sleep: {
                bg: "#f1c40f",
                text: "#000000",
              },
              breakfast: {
                bg: "#d35400",
                text: "#ffffff",
              },
              lunch: {
                bg: "#3498db",
                text: "#ffffff",
              },
              dinner: {
                bg: "#e74c3c",
                text: "#ffffff",
              },
              washroom: {
                bg: "#1abc9c",
                text: "#000000",
              },
              bath: {
                bg: "#9b59b6",
                text: "#ffffff",
              },
            },
            preferredTimeFormat: "t",
          },
          registeredOn: new Date(),
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

        let newUserPushRes = await axios.post("/api/auth/new-user", newUserDoc);

        if (!newUserPushRes?.data?.ok)
          return toast.error("Failed to save user data");

        newUserDoc.uid = newUserPushRes?.data?.uid;
        setUserData(newUserDoc);
        return setGlobalLoading(false);
      };

      if (session?.user?.uid) {
        console.log("Found UID and Session - Normal Sync running...");
        getUserData();
      } else if (session?.user?.name && session?.user?.email) {
        if (localUserData?.uid) {
          console.log(
            "Found Session and Local User Doc - Google Login running..."
          );
          let registerBody = {
            ...localUserData,
            name: session?.user?.name,
            email: session?.user?.email,
            password: `google-oauth:${[...Array(16)]
              .map(() => Math.random().toString(36).charAt(2))
              .join("")}`,
          };

          let googleEmailConnect = async () => {
            console.log("Uploading new google account: ", registerBody);
            let res = await axios.put("/api/put/users", registerBody);

            if (!res?.data?.ok)
              return toast.error("Failed to sync data, please refresh the app");

            setUserData(registerBody);
            setGlobalLoading(false);
            return toast.success("Google account connected successfully!");
          };

          googleEmailConnect();
        } else {
          console.log(
            "Found Session and no Local Doc - Google Signup running..."
          );
          pushNewGoogleUser();
        }
      }
    }

    if (status === "unauthenticated" && localUserData) {
      setUserData(localUserData);
      console.log("User's data was set from local data.");
      setGlobalLoading(false);
    }

    if (!session?.user && status === "unauthenticated" && !localUserData) {
      console.log("No saved data found.");
      setUserData({});
      return setGlobalLoading(false);
    }
  }, [status, session]);

  useEffect(() => {
    if (!userData) return;

    const timeout = setTimeout(() => {
      if (status === "authenticated") {
        localStorage.setItem("user", JSON.stringify(userData));
        updateOnlineUserData(userData);
        console.log("Set userData to local and db");
      }
      if (
        status !== "authenticated" &&
        localStorage.getItem("user") &&
        userData?.settings
      ) {
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("Local data uptated. ", userData);
      }
    }, 800);

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
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};
export default SettingsProvider;
