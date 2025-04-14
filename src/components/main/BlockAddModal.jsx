import { useSettings } from "@/services/SettingsProvider";
import { timeToMinutes } from "@/utils/timeToMinutes";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaChevronDown,
  FaChevronLeft,
  FaCirclePlus,
} from "react-icons/fa6";
import TagAddModal from "./TagAddModal";
import { minutesToTime } from "@/utils/minutesToTime";

const BlockAddModal = () => {
  const {
    blockAddModalVisible,
    setBlockAddModalVisible,
    tagAddModalVisible,
    setTagAddModalVisible,
    colors,
    userData,
    setUserData,
  } = useSettings();

  // States
  const [tags, setTags] = useState({});
  const [newSessionTag, setNewSessionTag] = useState("");
  const [defaultStartTime, setDefaultStartTime] = useState("");

  // Effetcs
  useEffect(() => {
    setTags(userData?.settings?.tags || {});

    let planIndex = userData?.selectedPlan;
    let planRows = userData?.plans?.[planIndex]?.plan?.rows;

    planRows = planRows?.sort((a, b) => b.start - a.start);

    if (!planRows || planRows?.length === 0) {
      // console.log("Setting st to default wut");
      return setDefaultStartTime(userData?.settings?.wakeUpTime || "");
    } else {
      // console.log("setting st to prev et");
      return setDefaultStartTime(minutesToTime(planRows?.[0]?.end, true) || "");
    }
  }, [userData]);

  useEffect(() => {
    if (Object.keys(tags || {}).length > 0 && newSessionTag?.length === 0) {
      setNewSessionTag(Object.keys(tags)[0]);
    }
  }, [tags]);

  // Memos
  const inputStyle = useMemo(
    () => ({
      outlineColor: colors.accent,
      borderColor: colors.accent,
    }),
    [colors]
  );

  //   Functions
  const addNewSession = (e) => {
    e.preventDefault();

    let startTime = timeToMinutes(e.target?.start_time?.value);
    let endTime = timeToMinutes(e.target?.end_time?.value);

    if (startTime === endTime) {
      return toast("Start and end times are the same!");
    } else if (startTime > endTime) {
      return toast("Start time should be before the end time!");
    }

    let session = {
      title: e.target?.title?.value,
      start: startTime,
      end: endTime,
      tag: newSessionTag,
      remarks: {
        checked: false,
        note: e.target?.note?.value || "",
      },
    };

    let targetPlanIndex = userData?.selectedPlan;

    const isOverlapping = userData?.plans?.[targetPlanIndex]?.plan?.rows?.some(
      (session) => {
        return startTime < session?.end && endTime > session?.start;
      }
    );

    if (isOverlapping)
      return toast("The start and end times overlap another session's time...");

    if (targetPlanIndex !== undefined && userData?.plans?.[targetPlanIndex]) {
      let updatedPlan = { ...userData?.plans[targetPlanIndex] };
      updatedPlan.plan.rows.push(session);

      let updatedUserData = {
        ...userData,
        lastUpdatedAt: new Date().toISOString(),
      };
      updatedUserData.plans[targetPlanIndex] = updatedPlan;

      setUserData(updatedUserData);
      setBlockAddModalVisible(false);
      setTagAddModalVisible(false);
    }
  };

  if (blockAddModalVisible)
    return (
      <div className="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-xs flex items-center justify-center fade p-4">
        {/* Modal Closer Layer */}
        <div
          className="absolute z-[-1] top-0 left-0 w-full h-full bg-transparent"
          onClick={() => {
            setBlockAddModalVisible(false);
            setTagAddModalVisible(false);
          }}
        ></div>

        {/* Block/Session Add Modal */}
        <div
          className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down ${
            tagAddModalVisible ? "hidden" : "block"
          }`}
        >
          <span
            className="text-2xl font-normal block text-center mb-3"
            style={{
              color: colors?.primary,
            }}
          >
            New Session
          </span>

          {/* Add Session Form */}
          <form onSubmit={addNewSession} className="w-full flex flex-col gap-3">
            {/* Title Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Session Title
              </span>
              <input
                type="text"
                name="title"
                required
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
              <input
                type="time"
                name="start_time"
                required
                className="input w-full"
                style={inputStyle}
                defaultValue={defaultStartTime}
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
                className="input w-full"
                style={inputStyle}
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
                    className="input w-full"
                    value={newSessionTag}
                    onChange={(e) => setNewSessionTag(e.target.value)}
                    style={{
                      ...inputStyle,
                      color: tags[newSessionTag]?.text,
                      backgroundColor: tags[newSessionTag]?.bg,
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

            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Note/Reminder (Optional)
              </span>
              <input
                type="text"
                name="note"
                placeholder="Additional note to remember"
                className="input w-full"
                style={inputStyle}
              />
            </div>

            {/* Action buttons */}
            <div className="flex flex-row gap-2 items-center">
              <button
                type="button"
                onClick={() => {
                  setBlockAddModalVisible(false);
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
                Add Session <FaCheck className="text-lg" />
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
      </div>
    );
};
export default BlockAddModal;
