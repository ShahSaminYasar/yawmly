import { useSettings } from "@/services/SettingsProvider";
import { useEffect, useState } from "react";

const DDayViewer = () => {
  const { userData } = useSettings();

  // States
  const [dday, setDday] = useState("");

  // Functions
  const getDDayCount = (ddate) => {
    let now = new Date();
    let dday = new Date(ddate);

    now.setHours(0, 0, 0, 0);
    dday.setHours(0, 0, 0, 0);

    let diffInMs = dday?.getTime() - now?.getTime();
    let diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays;
  };

  // Effects
  useEffect(() => {
    let targetDDay = userData?.dDays?.[userData?.selectedDDay];
    if (targetDDay) {
      setDday(getDDayCount(targetDDay));
    } else {
      setDday("");
    }
  }, [userData]);

  return (
    <span className="font-semibold">
      D{dday < 0 ? "+" : "-"}
      {dday ? (dday >= 0 ? dday : dday * -1) : "Day"}
    </span>
  );
};
export default DDayViewer;
