import { useSettings } from "@/services/SettingsProvider";
import { minsDuration } from "@/utils/minsDuration";
import { minutesToTime } from "@/utils/minutesToTime";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
// import { FiEdit2 } from "react-icons/fi";

const SessionBlock = ({
  block,
  index,
  tags,
  setBlockEditModalVisible,
  setEditingBlockIndex,
  setEditingBlockData,
  currentTimeInMinutes,
  setTargetBlockYPos,
}) => {
  const { colors, userData, setUserData } = useSettings();

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
        console.log("Set Y Pos:", rect.top - 30 + window.scrollY);
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
  }, [block, currentTimeInMinutes]);

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
    <tr
      ref={runningBlockRef}
      className="text-[12px] sm:text-[14px] group cursor-pointer"
      style={{
        backgroundColor: tags[block?.tag]?.bg,
        color: tags[block?.tag]?.text,
      }}
      onClick={() => {
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
      }}
    >
      <td
        style={{
          borderWidth: "1px",
          borderColor: colors?.primary,
          padding: "12px 12px",
        }}
        className="font-semibold relative"
      >
        {currentlyRunning && (
          // <span className="absolute block w-[10px] h-[10px] bg-gradient-to-b bg-[#00d439] border-2 border-[#8bff65] rounded-full top-1/2 -translate-y-1/2 left-0"></span>
          <div className="w-fit p-[1px] bg-[#d8ffcb] rounded-full absolute top-1 left-1">
            <div className="livenow">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        {minutesToTime(block?.start)} - {minutesToTime(block?.end)}{" "}
        <p className="text-nowrap">
          ({minsDuration(block?.start, block?.end)})
        </p>
      </td>
      <td
        style={{
          borderWidth: "1px",
          borderColor: colors?.primary,
          padding: "12px 12px",
        }}
        className="overflow-hidden text-ellipsis"
      >
        {block?.title}
      </td>
      <td
        style={{
          borderWidth: "1px",
          borderColor: colors?.primary,
          padding: "12px 12px",
          position: "relative",
        }}
      >
        {/* Edit Button */}
        {/* <button
          onClick={() => {
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
          }}
          className="absolute top-1 right-1 cursor-pointer block opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 group-focus-within:opacity-100 group-focus-visible:opacity-100 aspect-square p-[6px] rounded-full"
          style={{
            backgroundColor: tags[block?.tag]?.text,
          }}
        >
          <FiEdit2
            style={{
              fontSize: "12px",
              color: tags[block?.tag]?.bg,
            }}
          />
        </button> */}
        <input
          type="checkbox"
          checked={block?.remarks?.checked}
          onClick={(e) => e.stopPropagation()}
          onChange={markAsDone}
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
        {block?.remarks?.note?.length > 0 && (
          <span
            className="block w-fit max-w-[90%] h-fit max-h-[70px] overflow-auto text-ellipsis rounded-sm text-center text-[11px] p-1 text-slate-700 font-medium rounded-tr-none shadow-sm mx-auto opacity-100"
            style={{
              color: tags[block?.tag]?.bg,
              backgroundColor: tags[block?.tag]?.text,
            }}
          >
            {block?.remarks?.note}
          </span>
        )}
      </td>
    </tr>
  );
};
export default SessionBlock;
