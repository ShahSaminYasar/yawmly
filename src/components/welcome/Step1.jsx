import { useSettings } from "@/services/SettingsProvider";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight, FaChevronLeft } from "react-icons/fa6";
import { GoClock } from "react-icons/go";

const Step1 = ({ nextStep, prevStep, formData, setFormData }) => {
  const { colors } = useSettings();

  // States
  const [wakeUpTime, setWakeUpTime] = useState(
    formData?.settings?.wakeUpTime || ""
  );

  return (
    // Wake-up-time input Page
    <div className="flex flex-col gap-3 items-center relative pt-3">
      {/* Go Back Button */}
      <button
        onClick={prevStep}
        className="rounded-sm bg-white border-2 p-1 absolute top-0 left-0 cursor-pointer"
        style={{
          color: colors?.primary,
          borderColor: colors.secondary,
        }}
      >
        <FaChevronLeft className="text-sm" />
      </button>

      {/* Question/Title */}
      <p className="block text-center text-lg w-full mx-auto max-w-[250px] fade-down">
        What time do you wake up and start your day?
      </p>

      {/* Wake-up-time Input */}
      <div className="w-full relative">
        <input
          type="time"
          name="wake_up_time"
          onChange={(e) => {
            // console.log("setting wutime: ", e.target.value);
            setWakeUpTime(e.target.value);
          }}
          value={wakeUpTime}
          className="input w-full fade"
          style={{
            outlineColor: colors.accent,
            borderColor: colors.accent,
          }}
        />

        <GoClock className="text-xs text-slate-300 absolute top-1/2 -translate-y-1/2 right-[15px] pointer-events-none" />
      </div>

      {/* Proceed Button */}
      <button
        onClick={() => {
          if (wakeUpTime?.length === 0) {
            return toast("Please tell your day-starting time...", {
              icon: "🕔",
            });
          }
          setFormData((prev) => ({
            ...prev,
            settings: { ...prev?.settings, wakeUpTime },
          }));
          nextStep();
        }}
        className="w-full px-2 py-2 rounded-sm text-white flex flex-row items-center gap-1 text-sm font-medium justify-end cursor-pointer active:scale-[92%] fade"
        style={{
          background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
        }}
      >
        Next <FaArrowRight />
      </button>
    </div>
  );
};
export default Step1;
