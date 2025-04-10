import { useSettings } from "@/services/SettingsProvider";
import { minutesToTime } from "@/utils/minutesToTime";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";

const SessionBlock = ({
  block,
  index,
  tags,
  setBlockEditModalVisible,
  setEditingBlockIndex,
  setEditingBlockData,
}) => {
  const { colors, userData, setUserData } = useSettings();

  //   Functions
  const markAsDone = (e) => {
    let updatedBlock = {
      ...block,
      remarks: {
        ...block.remarks,
        checked: e.target?.checked,
      },
    };

    if (
      userData.plans[userData?.selectedPlan].plan.rows?.sort(
        (a, b) => a.start - b.start
      )?.[index]
    ) {
      let updatedUserData = {
        ...userData,
        plans: userData?.plans?.map((plan, planIndex) => {
          if (planIndex === userData?.selectedPlan) {
            return {
              ...plan,
              plan: {
                ...plan.plan,
                rows: plan.plan.rows
                  .sort((a, b) => a.start - b.start)
                  .map((r, i) => (i === index ? updatedBlock : r)),
              },
            };
          }
          return plan;
        }),
      };

      return setUserData(updatedUserData);
    } else {
      return toast.error(
        "An error occured while updating the data, please refresh the app."
      );
    }
  };

  return (
    <tr
      className="text-[12px] sm:text-sm group"
      style={{
        backgroundColor: tags[block?.tag]?.bg,
        color: tags[block?.tag]?.text,
      }}
    >
      <td
        style={{
          borderWidth: "1px",
          borderColor: colors?.accent,
          padding: "12px 12px",
        }}
        className="font-semibold"
      >
        {minutesToTime(block?.start)} - {minutesToTime(block?.end)} (
        {block?.end - block?.start}min)
      </td>
      <td
        style={{
          borderWidth: "1px",
          borderColor: colors?.accent,
          padding: "12px 12px",
        }}
        className="overflow-hidden text-ellipsis"
      >
        {block?.title}
      </td>
      <td
        style={{
          borderWidth: "1px",
          borderColor: colors?.accent,
          padding: "12px 12px",
          position: "relative",
        }}
      >
        <button
          onClick={() => {
            setEditingBlockIndex(index);
            setEditingBlockData({
              title: block?.title,
              start: block?.start,
              end: block?.end,
              tag: block?.tag,
              remarks: {
                checked: block?.remarks?.checked,
                note: block?.remarks?.note,
              },
            });
            setBlockEditModalVisible(true);
          }}
          className="absolute top-1 right-1 cursor-pointer block opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 group-focus-within:opacity-100 group-focus-visible:opacity-100 aspect-square p-[6px] rounded-full"
          style={{
            backgroundColor: tags[block?.tag]?.text,
          }}
        >
          <FiEdit2
            style={{
              fontSize: "12px",
              color: tags[block?.tag]?.bg,
            }}
          />
        </button>
        <input
          type="checkbox"
          checked={block?.remarks?.checked}
          onChange={markAsDone}
          style={{
            borderWidth: "2px",
            accentColor: tags[block?.tag]?.text,
            width: "14px",
            height: "14px",
            cursor: "pointer",
          }}
        />
        {block?.remarks?.note?.length > 0 && (
          <span
            className="block w-fit max-w-[120px] h-fit max-h-[100px] overflow-hidden text-ellipsis rounded-sm text-center text-[11px] px-1 text-slate-700 font-medium rounded-tr-none shadow-sm mx-auto opacity-80 group-hover:opacity-100"
            style={{
              color: tags[block?.tag]?.bg,
              backgroundColor: tags[block?.tag]?.text,
            }}
          >
            {block?.remarks?.note}
          </span>
        )}
      </td>
    </tr>
  );
};
export default SessionBlock;
