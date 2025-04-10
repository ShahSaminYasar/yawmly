import { useSettings } from "@/services/SettingsProvider";
import { getDDayCount } from "@/utils/getDDayCount";
import { useEffect, useState } from "react";

const DDayViewer = ({ dDate, className, style }) => {
  const { userData } = useSettings();

  // States
  const [dday, setDday] = useState("");

  // Effects
  useEffect(() => {
    let targetDDay = dDate || userData?.dDays?.[userData?.selectedDDay]?.date;
    if (targetDDay) {
      setDday(getDDayCount(targetDDay));
    } else {
      setDday("");
    }
  }, [userData]);

  return (
    <span
      className={`font-semibold ${className && className}`}
      style={style || null}
    >
      D{dday < 0 ? "+" : "-"}
      {dday ? (dday >= 0 ? dday : dday * -1) : "Day"}
    </span>
  );
};
export default DDayViewer;
