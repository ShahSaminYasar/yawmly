"use client";
import Tags from "@/components/settings/Tags";
import TimeFormat from "@/components/settings/TimeFormat";
import WakeUpTime from "@/components/settings/WakeUpTime";
import { useSettings } from "@/services/SettingsProvider";

const page = () => {
  const { colors } = useSettings();

  return (
    <>
      <section className="w-full flex flex-col gap-3 items-start text-slate-700 text-sm font-medium py-6 fade">
        <h3
          className="text-2xl font-semibold"
          style={{
            color: colors?.accent,
          }}
        >
          SETTINGS
        </h3>

        {/* Preferred Time Format */}
        <TimeFormat />

        {/* Wake up time */}
        <WakeUpTime />

        {/* Tags */}
        <Tags />
      </section>
    </>
  );
};
export default page;
