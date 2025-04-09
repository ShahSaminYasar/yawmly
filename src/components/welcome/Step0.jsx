import { useSettings } from "@/services/SettingsProvider";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa6";

const Step0 = ({ nextStep, formData, setFormData }) => {
  const { colors } = useSettings();

  //   States
  const [name, setName] = useState(formData?.name || "");

  return (
    // Name Input Page
    <div className="flex flex-col gap-3 items-center pt-3">
      {/* Page Title */}
      <span
        className="text-2xl font-medium fade delay-300"
        style={{ color: colors.primary }}
      >
        WELCOME
      </span>

      {/* Question */}
      <p className="block text-center text-lg w-full fade-down">
        What's your name?
      </p>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name?.length !== 0) {
            setFormData((prev) => ({
              ...prev,
              name,
            }));
            nextStep();
          } else {
            return toast("Please tell your name to continue...", {
              duration: 2000,
              icon: "💡",
            });
          }
        }}
        className="w-full flex flex-col gap-3 mt-1 fade"
      >
        {/* Name Input */}
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setName(e?.target?.value);
          }}
          value={name || ""}
          placeholder="Type your name here"
          className="input w-full"
          style={{
            outlineColor: colors.accent,
            borderColor: colors.accent,
          }}
        />

        {/* Proceed Button */}
        <button
          type="submit"
          className="w-full px-2 py-2 rounded-sm text-white flex flex-row items-center gap-1 text-sm font-medium justify-end cursor-pointer active:scale-[97%]"
          style={{
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
          }}
        >
          Next <FaArrowRight />
        </button>
      </form>
    </div>
  );
};
export default Step0;
