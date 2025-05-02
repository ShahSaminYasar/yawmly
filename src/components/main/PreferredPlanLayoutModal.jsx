import { useSettings } from "@/services/SettingsProvider";
import Image from "next/image";
import { useEffect, useState } from "react";

const PreferredPlanLayoutModal = ({
  setBlocksArray,
  setTargetBlockYPos,
  setPlanLoading,
}) => {
  const { colors, userData, setUserData } = useSettings();

  // States
  const [visible, setVisible] = useState(false);

  // Effects
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1200);
  }, []);

  // Functions
  const produceBlockData = () => {
    setTargetBlockYPos(0);

    let rows = userData?.plans?.[userData?.selectedPlan]?.plan?.rows
      ?.slice()
      ?.sort((a, b) => a.start - b.start);

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

  const setLayout = (layout) => {
    setUserData((prev) => ({
      ...prev,
      settings: {
        ...prev?.settings,
        preferredPlanLayout: layout,
      },
      lastUpdatedAt: new Date().toISOString(),
    }));

    return produceBlockData();
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-xs items-center justify-center fade p-4 fade`}
      style={{
        display: visible ? "flex" : "none",
      }}
    >
      {/* Preferred Plan Layout Modal */}
      <div
        className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down`}
      >
        <span
          className="text-2xl font-normal block text-center mb-3"
          style={{
            color: colors?.primary,
          }}
        >
          Choose a Layout
        </span>

        <p className="block text-xs font-normal text-slate-800 text-center mb-4">
          Choose how you want to see your sessions. You can change this anytime
          from the{" "}
          <span
            className="font-medium"
            style={{
              color: colors?.primary,
            }}
          >
            Settings
          </span>{" "}
          page.
        </p>

        <button
          onClick={() => setLayout("blocks")}
          className="w-full rounded-xl my-3 border-[2px] overflow-hidden border-orange-200 text-lg font-normal text-orange-900 flex justify-between p-2 items-center gap-10 bg-[rgba(255,237,212,0.5)] active:bg-slate-100 shadow-none cursor-pointer relative"
        >
          <Image
            src={"/assets/layoutOption2.png"}
            width={80}
            height={80}
            alt="Layout option 2"
            className="rounded-lg"
          />
          <span>Blocks Layout</span>
          <span
            className="block w-fit px-2 text-xs text-white font-normal rounded-lg absolute top-2 right-2 overflow-hidden shining_badge"
            style={{ backgroundColor: colors?.primary }}
          >
            New
          </span>
        </button>

        <button
          onClick={() => setLayout("table")}
          className="w-full rounded-xl my-3 border-[2px] overflow-hidden border-orange-200 text-lg font-normal text-orange-900 flex justify-between p-2 items-center gap-10 bg-[rgba(255,237,212,0.5)] active:bg-slate-100 shadow-none cursor-pointer"
        >
          <Image
            src={"/assets/layoutOption1.png"}
            width={80}
            height={80}
            alt="Layout option 1"
            className="rounded-lg"
          />
          <span>Table Layout</span>
        </button>
      </div>
    </div>
  );
};
export default PreferredPlanLayoutModal;
