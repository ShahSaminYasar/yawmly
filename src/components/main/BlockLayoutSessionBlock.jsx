import { useSettings } from "@/services/SettingsProvider";
import { minsDuration } from "@/utils/minsDuration";
import { minutesToTime } from "@/utils/minutesToTime";
import { timeToMinutes } from "@/utils/timeToMinutes";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
// import { FiEdit2 } from "react-icons/fi";

const BlockLayoutSessionBlock = ({
  block,
  index,
  tags,
  setBlockEditModalVisible,
  setEditingBlockIndex,
  setEditingBlockData,
  isLastBlock,
  setDefStartTime,
  setDefEndTime,
  setBlockAddModalVisible,
  currentTimeInMinutes,
  setTargetBlockYPos,
}) => {
  const { userData, setUserData, colors } = useSettings();

  // Refs
  const runningBlockRef = useRef(null);

  // States
  const [currentlyRunning, setCurrentlyRunning] = useState(false);

  useEffect(() => {
    let isCurrentlyRunning =
      currentTimeInMinutes >= block?.start &&
      currentTimeInMinutes <= block?.end;

    setCurrentlyRunning(isCurrentlyRunning);

    const updateY = () => {
      if (runningBlockRef?.current) {
        const rect = runningBlockRef?.current.getBoundingClientRect();
        setTargetBlockYPos(rect.top - 30 + window.scrollY);
      }
    };

    if (isCurrentlyRunning) {
      updateY();
      window.addEventListener("resize", updateY);

      return () => {
        window.removeEventListener("resize", updateY);
      };
    }
  }, [block]);

  //   Functions
  const markAsDone = (e) => {
    let updatedBlock = {
      ...block,
      remarks: {
        ...block.remarks,
        checked: e.target?.checked,
      },
    };

    if (
      userData.plans[userData?.selectedPlan].plan.rows?.sort(
        (a, b) => a.start - b.start
      )?.[index]
    ) {
      let updatedUserData = {
        ...userData,
        plans: userData?.plans?.map((plan, planIndex) => {
          if (planIndex === userData?.selectedPlan) {
            return {
              ...plan,
              plan: {
                ...plan.plan,
                rows: plan.plan.rows
                  .sort((a, b) => a.start - b.start)
                  .map((r, i) => (i === index ? updatedBlock : r)),
              },
            };
          }
          return plan;
        }),
        lastUpdatedAt: new Date().toISOString(),
      };

      return setUserData(updatedUserData);
    } else {
      return toast.error(
        "An error occured while updating the data, please refresh the app."
      );
    }
  };

  return (
    <div
      ref={runningBlockRef}
      className={`flex flex-row items-start justify-center relative w-full max-w-2xl ${
        userData?.settings?.preferredTimeFormat === "T" ? "gap-2" : "gap-4"
      }`}
    >
      {/* Start Time */}
      <span
        className={`text-xs font-medium -translate-y-[8px] block w-[35px]`}
        style={{
          color: currentlyRunning ? colors?.accent : "#62748e",
        }}
      >
        {minutesToTime(block?.start)}
      </span>

      {/* End Time */}
      {isLastBlock && (
        <span
          className={`text-xs font-medium text-slate-500 translate-y-[8px] block w-[35px] absolute bottom-0 left-0`}
          style={{
            color: currentlyRunning ? colors?.accent : "#62748e",
          }}
        >
          {minutesToTime(block?.end)}
        </span>
      )}

      <div
        className="w-full"
        onClick={() => {
          if (block?.tag && block?.title?.length > 1) {
            setEditingBlockIndex(index);
            setEditingBlockData({
              title: block?.title,
              start: block?.start,
              end: block?.end,
              tag: block?.tag,
              remarks: {
                checked: block?.remarks?.checked,
                note: block?.remarks?.note,
              },
            });
            setBlockEditModalVisible(true);
          } else {
            setDefStartTime(block?.start);
            setDefEndTime(block?.end);
            return setBlockAddModalVisible(true);
          }
        }}
      >
        {/* Session Card */}
        <div
          className={`w-full p-3 flex flex-row items-center justify-between gap-5 font-normal my-1 group cursor-pointer relative before:content-[''] before:absolute before:-left-[9px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:bg-[#ff6302] before:rounded-sm before:h-[98%] ${
            currentlyRunning ? "before:block" : "before:hidden"
          } ${
            block?.remarks?.note?.length > 0
              ? "rounded-t-lg mb-0"
              : "rounded-lg"
          }`}
          style={{
            backgroundColor: tags?.[block?.tag]?.bg,
            color: tags?.[block?.tag]?.text,
            borderWidth: "2px",
            borderColor: block?.tag?.length > 0 ? "transparent" : "#e3e3e3",
          }}
        >
          {block?.tag && block?.title?.length > 1 ? (
            // There is a session in the timespan
            <>
              {/* Session Info */}
              <div className="flex flex-col items-start gap-0 w-full">
                {/* Tag */}
                <span
                  className="px-3 pb-[0px] text-[10px] font-normal rounded-xl capitalize"
                  style={{
                    backgroundColor: tags?.[block?.tag]?.text,
                    color: tags?.[block?.tag]?.bg,
                  }}
                >
                  {block?.tag}
                </span>

                {/* Session Name/Title */}
                <span className="font-medium text-xl block mt-1">
                  {block?.title}
                </span>

                {/* Session Duration */}
                <span className="text-sm font-normal block">
                  {minsDuration(block?.start, block?.end)}
                </span>
              </div>

              {/* Session Remarks */}
              <div className="w-[80%] flex flex-row justify-end items-center gap-2">
                {/* Mark as Done Checkbox */}
                <input
                  type="checkbox"
                  checked={block?.remarks?.checked}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    markAsDone(e);
                  }}
                  style={{
                    borderWidth: "2px",
                    accentColor:
                      tags[block?.tag]?.text?.toLowerCase() === "#ffffff"
                        ? "#000000"
                        : tags[block?.tag]?.text,
                    width: "14px",
                    height: "14px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </>
          ) : (
            // There is no session in the timespan
            <div className="flex flex-col items-start gap-0">
              <span className="text-sm font-normal block text-slate-500">
                {minsDuration(block?.start, block?.end)}
              </span>
            </div>
          )}
        </div>

        {/* Note */}
        {block?.remarks?.note?.length > 0 && (
          <span
            className="block w-full h-fit max-h-[70px] overflow-auto text-ellipsis rounded-b-lg text-left text-[12px] px-3 py-2 text-slate-700 font-medium shadow-sm opacity-100 bg-slate-100 mb-2"
            // style={{
            //   color: tags[block?.tag]?.bg,
            //   backgroundColor: tags[block?.tag]?.text,
            // }}
          >
            {block?.remarks?.note}
          </span>
        )}
      </div>
    </div>
  );
};
export default BlockLayoutSessionBlock;
