import { useSettings } from "@/services/SettingsProvider";
import { FaCheck, FaChevronLeft, FaPlay } from "react-icons/fa6";

const Step2 = ({ prevStep, nextStep, formData }) => {
  const { colors, updatingUserData } = useSettings();

  return (
    <div className="flex flex-col gap-3 items-center pt-3 relative">
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

      {/* Question */}
      <p className="block text-center text-[16px] w-full fade">
        All done, <span className="font-medium">{formData?.name}</span>
      </p>

      <span
        className="text-3xl font-normal text-center fade"
        style={{ color: colors.primary }}
      >
        Let's get
        <span className="block font-bold text-center mt-1">PRODUCTIVE!</span>
      </span>

      {/* Proceed Button */}
      <button
        onClick={nextStep}
        className="w-full px-2 py-2 rounded-sm text-white flex flex-row items-center gap-1 text-sm font-medium justify-center cursor-pointer active:scale-[92%] mt-3 hover:tracking-wider disabled:grayscale-[60%] disabled:opacity-60 disabled:cursor-default fade"
        style={{
          background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
        }}
        disabled={updatingUserData}
      >
        Start the journey <FaPlay />
      </button>
    </div>
  );
};
export default Step2;
