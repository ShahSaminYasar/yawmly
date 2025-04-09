"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

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

  // Effects
  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated") {
      const getUserData = async () => {
        let res = await axios.get(`/api/get/user?uid=${session?.user?.uid}`);
        setUserData(res?.data?.[0]);
        console.log("User's data was set from DB.");
        return setGlobalLoading(false);
      };
      getUserData();
    }

    let localData = localStorage.getItem("user");

    if (status === "unauthenticated" && localData) {
      localData = JSON.parse(localData);
      setUserData(localData);
      console.log("User's data was set from local data.");
      setGlobalLoading(false);
    }

    if (!session?.user && status === "unauthenticated" && !localData) {
      console.log("No saved data found.");
      return setGlobalLoading(false);
    }
  }, [status, session]);

  useEffect(() => {
    if (localStorage.getItem("user") && userData?.settings) {
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Local data uptated. ", userData);
    }
  }, [userData]);

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
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};
export default SettingsProvider;
