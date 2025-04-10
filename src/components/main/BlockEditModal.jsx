import { useSettings } from "@/services/SettingsProvider";
import { minutesToTime } from "@/utils/minutesToTime";
import { timeToMinutes } from "@/utils/timeToMinutes";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaChevronDown,
  FaChevronLeft,
  FaCirclePlus,
} from "react-icons/fa6";

const BlockEditModal = ({
  blockEditModalVisible,
  setBlockEditModalVisible,
  editingBlockIndex,
  editingBlockData,
  setEditingBlockData,
  tags,
}) => {
  const { colors, userData, setUserData } = useSettings();

  const [tagAddModalVisible, setTagAddModalVisible] = useState(false);

  // Functions
  const addNewTag = (e) => {
    e.preventDefault();

    let tagTitle = e.target?.new_tag_name?.value?.toLowerCase();
    let tagBGColor = e.target?.new_tag_bg_color?.value;
    let tagTextColor = e.target?.new_tag_text_color?.value;

    let updatedUserData = {
      ...userData,
      settings: {
        ...userData?.settings,
        tags: {
          ...userData?.settings?.tags,
          [tagTitle]: {
            bg: tagBGColor,
            text: tagTextColor,
          },
        },
      },
    };

    setUserData(updatedUserData);
    setTagAddModalVisible(false);
    setEditingBlockData({
      ...editingBlockData,
      tag: tagTitle,
    });
  };

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

      let updatedUserData = { ...userData };
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

  return (
    blockEditModalVisible && (
      <div className="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,82,35,0.12)] backdrop-blur-xs flex items-center justify-center fade p-4">
        {/* Modal Closer Layer */}
        <div
          className="absolute z-[-1] top-0 left-0 w-full h-full bg-transparent"
          onClick={() => {
            setBlockEditModalVisible(false);
            setTagAddModalVisible(false);
          }}
        ></div>

        {/* Main Modal - Session Block Edit */}
        <div
          className={`z-20 w-full max-w-[370px] rounded-lg bg-white p-5 shadow-lg fade-down ${
            tagAddModalVisible ? "hidden" : "block"
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
                value={editingBlockData?.title}
                onChange={(e) =>
                  setEditingBlockData((prev) => ({
                    ...prev,
                    title: e.target?.value,
                  }))
                }
                placeholder="Title of the session/break"
                className="input w-full"
                style={{
                  outlineColor: colors.accent,
                  borderColor: colors.accent,
                }}
              />
            </div>

            {/* Start Time Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Start Time
              </span>
              <input
                type="time"
                name="start_time"
                required
                value={minutesToTime(editingBlockData?.start, true)}
                onChange={(e) =>
                  setEditingBlockData((prev) => ({
                    ...prev,
                    start: timeToMinutes(e.target?.value),
                  }))
                }
                className="input w-full"
                style={{
                  outlineColor: colors.accent,
                  borderColor: colors.accent,
                }}
              />
            </div>

            {/* End Time Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                End Time
              </span>
              <input
                type="time"
                name="end_time"
                required
                value={minutesToTime(editingBlockData?.end, true)}
                onChange={(e) =>
                  setEditingBlockData((prev) => ({
                    ...prev,
                    end: timeToMinutes(e.target?.value),
                  }))
                }
                className="input w-full"
                style={{
                  outlineColor: colors.accent,
                  borderColor: colors.accent,
                }}
              />
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
                      outlineColor: colors.accent,
                      borderColor: colors.accent,
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
                className="w-fit text-sm font-normal text-left text-slate-100 px-2 py-[10px] rounded-sm active:scale-[97%] whitespace-nowrap mt-[22px] cursor-pointer flex flex-row gap-1 items-center"
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
                checked={editingBlockData?.remarks?.checked}
                onChange={(e) => {
                  setEditingBlockData({
                    ...editingBlockData,
                    remarks: {
                      ...editingBlockData?.remarks,
                      checked: !editingBlockData?.remarks?.checked,
                    },
                  });
                }}
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
                value={editingBlockData?.remarks?.note}
                onChange={(e) =>
                  setEditingBlockData({
                    ...editingBlockData,
                    remarks: {
                      ...editingBlockData?.remarks,
                      note: e.target?.value,
                    },
                  })
                }
                placeholder="Additional note to remember"
                className="input w-full"
                style={{
                  outlineColor: colors.accent,
                  borderColor: colors.accent,
                }}
              />
            </div>

            <div className="flex flex-row gap-2 items-center">
              <button
                type="button"
                onClick={() => {
                  setBlockEditModalVisible(false);
                  setTagAddModalVisible(false);
                }}
                className="w-[50%] text-sm font-normal block text-center px-2 py-[8px] rounded-sm active:scale-[97%] mt-1 cursor-pointer bg-white border-2"
                style={{
                  color: colors?.primary,
                  borderColor: colors?.primary,
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full text-sm font-semibold flex flex-row gap-1 items-center justify-center text-center px-2 py-[8px] rounded-sm active:scale-[97%] mt-1 cursor-pointer text-white border-2"
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
          <div className="z-20 w-full max-w-[370px] rounded-lg bg-white p-5 shadow-lg fade-down relative">
            {/* Go Back Button */}
            <button
              type="button"
              onClick={() => setTagAddModalVisible(false)}
              className="rounded-sm bg-white border-2 p-1 absolute top-3 left-3 cursor-pointer"
              style={{
                color: colors?.primary,
                borderColor: colors.secondary,
              }}
            >
              <FaChevronLeft className="text-sm" />
            </button>

            <span
              className="text-2xl font-normal block text-center mb-3"
              style={{
                color: colors?.primary,
              }}
            >
              New Session Tag
            </span>

            <form onSubmit={addNewTag} className="w-full">
              {/* Tag Name Input */}
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Name of the tag
              </span>
              <input
                type="text"
                placeholder="Tag Name"
                name="new_tag_name"
                className="input w-full"
                style={{
                  outlineColor: colors.accent,
                  borderColor: colors.accent,
                }}
              />

              {/* Tag Colors Input */}
              <span className="text-sm font-normal block text-left text-slate-600 mb-0 mt-3">
                Tag colors
              </span>
              <div className="flex flex-row gap-3 items-start">
                <div className="flex flex-col items-center gap-0 text-sm text-slate-600 font-normal">
                  {/* BG Color Input */}
                  <input
                    type="color"
                    name="new_tag_bg_color"
                    defaultValue={"#ff914d"}
                    style={{
                      borderColor: colors?.shade,
                    }}
                  />
                  <span>BG</span>
                </div>
                <div className="flex flex-col items-center gap-0 text-sm text-slate-600 font-normal">
                  {/* FG Color Input */}
                  <input
                    type="color"
                    name="new_tag_text_color"
                    defaultValue={"#fcfcfc"}
                    style={{
                      borderColor: colors?.shade,
                    }}
                  />
                  <span>FG</span>
                </div>
              </div>

              {/* Tag Publish Button */}
              <button
                type="submit"
                className="w-full text-sm font-semibold block text-center text-slate-100 px-2 py-[8px] rounded-sm active:scale-[97%] mt-3 cursor-pointer"
                style={{
                  backgroundColor: colors?.primary,
                }}
              >
                Add New Tag
              </button>
            </form>
          </div>
        )}
      </div>
    )
  );
};
export default BlockEditModal;
