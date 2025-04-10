import moment from "moment";
import DDayViewer from "./DDayViewer";
import { CiMenuKebab } from "react-icons/ci";
import { FiEdit2, FiTrash } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useSettings } from "@/services/SettingsProvider";
import toast from "react-hot-toast";

gsap.registerPlugin(useGSAP);

const DDayCard = ({
  dDay,
  index,
  setEditingDDayData,
  setDDayEditModalVisible,
}) => {
  const { userData, setUserData } = useSettings();

  // States
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);

  const openActionsMenuTL = useRef(gsap.timeline({ paused: true }));

  // Effects
  useGSAP(() => {
    openActionsMenuTL?.current.to(`#actions_menu_${index}`, {
      maxHeight: "120px",
      duration: 0.08,
      ease: "expo.in",
    });
  }, []);

  //   Functions
  const toggleActionsMenu = () => {
    if (!actionsMenuOpen) {
      openActionsMenuTL?.current?.play();
    } else {
      openActionsMenuTL?.current?.reverse();
    }
    setActionsMenuOpen((prev) => !prev);
    console.log(actionsMenuOpen);
  };

  const setAsPrimaryDDay = () => {
    setUserData((prev) => ({
      ...prev,
      selectedDDay: index,
    }));
    return toast.success(`${dDay?.name} has been set as the primary D-Day`);
  };

  return (
    <div
      className="w-full h-fit max-w-[200px] rounded-2xl p-3 flex flex-col items-center gap-0 relative shadow-sm"
      style={{
        backgroundColor: dDay?.bgColor,
        color: dDay?.textColor,
        boxShadow:
          index === userData?.selectedDDay
            ? `rgb(116 255 116) 0px 0px 0px 6px`
            : "none",
        outline:
          index === userData?.selectedDDay
            ? `3px solid rgba(255,255,255,0.85)`
            : "none",
      }}
    >
      {/* Remaining Days to D-Day */}
      <DDayViewer
        dDate={dDay?.date}
        className={`block w-full text-3xl font-black text-center p-3 rounded-2xl`}
        style={{
          backgroundColor: dDay?.textColor,
          color: dDay?.bgColor,
        }}
      />

      {/* D-Day Name */}
      <span
        className="text-2xl font-bold mt-2 -mb-1 text-center block"
        style={{
          color: dDay?.textColor,
        }}
      >
        {dDay?.name}
      </span>

      {/* D-Date */}
      <span
        className="text-lg font-normal"
        style={{
          color: dDay?.textColor,
        }}
      >
        {moment(dDay?.date)?.format("D MMMM, YYYY")}
      </span>

      {/* Actions Menu */}
      <div
        id={`actions_menu_${index}`}
        className="p-1 flex flex-col gap-2 rounded-full absolute z-10 -top-[10px] -right-[10px] shadow-sm border overflow-hidden h-fit max-h-[30px]"
        style={{
          backgroundColor: dDay?.textColor,
          color: dDay?.textColor,
          borderColor: dDay?.bgColor,
        }}
      >
        <button
          onClick={toggleActionsMenu}
          className="block aspect-square p-1 rounded-full cursor-pointer"
          style={{
            backgroundColor: dDay?.bgColor,
          }}
        >
          <CiMenuKebab className="text-sm" />
        </button>
        <button
          onClick={setAsPrimaryDDay}
          className="block aspect-square p-1 rounded-full cursor-pointer"
          style={{
            backgroundColor:
              index === userData?.selectedDDay
                ? dDay?.bgColor
                : dDay?.textColor,
            color:
              index !== userData?.selectedDDay
                ? dDay?.bgColor
                : dDay?.textColor,
          }}
        >
          <FaCheck className="text-sm" />
        </button>
        <button
          onClick={() => {
            setEditingDDayData({
              index,
              name: dDay?.name,
              date: dDay?.date,
              bgColor: dDay?.bgColor,
              textColor: dDay?.textColor,
            });
            setDDayEditModalVisible(true);
          }}
          className="block aspect-square p-1 rounded-full cursor-pointer"
          style={{
            backgroundColor: dDay?.bgColor,
          }}
        >
          <FiEdit2 className="text-sm" />
        </button>
        <button
          className="block aspect-square p-1 rounded-full cursor-pointer"
          style={{
            backgroundColor: dDay?.bgColor,
          }}
        >
          <FiTrash className="text-sm" />
        </button>
      </div>
    </div>
  );
};
export default DDayCard;
