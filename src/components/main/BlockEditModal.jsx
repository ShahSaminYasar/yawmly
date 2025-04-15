import { useSettings } from "@/services/SettingsProvider";
import { minutesToTime } from "@/utils/minutesToTime";
import { timeToMinutes } from "@/utils/timeToMinutes";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaChevronDown, FaCirclePlus, FaTrash } from "react-icons/fa6";
import TagAddModal from "./TagAddModal";
import { GoClock } from "react-icons/go";

const BlockEditModal = ({
  blockEditModalVisible,
  setBlockEditModalVisible,
  editingBlockIndex,
  editingBlockData,
  setEditingBlockData,
  tags,
}) => {
  const { colors, userData, setUserData } = useSettings();

  // States
  const [tagAddModalVisible, setTagAddModalVisible] = useState(false);
  const [blockDeleteModalVisible, setBlockDeleteModalVisible] = useState(false);

  // Memos
  const inputStyle = useMemo(
    () => ({
      outlineColor: colors.accent,
      borderColor: colors.accent,
    }),
    [colors]
  );

  // Functions
  const editSession = (e) => {
    e.preventDefault();

    let startTime = timeToMinutes(e.target.start_time.value);
    let endTime = timeToMinutes(e.target.end_time.value);

    if (startTime === endTime) {
      return toast("Start and end times are the same!");
    } else if (startTime > endTime) {
      return toast("Start time should be before the end time!");
    }

    let session = {
      title: e.target.title.value,
      start: startTime,
      end: endTime,
      tag: e.target.tag.value,
      remarks: {
        checked: e.target.checked.checked,
        note: e.target.note.value,
      },
    };

    let targetPlanIndex = userData?.selectedPlan;

    let sisterRows = userData?.plans?.[targetPlanIndex]?.plan?.rows
      ?.slice()
      ?.sort((a, b) => a.start - b.start)
      ?.filter((_, id) => id !== editingBlockIndex);

    const isOverlapping = sisterRows?.some((session) => {
      console.log(
        "ns: ",
        startTime,
        "e: ",
        session?.end,
        "ne :",
        endTime,
        "s :",
        session?.start
      );
      return startTime < session?.end && endTime > session?.start;
    });

    if (isOverlapping)
      return toast("The start and end times overlap another session's time...");

    if (targetPlanIndex !== undefined && userData?.plans?.[targetPlanIndex]) {
      let updatedPlan = { ...userData?.plans[targetPlanIndex] };
      updatedPlan.plan.rows.sort((a, b) => a.start - b.start)[
        editingBlockIndex
      ] = session;

      let updatedUserData = {
        ...userData,
        lastUpdatedAt: new Date().toISOString(),
      };
      updatedUserData.plans[targetPlanIndex] = updatedPlan;

      setUserData(updatedUserData);
      setBlockEditModalVisible(false);
      setTagAddModalVisible(false);
    } else {
      return toast.error(
        "Logic error occured, data not synced. Please refresh the app."
      );
    }
  };

  const deleteBlock = () => {
    let startTime = minutesToTime(editingBlockData?.start);
    let endTime = minutesToTime(editingBlockData?.end);

    let updatedUserData = { ...userData };
    updatedUserData = {
      ...updatedUserData,
      plans: updatedUserData?.plans?.map((p, i) =>
        i === userData?.selectedPlan
          ? {
              ...p,
              plan: {
                ...p.plan,
                rows: p?.plan?.rows
                  ?.sort((a, b) => a.start - b.start)
                  ?.filter((_, rid) => rid !== editingBlockIndex),
              },
            }
          : p
      ),
      lastUpdatedAt: new Date().toISOString(),
    };

    setUserData(updatedUserData);
    setEditingBlockData({});
    setBlockDeleteModalVisible(false);
    setBlockEditModalVisible(false);
    setTagAddModalVisible(false);
    return toast.success(
      `Session ${startTime}-${endTime} was deleted successfully`
    );
  };

  return (
    blockEditModalVisible && (
      <div className="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-xs flex items-center justify-center fade p-4">
        {/* Modal Closer Layer */}
        <div
          className="absolute z-[-1] top-0 left-0 w-full h-full bg-transparent"
          onClick={() => {
            setBlockEditModalVisible(false);
            setTagAddModalVisible(false);
          }}
        ></div>

        {/* Block/Session Edit Modal */}
        <div
          className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down ${
            tagAddModalVisible || blockDeleteModalVisible ? "hidden" : "block"
          }`}
        >
          <span
            className="text-2xl font-normal block text-center mb-3"
            style={{
              color: colors?.primary,
            }}
          >
            Edit Session
          </span>

          {/* Edit Session Form */}
          <form onSubmit={editSession} className="w-full flex flex-col gap-3">
            {/* Title Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Session Title
              </span>
              <input
                type="text"
                name="title"
                required
                defaultValue={editingBlockData?.title}
                placeholder='Name of the session e.g. "Study Session 1"'
                className="input w-full"
                style={inputStyle}
              />
            </div>

            {/* Start Time Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Start Time
              </span>
              <div className="w-full relative">
                <input
                  type="time"
                  name="start_time"
                  required
                  defaultValue={minutesToTime(editingBlockData?.start, true)}
                  className="input w-full"
                  style={inputStyle}
                />
                <GoClock className="text-xs text-slate-300 absolute top-1/2 -translate-y-1/2 right-[15px] pointer-events-none" />
              </div>
            </div>

            {/* End Time Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                End Time
              </span>
              <div className="w-full relative">
                <input
                  type="time"
                  name="end_time"
                  required
                  defaultValue={minutesToTime(editingBlockData?.end, true)}
                  className="input w-full"
                  style={inputStyle}
                />
                <GoClock className="text-xs text-slate-300 absolute top-1/2 -translate-y-1/2 right-[15px] pointer-events-none" />
              </div>
            </div>

            {/* Tag Selector */}
            <div className="flex flex-row items-center gap-2">
              {/* Existing Tag Selector */}
              <div className="w-full">
                <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                  Session Tag
                </span>
                <div className="w-full relative">
                  <select
                    name="tag"
                    value={editingBlockData?.tag}
                    onChange={(e) =>
                      setEditingBlockData((prev) => ({
                        ...prev,
                        tag: e.target.value,
                      }))
                    }
                    className="input w-full"
                    style={{
                      ...inputStyle,
                      color: tags[editingBlockData?.tag]?.text,
                      backgroundColor: tags[editingBlockData?.tag]?.bg,
                    }}
                  >
                    {Object.keys(tags)?.map((tag, index) => (
                      <option
                        value={tag}
                        key={`${tag}_${index}`}
                        style={{
                          backgroundColor: tags[tag]?.bg,
                          color: tags[tag]?.text,
                        }}
                      >
                        {tag}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown
                    className="pointer-events-none absolute z-20 top-[50%] right-3 -translate-y-[50%]"
                    style={{
                      color: colors?.primary,
                    }}
                  />
                </div>
              </div>

              {/* New Tag Adder */}
              <button
                type="button"
                onClick={() => setTagAddModalVisible(true)}
                className="w-fit text-sm font-normal text-left text-slate-100 px-2 py-[10px] rounded-sm active:scale-[92%] whitespace-nowrap mt-[22px] cursor-pointer flex flex-row gap-1 items-center"
                style={{
                  backgroundColor: colors?.primary,
                }}
              >
                <FaCirclePlus className="text-sm" /> Add New
              </button>
            </div>

            <div className="flex flex-row items-center gap-1 justify-start">
              <input
                name="checked"
                type="checkbox"
                defaultChecked={editingBlockData?.remarks?.checked}
              />
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Mark as done
              </span>
            </div>

            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Note/Reminder (Optional)
              </span>
              <input
                type="text"
                name="note"
                defaultValue={editingBlockData?.remarks?.note}
                placeholder="Additional note to remember"
                className="input w-full"
                style={inputStyle}
              />
            </div>

            <button
              type="button"
              onClick={() => setBlockDeleteModalVisible(true)}
              className={`text-sm font-medium cursor-pointer active:scale-[92%] flex items-center gap-2 w-full px-3 py-2 rounded-sm bg-red-500 text-white`}
            >
              <FaTrash className="text-sm" /> Delete session block
            </button>

            <div className="flex flex-row gap-2 items-center">
              <button
                type="button"
                onClick={() => {
                  setBlockEditModalVisible(false);
                  setTagAddModalVisible(false);
                }}
                className="w-[50%] text-sm font-normal block text-center px-2 py-[8px] rounded-sm active:scale-[92%] mt-1 cursor-pointer bg-white border-2"
                style={{
                  color: colors?.primary,
                  borderColor: colors?.primary,
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full text-sm font-semibold flex flex-row gap-1 items-center justify-center text-center px-2 py-[8px] rounded-sm active:scale-[92%] mt-1 cursor-pointer text-white border-2"
                style={{
                  backgroundColor: colors?.primary,
                  borderColor: colors?.primary,
                }}
              >
                Update Session <FaCheck className="text-lg" />
              </button>
            </div>
          </form>
        </div>

        {/* New Tag Add Modal */}
        {tagAddModalVisible && (
          <TagAddModal
            setTagAddModalVisible={setTagAddModalVisible}
            setNewSessionTag={setNewSessionTag}
          />
        )}

        {/* Block Delete Modal */}
        {blockDeleteModalVisible && (
          <div
            className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down`}
          >
            <span
              className="text-2xl font-normal block text-center mb-3"
              style={{
                color: colors?.primary,
              }}
            >
              Delete Session
            </span>

            <p className="block text-center text-xl font-bold mb-2">
              Are you sure you want to delete the session?
            </p>

            <span className="block text-center text-lg font-normal mb-0">
              Start: {minutesToTime(editingBlockData?.start)}
            </span>
            <span className="block text-center text-lg font-normal mb-2">
              End: {minutesToTime(editingBlockData?.end)}
            </span>

            <p className="block text-center text-lg italic font-medium mb-3">
              This action cannot be undone!
            </p>

            <div className="flex flex-row gap-2 items-center">
              <button
                type="button"
                onClick={() => setBlockDeleteModalVisible(false)}
                className="w-[50%] text-sm font-normal block text-center px-2 py-[8px] rounded-sm active:scale-[92%] mt-1 cursor-pointer bg-white border-2"
                style={{
                  color: colors?.primary,
                  borderColor: colors?.primary,
                }}
              >
                Cancel
              </button>
              <button
                onClick={deleteBlock}
                className="w-full text-sm font-semibold flex flex-row gap-1 items-center justify-center text-center px-2 py-[8px] rounded-sm active:scale-[92%] mt-1 cursor-pointer text-white border-2"
                style={{
                  backgroundColor: colors?.primary,
                  borderColor: colors?.primary,
                }}
              >
                Yes, delete it
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};
export default BlockEditModal;
