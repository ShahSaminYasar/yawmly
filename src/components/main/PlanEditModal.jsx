import { useSettings } from "@/services/SettingsProvider";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaTrash } from "react-icons/fa6";

const PlanEditModal = ({
  planEditModalVisible,
  setPlanEditModalVisible,
  editingPlanData,
  setEditingPlanData,
}) => {
  const { colors, userData, setUserData } = useSettings();

  // States
  const [planDeleteModalVisible, setPlanDeleteModalVisible] = useState(false);

  // Functions
  const editPlan = (e) => {
    e.preventDefault();

    let setAsActive = e.target.set_as_active?.checked;
    let index = editingPlanData?.index;
    let title = e.target?.title?.value;
    let description = e.target?.description?.value;

    if (typeof index !== "number") {
      return toast.error("Invalid plan index.");
    }

    let updatedUserData = {
      ...userData,
      plans: userData?.plans?.map((p, i) =>
        i === index ? { ...p, title, description } : p
      ),
      selectedPlan: setAsActive ? index : userData?.selectedPlan,
      lastUpdatedAt: new Date().toISOString(),
    };

    setUserData(updatedUserData);
    setPlanEditModalVisible(false);
    return toast.success("Plan data updated");
  };

  const deletePlan = () => {
    let title = editingPlanData?.title;
    let isTheActivePlan = editingPlanData?.index === userData?.selectedPlan;

    if (typeof editingPlanData?.index !== "number") {
      console.log("Index paay nai", editingPlanData?.index);
      return toast.error("Target plan not found, please refresh the app.");
    }

    if (userData?.plans?.length === 1)
      return toast(
        "You need to keep at least one plan. Please make a new one to delete this."
      );

    setUserData({
      ...userData,
      plans: userData?.plans?.filter((_, i) => i !== editingPlanData?.index),
      selectedPlan: isTheActivePlan ? 0 : userData?.selectedPlan,
      lastUpdatedAt: new Date().toISOString(),
    });
    setPlanDeleteModalVisible(false);
    setPlanEditModalVisible(false);
    setEditingPlanData({});
    return toast.success(`The plan '${title}' was deleted successfully`);
  };

  return (
    planEditModalVisible && (
      <div
        className={`fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-xs flex items-center justify-center fade p-4`}
      >
        {/* Modal Closer Layer */}
        <div
          className="absolute z-[-1] top-0 left-0 w-full h-full bg-transparent"
          onClick={() => {
            setPlanDeleteModalVisible(false);
            setPlanEditModalVisible(false);
          }}
        ></div>

        {/* Plan Edit Modal */}
        <div
          className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down  ${
            planDeleteModalVisible ? "hidden" : "block"
          }`}
        >
          <span
            className="text-2xl font-normal block text-center mb-3"
            style={{
              color: colors?.primary,
            }}
          >
            Edit Plan
          </span>

          {/* Add Plan Form */}
          <form onSubmit={editPlan} className="w-full flex flex-col gap-3">
            {/* Title Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Plan Name
              </span>
              <input
                type="text"
                name="title"
                required
                defaultValue={editingPlanData?.title}
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
                defaultValue={editingPlanData?.description}
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
                defaultChecked={
                  editingPlanData?.index === userData?.selectedPlan
                }
              />
              <span className="text-sm font-normal block text-left text-slate-600 mb-0">
                Set as active plan
              </span>
            </div>

            <button
              type="button"
              onClick={() => setPlanDeleteModalVisible(true)}
              className={`text-sm font-medium cursor-pointer active:scale-[96%] flex items-center gap-2 w-full px-3 py-2 rounded-sm bg-red-500 text-white`}
            >
              <FaTrash className="text-sm" /> Delete Plan
            </button>

            <div className="flex flex-row gap-2 items-center">
              <button
                type="button"
                onClick={() => setPlanEditModalVisible(false)}
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
                Update Plan <FaCheck className="text-lg" />
              </button>
            </div>
          </form>
        </div>

        {/* Plan Delete Modal */}
        {planDeleteModalVisible && (
          <div
            className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down`}
          >
            <span
              className="text-2xl font-normal block text-center mb-3"
              style={{
                color: colors?.primary,
              }}
            >
              Delete Plan
            </span>

            <p className="block text-center text-xl font-bold mb-2">
              Are you sure you want to delete this plan?
            </p>

            <span className="block text-center text-lg font-normal mb-2">
              Name: {editingPlanData?.title}
            </span>

            <p className="block text-center text-lg italic font-medium mb-3">
              This action cannot be undone!
            </p>

            <div className="flex flex-row gap-2 items-center">
              <button
                type="button"
                onClick={() => setPlanDeleteModalVisible(false)}
                className="w-[50%] text-sm font-normal block text-center px-2 py-[8px] rounded-sm active:scale-[97%] mt-1 cursor-pointer bg-white border-2"
                style={{
                  color: colors?.primary,
                  borderColor: colors?.primary,
                }}
              >
                Cancel
              </button>
              <button
                onClick={deletePlan}
                className="w-full text-sm font-semibold flex flex-row gap-1 items-center justify-center text-center px-2 py-[8px] rounded-sm active:scale-[97%] mt-1 cursor-pointer text-white border-2"
                style={{
                  backgroundColor: colors?.primary,
                  borderColor: colors?.primary,
                }}
              >
                Yes, delete it
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};
export default PlanEditModal;
