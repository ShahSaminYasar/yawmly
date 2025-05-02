import { useSettings } from "@/services/SettingsProvider";
import Image from "next/image";

const PlanLayout = () => {
  const { setUserData, userData } = useSettings();

  // Functions
  const setLayout = (layout) => {
    return setUserData((prev) => ({
      ...prev,
      settings: {
        ...prev?.settings,
        preferredPlanLayout: layout,
      },
    }));
  };

  return (
    <div className="w-full pl-2">
      {/* Title */}
      <div className="w-full border-t border-slate-300 mt-2 -mb-1 -ml-2">
        <span className="block w-fit bg-white -translate-y-3 text-sm text-slate-900 font-medium pr-1">
          Plan Layout
        </span>

        <div className="flex justify-start items-center gap-5 mb-3">
          {/* Blocks */}
          <button
            onClick={() => setLayout("blocks")}
            className={`w-full max-w-[110px] rounded-lg border-[2px] overflow-hidden text-lg font-normal text-orange-900 flex justify-between p-2 items-center flex-wrap gap-3 bg-[rgba(255,237,212,0.5)] active:bg-slate-100 shadow-none cursor-pointer ${
              userData?.settings?.preferredPlanLayout === "blocks"
                ? "border-green-600"
                : "border-orange-200"
            }`}
          >
            <Image
              src={"/assets/layoutOption2.png"}
              width={80}
              height={80}
              alt="Layout option 2"
              className="rounded-lg block mx-auto"
            />
            <span className="block text-center w-full">Blocks</span>
          </button>

          {/* Table */}
          <button
            onClick={() => setLayout("table")}
            className={`w-full max-w-[110px] rounded-lg border-[2px] overflow-hidden text-lg font-normal text-orange-900 flex justify-between p-2 items-center flex-wrap gap-3 bg-[rgba(255,237,212,0.5)] active:bg-slate-100 shadow-none cursor-pointer ${
              userData?.settings?.preferredPlanLayout === "table"
                ? "border-green-600"
                : "border-orange-200"
            }`}
          >
            <Image
              src={"/assets/layoutOption1.png"}
              width={80}
              height={80}
              alt="Layout option 1"
              className="rounded-lg block mx-auto"
            />
            <span className="block text-center w-full">Table</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default PlanLayout;
