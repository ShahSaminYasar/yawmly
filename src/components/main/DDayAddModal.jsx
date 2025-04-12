import { useSettings } from "@/services/SettingsProvider";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import DayPlan from "./DayPlan";

const DDayAddModal = ({ dDayAddModalVisible, setDDayAddModalVisible }) => {
  const { colors, userData, setUserData } = useSettings();

  // Functions
  const addNewDDay = (e) => {
    e.preventDefault();

    let name = e.target?.name?.value;
    let date = e.target?.date?.value;
    let bgColor = e.target?.bg_color?.value;
    let textColor = e.target?.text_color?.value;
    let setAsActive = e.target?.set_as_active?.checked;

    let newDDay = {
      name,
      date,
      bgColor,
      textColor,
    };

    let updatedUserData = {
      ...userData,
      dDays: [...userData?.dDays, newDDay],
      selectedDDay: setAsActive
        ? userData?.dDays?.length
        : userData?.selectedDDay,
      lastUpdatedAt: new Date().toISOString(),
    };

    setUserData(updatedUserData);
    setDDayAddModalVisible(false);
    return toast.success("New D-Day added!");
  };

  return (
    dDayAddModalVisible && (
      <div className="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-xs flex items-center justify-center fade p-4">
        {/* Modal Closer Layer */}
        <div
          className="absolute z-[-1] top-0 left-0 w-full h-full bg-transparent"
          onClick={() => setDDayAddModalVisible(false)}
        ></div>

        {/* New D-Day Modal */}
        <div
          className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down`}
        >
          <span
            className="text-2xl font-normal block text-center mb-3"
            style={{
              color: colors?.primary,
            }}
          >
            New D-Day
          </span>

          {/* Add D-Day Form */}
          <form onSubmit={addNewDDay} className="w-full flex flex-col gap-3">
            {/* Title Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                D-Day Name
              </span>
              <input
                type="text"
                name="name"
                required
                placeholder="Name of the d-day"
                className="input w-full"
                style={{
                  outlineColor: colors.accent,
                  borderColor: colors.accent,
                }}
              />
            </div>

            {/* D-Date Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Target Date
              </span>
              <input
                type="date"
                name="date"
                className="input w-full"
                style={{
                  outlineColor: colors.accent,
                  borderColor: colors.accent,
                }}
                required
              />
            </div>

            <span className="text-sm font-normal block text-left text-slate-600 mt-0 -mb-2">
              D-Day Colors
            </span>
            <div className="flex flex-row gap-3 items-start">
              <div className="flex flex-col items-center gap-0 text-sm text-slate-600 font-normal">
                {/* BG Color Input */}
                <input
                  type="color"
                  name="bg_color"
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
                  name="text_color"
                  defaultValue={"#ffffff"}
                  style={{
                    borderColor: colors?.shade,
                  }}
                />
                <span>Text</span>
              </div>
            </div>

            <div className="flex flex-row items-center gap-2 justify-start">
              <input
                name="set_as_active"
                type="checkbox"
                defaultChecked={false}
              />
              <span className="text-sm font-normal block text-left text-slate-600 mb-0">
                Set as primary d-day
              </span>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <button
                type="button"
                onClick={() => setDDayAddModalVisible(false)}
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
                Add D-Day <FaCheck className="text-lg" />
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
export default DDayAddModal;
