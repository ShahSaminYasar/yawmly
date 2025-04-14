"use client";
import { useSettings } from "@/services/SettingsProvider";
import { useSession } from "next-auth/react";

const ChooseDataSetModal = () => {
  const {
    chooseDataSetModalVisible,
    setChooseDataSetModalVisible,
    conflictingDataSets,
    setConflictingDataSets,
    setUserData,
    colors,
    setGlobalLoading,
  } = useSettings();

  //   Functions
  const confirmDataSet = (version) => {
    if (version === "local") {
      let { uid, ...localData } = conflictingDataSets?.local;

      setUserData({
        ...localData,
        uid: conflictingDataSets?.online?.uid,
        email: conflictingDataSets?.online?.email,
        password: conflictingDataSets?.online?.password,
      });
    } else if (version === "online") {
      setUserData({
        ...conflictingDataSets?.online,
      });
    }

    setConflictingDataSets({});

    return setChooseDataSetModalVisible(false);
  };

  return (
    chooseDataSetModalVisible && (
      <div className="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-xs flex items-center justify-center fade p-4">
        {/* Block/Session Add Modal */}
        <div
          className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg`}
        >
          <span
            className="text-xl font-normal block text-center mb-3"
            style={{
              color: colors?.primary,
            }}
          >
            Choose Data Set
          </span>

          <div className="flex flex-col gap-2 items-center text-xs font-medium">
            <p>
              We found existing data on your account. You also have data saved
              locally on this device. To continue, please choose which version
              of data you want to keep.
            </p>
            <p className="text-red-500">
              Note: The dataset that you don't choose will be permanently
              deleted.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-row gap-2 items-center font-semibold mt-2">
            <button
              type="button"
              onClick={() => {
                confirmDataSet("local");
              }}
              className="w-full text-xs font-normal block text-center px-2 py-[8px] rounded-sm active:scale-[92%] mt-1 cursor-pointer bg-indigo-700 border-indigo-700 text-white border-2"
            >
              Keep Local Data
            </button>
            <button
              type="button"
              onClick={() => {
                confirmDataSet("online");
              }}
              className="w-full text-xs font-normal block text-center px-2 py-[8px] rounded-sm active:scale-[92%] mt-1 cursor-pointer bg-green-500 border-green-500 text-white border-2"
            >
              Keep Online Data
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default ChooseDataSetModal;
