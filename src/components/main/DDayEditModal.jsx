import { useSettings } from "@/services/SettingsProvider";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import DayPlan from "./DayPlan";

const DDayEditModal = ({
  dDayEditModalVisible,
  setDDayEditModalVisible,
  editingDDayData,
  setEditingDDayData,
  editDDay,
}) => {
  const { colors, userData } = useSettings();

  return (
    dDayEditModalVisible && (
      <div className="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,82,35,0.12)] backdrop-blur-xs flex items-center justify-center fade">
        {/* Modal Closer Layer */}
        <div
          className="absolute z-[-1] top-0 left-0 w-full h-full bg-transparent"
          onClick={() => setDDayEditModalVisible(false)}
        ></div>

        {/* Main Modal - Session Add Block */}
        <div
          className={`z-20 w-full max-w-[370px] rounded-lg bg-white p-5 shadow-lg fade-down`}
        >
          <span
            className="text-2xl font-normal block text-center mb-3"
            style={{
              color: colors?.primary,
            }}
          >
            Edit D-Day
          </span>

          {/* Add D-Day Form */}
          <form
            onSubmit={(e) => editDDay(e.target.set_as_active?.checked)}
            className="w-full flex flex-col gap-3"
          >
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
                value={editingDDayData?.name}
                onChange={(e) =>
                  setEditingDDayData({
                    ...editingDDayData,
                    name: e.target?.value,
                  })
                }
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
                value={editingDDayData?.date}
                onChange={(e) =>
                  setEditingDDayData({
                    ...editingDDayData,
                    date: e.target?.value,
                  })
                }
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
                  value={editingDDayData?.bgColor}
                  onChange={(e) =>
                    setEditingDDayData({
                      ...editingDDayData,
                      bgColor: e.target?.value,
                    })
                  }
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
                  value={editingDDayData?.textColor}
                  onChange={(e) =>
                    setEditingDDayData({
                      ...editingDDayData,
                      textColor: e.target?.value,
                    })
                  }
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
                defaultChecked={
                  editingDDayData?.index === userData?.selectedDDay
                }
              />
              <span className="text-sm font-normal block text-left text-slate-600 mb-0">
                Set as primary d-day
              </span>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <button
                type="button"
                onClick={() => setDDayEditModalVisible(false)}
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
                Add D-Day <FaCheck className="text-lg" />
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
export default DDayEditModal;
