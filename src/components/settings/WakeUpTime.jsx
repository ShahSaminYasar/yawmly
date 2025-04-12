import { useSettings } from "@/services/SettingsProvider";
import { useState } from "react";
import toast from "react-hot-toast";
import { GoClock } from "react-icons/go";

const WakeUpTime = () => {
  const { userData, setUserData, colors } = useSettings();

  // States
  const [wakeUpTimeModified, setWakeUpTimeModified] = useState(false);

  return (
    <div className="w-full pl-2 mt-3">
      {/* Title */}
      <div className="w-full border-t border-slate-300 mt-2 -mb-1 -ml-2">
        <span className="block w-fit bg-white -translate-y-3 text-sm text-slate-900 font-medium pr-1 ">
          Day starting time
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUserData((prev) => ({
            ...prev,
            settings: {
              ...prev.settings,
              wakeUpTime: e.target.wake_up_time.value,
            },
          }));
          setWakeUpTimeModified(false);
          return toast.success("Wake up time updated");
        }}
        className="flex items-center gap-2 my-1"
      >
        <div className="relative">
          <input
            type="time"
            name="wake_up_time"
            className="input input-bordered input-sm block w-[100px]"
            defaultValue={userData?.settings?.wakeUpTime}
            onChange={() => {
              if (!wakeUpTimeModified) setWakeUpTimeModified(true);
            }}
          />

          <GoClock className="text-xs text-slate-300 absolute top-1/2 -translate-y-1/2 right-[13px] pointer-events-none" />
        </div>

        {wakeUpTimeModified && (
          <button
            type="submit"
            className="px-2 py-2 cursor-pointer whitespace-nowrap text-white text-xs font-medium rounded-sm fade"
            style={{
              backgroundColor: colors?.primary,
            }}
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};
export default WakeUpTime;
