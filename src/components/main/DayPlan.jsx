import { outfit } from "@/lib/fonts";
import { useSettings } from "@/services/SettingsProvider";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa6";
import BlockAddModal from "./BlockAddModal";
import SessionBlock from "./SessionBlock";
import BlockEditModal from "./BlockEditModal";
import moment from "moment";
import BlockLayoutSessionBlock from "./BlockLayoutSessionBlock";
import { timeToMinutes } from "@/utils/timeToMinutes";
import { LuLocate } from "react-icons/lu";
import { GrPowerReset } from "react-icons/gr";
import PlanResetModal from "./PlanResetModal";
import toast from "react-hot-toast";

const DayPlan = ({
  plan,
  planId,
  blocksArray,
  setBlocksArray,
  targetBlockYPos,
  setTargetBlockYPos,
  planLoading,
  setPlanLoading,
}) => {
  const { colors, userData, setUserData, setBlockAddModalVisible } =
    useSettings();

  //   States
  const [tags, setTags] = useState({});
  const [blockEditModalVisible, setBlockEditModalVisible] = useState(false);
  const [editingBlockIndex, setEditingBlockIndex] = useState(0);
  const [editingBlockData, setEditingBlockData] = useState({
    title: "",
    start: 0,
    end: 0,
    tag: "",
    remarks: {
      checked: false,
      note: "",
    },
  });

  const [defStartTime, setDefStartTime] = useState(null);
  const [defEndTime, setDefEndTime] = useState(null);
  const [currentTimeInMinutes, setCurrentTimeInMinutes] = useState(0);

  const [planResetModalVisible, setPlanResetModalVisible] = useState(false);

  //   Effetcs
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.pageYOffset);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    setTags(userData?.settings?.tags || {});

    let now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    setCurrentTimeInMinutes(timeToMinutes(now));
  }, [userData]);

  useEffect(() => {
    if (userData?.settings?.preferredPlanLayout === "blocks") {
      produceBlockData();
    } else {
      setPlanLoading(false);
    }
  }, [plan]);

  // Functions
  const produceBlockData = () => {
    setTargetBlockYPos(0);

    let rows = plan?.plan?.rows?.slice()?.sort((a, b) => a.start - b.start);

    let arrayOfBlocks = [];

    for (let i = 0; i < rows?.length; i++) {
      let block = { ...rows[i], og_index: i };
      arrayOfBlocks.push(block);
      if (rows[i + 1] && rows[i + 1] !== undefined) {
        if (block.end - rows[i + 1]?.start !== 0) {
          arrayOfBlocks.push({
            start: block?.end,
            end: rows[i + 1]?.start,
          });
        }
      }
    }
    setBlocksArray(arrayOfBlocks);
    setPlanLoading(false);
  };

  const resetPlan = (e) => {
    e.preventDefault();

    let removeChecks = e.target?.remove_checks?.checked;
    let removeNotes = e.target?.remove_notes?.checked;

    if (!removeChecks && !removeNotes)
      return toast("Mark at least one condition to reset the plan");

    let currentPlanIndex = userData?.selectedPlan;

    let updatedUserData = { ...userData };

    let targetPlanRows = updatedUserData?.plans?.[currentPlanIndex]?.plan?.rows;

    if (removeChecks && removeNotes) {
      targetPlanRows = targetPlanRows?.map((session) => ({
        ...session,
        remarks: {
          checked: false,
          note: "",
        },
      }));
    } else if (removeChecks) {
      targetPlanRows = targetPlanRows?.map((session) => ({
        ...session,
        remarks: {
          ...session?.remarks,
          checked: false,
        },
      }));
    } else if (removeNotes) {
      targetPlanRows = targetPlanRows?.map((session) => ({
        ...session,
        remarks: {
          ...session?.remarks,
          note: "",
        },
      }));
    }

    setUserData((prev) => ({
      ...prev,
      plans: prev?.plans?.map((p, i) =>
        i === currentPlanIndex
          ? {
              ...p,
              plan: {
                ...p?.plan,
                rows: targetPlanRows,
              },
            }
          : p
      ),
      lastUpdatedAt: new Date().toISOString(),
    }));

    setPlanResetModalVisible(false);

    return toast.success("Plan reset done. All the best for the new day!");
  };

  return (
    <section className="w-full max-w-3xl mx-auto fade">
      <div className="flex flex-col items-center gap-0 mb-3">
        <span
          className="text-xs font-medium block text-center w-fit rounded-sm px-[8px] py-[3px] bg-white -mt-8 mb-2 ml-auto"
          style={{
            color: colors?.primary,
          }}
        >
          {moment().format("DD MMMM, YYYY")}
        </span>

        {/* Plan name and controls */}
        <div className="w-full flex gap-2 items-center justify-center mb-3">
          {/* Plan Reset Button */}
          <button
            className="cursor-pointer"
            onClick={() => setPlanResetModalVisible(true)}
          >
            <GrPowerReset
              className="text-lg"
              style={{
                color: colors?.accent,
              }}
            />
          </button>

          <div
            className="w-full px-3 py-1 rounded-xl border-2 flex justify-between items-center flex-nowrap gap-2"
            style={{
              color: colors?.primary,
              borderColor: colors?.primary,
            }}
          >
            {/* Previous Plan Button */}
            <button
              onClick={() => {
                setTargetBlockYPos(0);
                setPlanLoading(true);
                setUserData((prev) => ({
                  ...prev,
                  selectedPlan: prev?.selectedPlan - 1,
                  lastUpdatedAt: new Date().toISOString(),
                }));
              }}
              disabled={userData?.selectedPlan === 0}
              className="disabled:opacity-30 cursor-pointer disabled:cursor-default"
            >
              <FaChevronLeft className="text-sm" />
            </button>

            {/* Current Plan Name */}
            <h3
              className={`${outfit?.className} block text-center text-lg font-semibold capitalize`}
              style={{
                color: colors?.accent,
              }}
            >
              {plan?.title}
              {/* {planLoading && (
                <span className="py-8 ml-2 loading-spinner loading-lg text-slate-600"></span>
              )} */}
            </h3>

            {/* Next Plan Button */}
            <button
              onClick={() => {
                setTargetBlockYPos(0);
                setPlanLoading(true);
                setUserData((prev) => ({
                  ...prev,
                  selectedPlan: prev?.selectedPlan + 1,
                  lastUpdatedAt: new Date().toISOString(),
                }));
              }}
              disabled={userData?.selectedPlan === userData?.plans?.length - 1}
              className="disabled:opacity-30 cursor-pointer disabled:cursor-default"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* planLoading ? (
        <span className="py-8 block mx-auto loading-spinner loading-lg text-slate-600"></span>
      ) : ____________ */}

      {userData?.settings?.preferredPlanLayout === "blocks" ? (
        // Shows the session blocks in Blocks layout
        <div className="w-full max-w-2xl mx-auto mb-5">
          {/* Plan Blocks */}
          {blocksArray?.map((block, index) => (
            <BlockLayoutSessionBlock
              key={`session_block_${index}`}
              block={block}
              index={block?.og_index}
              tags={tags}
              setBlockEditModalVisible={setBlockEditModalVisible}
              setEditingBlockIndex={setEditingBlockIndex}
              setEditingBlockData={setEditingBlockData}
              isLastBlock={index === blocksArray?.length - 1}
              setDefStartTime={setDefStartTime}
              setDefEndTime={setDefEndTime}
              setBlockAddModalVisible={setBlockAddModalVisible}
              currentTimeInMinutes={currentTimeInMinutes}
              setTargetBlockYPos={setTargetBlockYPos}
            />
          ))}
        </div>
      ) : (
        // Shows the session blocks in Table layout
        <table
          style={{
            borderColor: colors?.accent,
            outlineColor: "rgba(255, 145, 77, 0.34)",
          }}
          className="plan_table rounded-lg overflow-hidden outline-2 w-full border-[1px] border-collapse text-[14px] sm:text-[15px] text-center lg:table-fixed"
        >
          {/* Plan Table */}
          <thead
            style={{
              backgroundColor: colors?.primary,
              color: "#fff",
              width: "100%",
            }}
          >
            <tr>
              {plan?.plan?.header?.map((heading, i) => (
                <th
                  key={heading}
                  style={{
                    borderWidth: "1px",
                    borderColor: colors?.primary,
                    padding: "8px",
                  }}
                  className={`${
                    i === 0
                      ? "min-w-[170px] sm:min-w-[210px]"
                      : i === 1
                      ? "w-full"
                      : "min-w-[170px] sm:min-w-[210px]"
                  } md:w-1/3`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {plan?.plan?.rows
              ?.slice()
              ?.sort((a, b) => a.start - b.start)
              ?.map((block, index) => (
                <SessionBlock
                  key={`session_block_${index}`}
                  block={block}
                  index={index}
                  tags={tags}
                  setBlockEditModalVisible={setBlockEditModalVisible}
                  setEditingBlockIndex={setEditingBlockIndex}
                  setEditingBlockData={setEditingBlockData}
                  currentTimeInMinutes={currentTimeInMinutes}
                  setTargetBlockYPos={setTargetBlockYPos}
                />
              ))}
          </tbody>
        </table>
      )}

      {/* Button to add a new block/row */}
      {plan?.plan?.rows?.length > 0 ? (
        <div className="flex flex-row flex-nowrap justify-between gap-1 items-center mt-3 mb-2 group w-full max-w-2xl mx-auto">
          <span
            className="block w-full h-[2px] rounded-sm opacity-20 group-hover:opacity-40"
            style={{
              backgroundColor: colors?.primary,
            }}
          ></span>
          <button
            onClick={() => {
              setDefStartTime(null);
              setDefEndTime(null);
              return setBlockAddModalVisible(true);
            }}
            className="w-fit aspect-square block rounded-full border-[1px] p-[4px] cursor-pointer my-3"
            style={{
              borderColor: colors?.primary,
            }}
          >
            <FaPlus
              className="text-[10px]"
              style={{
                color: colors?.primary,
              }}
            />
          </button>
          <span
            className="block w-full h-[2px] rounded-sm opacity-20 group-hover:opacity-40"
            style={{
              backgroundColor: colors?.primary,
            }}
          ></span>
        </div>
      ) : (
        <button
          onClick={() => {
            setDefStartTime(null);
            setDefEndTime(null);
            return setBlockAddModalVisible(true);
          }}
          className="flex items-center gap-2 text-white rounded-lg cursor-pointer px-3 py-2 text-xs font-normal shadow active:scale-95 w-fit mx-auto my-4"
          style={{
            backgroundColor: colors?.primary,
          }}
        >
          <FaPlus /> Add Session
        </button>
      )}

      {/* Button to scroll to running block */}
      {targetBlockYPos ? (
        <button
          onClick={() => {
            window.scrollTo({
              top: targetBlockYPos,
              behavior: "smooth",
            });
          }}
          className="fixed bottom-5 right-4 w-fit aspect-square rounded-full p-2 z-30 shadow-lg fade text-slate-800 cursor-pointer"
          style={{
            backgroundColor: colors?.shade,
          }}
        >
          <LuLocate className="text-xl" />
        </button>
      ) : null}

      <BlockAddModal defStartTime={defStartTime} defEndTime={defEndTime} />
      <BlockEditModal
        blockEditModalVisible={blockEditModalVisible}
        setBlockEditModalVisible={setBlockEditModalVisible}
        editingBlockData={editingBlockData}
        setEditingBlockData={setEditingBlockData}
        editingBlockIndex={editingBlockIndex}
        tags={tags}
      />
      <PlanResetModal
        setPlanResetModalVisible={setPlanResetModalVisible}
        planResetModalVisible={planResetModalVisible}
        resetPlan={resetPlan}
      />
    </section>
  );
};
export default DayPlan;
