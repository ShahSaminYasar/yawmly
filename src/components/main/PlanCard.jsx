import { useSettings } from "@/services/SettingsProvider";
import moment from "moment-timezone";
import { FiEdit2 } from "react-icons/fi";

const PlanCard = ({
  plan,
  index,
  setPlanEditModalVisible,
  setEditingPlanData,
}) => {
  const { colors, userData, setUserData } = useSettings();

  return (
    <div
      className="w-full max-w-[300px] h-fit rounded-lg overflow-hidden pt-[130px] shadow-sm bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(255,99,2,0.25),rgba(255,99,2,0.25)), url(/assets/bg-2.jpg)`,
        backgroundSize: "470px",
        backgroundPosition: "-50px -110px",
      }}
    >
      {/* Plan Data Container */}
      <div
        className="w-full rounded-t-lg flex flex-col gap-3 items-start relative p-3"
        style={{
          backgroundColor: colors?.shade,
        }}
      >
        {/* Plan Title */}
        <span
          className="text-2xl sm:text-3xl font-semibold block text-left"
          style={{
            color: colors?.accent,
          }}
        >
          {plan?.title}
        </span>

        {/* Plan Active Badge */}
        {index === userData?.selectedPlan && (
          <span
            className="w-fit block rounded-sm px-1 text-white text-[10px] absolute -top-2 right-2"
            style={{
              backgroundColor: colors?.primary,
            }}
          >
            Active
          </span>
        )}

        {/* Plan Description */}
        <p className="text-sm text-slate-600 font-medium block text-left mt-0">
          {plan?.description || "No description"}
        </p>

        {/* Plan creation date */}
        <span className="text-xs font-normal text-slate-500 mt-0">
          Created on:{" "}
          {moment
            .tz(plan?.createdOn, "Asia/Dhaka")
            .format("D MMMM, YYYY [at] h:mm A")}
        </span>

        {/* Action Buttons */}
        <div className="w-full flex gap-2 items-center mt-1">
          {/* Edit Plan Button */}
          <button
            onClick={() => {
              setEditingPlanData({
                index,
                title: plan?.title,
                description: plan?.description,
              });
              setPlanEditModalVisible(true);
            }}
            className="w-full rounded-xl border-2 px-3 py-2 flex items-center gap-2 justify-center cursor-pointer active:scale-[96%] text-sm"
            style={{
              background: "transparent",
              color: colors?.accent,
            }}
          >
            <FiEdit2 />
            Edit Plan
          </button>

          {/* Set as Active Button */}
          <button
            onClick={() =>
              setUserData((prev) => ({
                ...prev,
                selectedPlan: index,
                lastUpdatedAt: new Date().toISOString(),
              }))
            }
            className="w-full rounded-xl border-2 px-3 py-2 flex items-center gap-2 justify-center cursor-pointer active:scale-[96%] disabled:opacity-50 text-sm"
            style={{
              background: colors?.accent,
              color: "#fff",
            }}
            disabled={index === userData?.selectedPlan}
          >
            {index === userData?.selectedPlan
              ? "Currently Active"
              : "Set as active"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PlanCard;
