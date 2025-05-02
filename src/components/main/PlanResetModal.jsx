import { useSettings } from "@/services/SettingsProvider";
import toast from "react-hot-toast";
import { GrPowerReset } from "react-icons/gr";

const PlanResetModal = ({
  setPlanResetModalVisible,
  planResetModalVisible,
  resetPlan,
}) => {
  const { colors } = useSettings();

  return (
    planResetModalVisible && (
      <div className="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-xs flex items-center justify-center fade p-4">
        {/* Modal Closer Layer */}
        <div
          className="absolute z-[-1] top-0 left-0 w-full h-full bg-transparent"
          onClick={() => {
            setPlanResetModalVisible(false);
          }}
        ></div>

        {/* Block/Session Edit Modal */}
        <div
          className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down`}
        >
          <span
            className="text-2xl font-normal block text-center mb-3"
            style={{
              color: colors?.primary,
            }}
          >
            Reset Plan
          </span>

          {/* Plan Reset Form */}
          <form onSubmit={resetPlan} className="w-full flex flex-col gap-2">
            <div className="flex flex-row items-center gap-1 justify-start">
              <input
                id="remove_checks"
                name="remove_checks"
                type="checkbox"
                defaultChecked={true}
              />
              <label
                htmlFor="remove_checks"
                className="text-sm font-normal block text-left text-slate-600"
              >
                Mark everything as undone
              </label>
            </div>

            <div className="flex flex-row items-center gap-1 justify-start">
              <input
                id="remove_notes"
                name="remove_notes"
                type="checkbox"
                defaultChecked={false}
              />
              <label
                htmlFor="remove_notes"
                className="text-sm font-normal block text-left text-slate-600"
              >
                Clear all notes
              </label>
            </div>

            <div className="flex flex-row gap-2 items-center mt-2">
              <button
                type="button"
                onClick={() => {
                  setPlanResetModalVisible(false);
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
                Reset Plan <GrPowerReset className="text-lg" />
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
export default PlanResetModal;
