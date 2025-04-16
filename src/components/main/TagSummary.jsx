import { useSettings } from "@/services/SettingsProvider";

const TagSummary = ({ tagsData }) => {
  const { colors } = useSettings();

  return (
    <table
      className="table-fixed border-2 text-[14px] sm:text-[15px] font-semibold w-full max-w-2xl mx-auto mt-3 mb-8 text-center tag_duration_table rounded-lg overflow-hidden shadow"
      style={{
        borderColor: colors?.accent,
      }}
      cellSpacing={0}
    >
      <thead
        style={{
          backgroundColor: colors?.accent,
          color: "#ffffff",
        }}
      >
        <tr>
          <th>Tag</th>
          <th>Total Time</th>
        </tr>
      </thead>

      <tbody>
        {tagsData?.map((tag) => (
          <tr
            key={tag?.tag}
            className="text-[12px] sm:text-[14px] group"
            style={{
              backgroundColor: tag?.bgColor,
              color: tag?.textColor,
            }}
          >
            <td
              style={{
                borderWidth: "0px",
                color: "#ffffff",
                backgroundColor: colors?.primary,
                padding: "12px 12px",
                borderColor: colors?.accent,
                textTransform: "capitalize",
              }}
            >
              {tag?.tag}
            </td>
            <td
              style={{
                borderWidth: "0px",
                borderColor: colors?.accent,
                padding: "12px 12px",
              }}
            >
              {tag?.duration}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TagSummary;
