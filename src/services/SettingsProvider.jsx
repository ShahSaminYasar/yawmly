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
          setUserData(localUserData);
          console.log("User's data was set from LS: ", localUserData);

          // Replace the online version with the local one
          console.log("Uploading user data: ", localUserData);
          updateOnlineUserData(localUserData);
        } else {
          // If online version is the latest one, then set userData to the online version
          setUserData(onlineUserData);
          console.log("User's data was set from DB: ", onlineUserData);
        }
        return setGlobalLoading(false);
      };
      getUserData();
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
    if (status === "authenticated") {
      localStorage.setItem("user", JSON.stringify(userData));
      updateOnlineUserData(userData);
      console.log("Local data synced with DB");
    }
    if (
      status !== "authenticated" &&
      localStorage.getItem("user") &&
      userData?.settings
    ) {
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Local data uptated. ", userData);
    }
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
