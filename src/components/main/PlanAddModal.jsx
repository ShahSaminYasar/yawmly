import { useSettings } from "@/services/SettingsProvider";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";

const PlanAddModal = ({ planAddModalVisible, setPlanAddModalVisible }) => {
  const { colors, userData, setUserData } = useSettings();

  // Functions
  const addNewPlan = (e) => {
    e.preventDefault();

    let title = e.target.title.value;
    let description = e.target.description.value;
    let setAsActive = e.target.set_as_active?.checked;

    let newPlan = {
      title,
      description,
      createdOn: new Date(),
      plan: {
        header: ["Time", "Session", "Remarks"],
        rows: [],
      },
    };

    let updatedUserData = {
      ...userData,
      plans: [...userData?.plans, newPlan],
      selectedPlan: setAsActive
        ? userData?.plans?.length
        : userData?.selectedPlan,
      lastUpdatedAt: new Date().toISOString(),
    };

    setUserData(updatedUserData);
    setPlanAddModalVisible(false);
    return toast.success("New plan added!");
  };

  return (
    planAddModalVisible && (
      <div className="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-xs flex items-center justify-center fade p-4">
        {/* Modal Closer Layer */}
        <div
          className="absolute z-[-1] top-0 left-0 w-full h-full bg-transparent"
          onClick={() => setPlanAddModalVisible(false)}
        ></div>

        {/* New Plan Modal */}
        <div
          className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down`}
        >
          <span
            className="text-2xl font-normal block text-center mb-3"
            style={{
              color: colors?.primary,
            }}
          >
            New Plan
          </span>

          {/* Add Plan Form */}
          <form onSubmit={addNewPlan} className="w-full flex flex-col gap-3">
            {/* Title Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Plan Name
              </span>
              <input
                type="text"
                name="title"
                required
                placeholder="Name of the plan"
                className="input w-full"
                style={{
                  outlineColor: colors.accent,
                  borderColor: colors.accent,
                }}
              />
            </div>

            {/* Description Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Description (optional)
              </span>
              <textarea
                name="description"
                placeholder="Description of the plan"
                rows={5}
                className="textarea w-full resize-none"
                style={{
                  outlineColor: colors.accent,
                  borderColor: colors.accent,
                }}
              />
            </div>

            <div className="flex flex-row items-center gap-2 justify-start">
              <input
                name="set_as_active"
                type="checkbox"
                defaultChecked={false}
              />
              <span className="text-sm font-normal block text-left text-slate-600 mb-0">
                Set as active plan
              </span>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <button
                type="button"
                onClick={() => setPlanAddModalVisible(false)}
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
                Add Plan <FaCheck className="text-lg" />
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
export default PlanAddModal;
