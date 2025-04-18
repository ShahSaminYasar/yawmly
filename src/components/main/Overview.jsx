import { useSettings } from "@/services/SettingsProvider";
import TagSummary from "./TagSummary";
import { outfit } from "@/lib/fonts";
import { useEffect, useState } from "react";

const Overview = () => {
  const { colors, userData } = useSettings();

  //   States
  const [tagsData, setTagsData] = useState([]);

  const formatDuration = (m) => {
    const hrs = Math.floor(m / 60);
    const mins = m % 60;
    if (hrs && mins) return `${hrs}h ${mins}m`;
    if (hrs) return `${hrs}h`;
    return `${mins}m`;
  };

  const getTagDurations = () => {
    const tagMap = {};

    const blocks = userData?.plans?.[userData?.selectedPlan]?.plan?.rows;
    const tagsSettings = userData?.settings?.tags;

    blocks?.forEach(({ start, end, tag }) => {
      const duration = end - start;
      if (!tagMap[tag]) tagMap[tag] = 0;
      tagMap[tag] += duration;
    });

    return Object.entries(tagMap)?.map(([tag, totalMins]) => ({
      tag,
      totalMins,
      duration: formatDuration(totalMins),
      bgColor: tagsSettings[tag]?.bg,
      textColor: tagsSettings[tag]?.text,
    }));
  };

  useEffect(() => {
    const getTagData = getTagDurations();
    setTagsData(getTagData);
  }, [userData]);

  return (
    <section>
      <h3
        className={`${outfit?.className} block text-center text-xl font-bold capitalize`}
        style={{
          color: colors?.accent,
        }}
      >
        Overview
      </h3>

      {/* Tag Summary */}
      <TagSummary tagsData={tagsData} />
    </section>
  );
};
export default Overview;
