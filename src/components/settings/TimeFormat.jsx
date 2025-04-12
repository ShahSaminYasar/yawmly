import { useSettings } from "@/services/SettingsProvider";

const TimeFormat = () => {
  const { userData, setUserData } = useSettings();

  return (
    <div className="w-full pl-2">
      {/* Title */}
      <div className="w-full border-t border-slate-300 mt-2 -mb-1 -ml-2">
        <span className="block w-fit bg-white -translate-y-3 text-sm text-slate-900 font-medium pr-1 ">
          Time format
        </span>
      </div>

      <label className="text-slate-700 font-medium text-sm mb-2 flex items-center gap-1">
        <input
          type="radio"
          name="timeFormat"
          value={"t"}
          checked={userData?.settings?.preferredTimeFormat === "t"}
          onChange={(e) =>
            setUserData((prev) => ({
              ...prev,
              settings: {
                ...prev.settings,
                preferredTimeFormat: e.target.value,
              },
            }))
          }
        />
        12 hour
      </label>
      <label className="text-slate-700 font-medium text-sm flex items-center gap-1">
        <input
          type="radio"
          name="timeFormat"
          value={"T"}
          checked={userData?.settings?.preferredTimeFormat === "T"}
          onChange={(e) =>
            setUserData((prev) => ({
              ...prev,
              settings: {
                ...prev.settings,
                preferredTimeFormat: e.target.value,
              },
            }))
          }
        />
        24 hour
      </label>
    </div>
  );
};
export default TimeFormat;
