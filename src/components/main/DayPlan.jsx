import { outfit } from "@/lib/fonts";
import { useSettings } from "@/services/SettingsProvider";
import { minutesToTime } from "@/utils/minutesToTime";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import BlockAddModal from "./BlockAddModal";

const DayPlan = ({ plan, planId }) => {
  const { colors, userData, setBlockAddModalVisible } = useSettings();

  //   States
  const [tags, setTags] = useState({});

  useEffect(() => {
    setTags(userData?.settings?.tags || {});
  }, [userData]);

  return (
    <section>
      <h3
        className={`${outfit?.className} block text-center text-xl font-bold capitalize mb-3`}
        style={{
          color: colors?.accent,
        }}
      >
        {plan?.title}
      </h3>

      {/* Plan Table */}
      <table
        style={{
          borderColor: colors?.accent,
        }}
        className="w-full border-[1px] border-collapse text-[16px] text-center"
      >
        <thead
          style={{
            backgroundColor: colors?.primary,
            color: "#fff",
          }}
        >
          <tr>
            {plan?.plan?.header?.map((heading) => (
              <th
                key={heading}
                style={{
                  borderWidth: "1px",
                  borderColor: colors?.accent,
                  padding: "8px",
                }}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {plan?.plan?.rows?.map((block, index) => (
            <tr
              key={`session_block_${index}`}
              className="text-sm"
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
              >
                {minutesToTime(block?.start)} - {minutesToTime(block?.end)}
              </td>
              <td
                style={{
                  borderWidth: "1px",
                  borderColor: colors?.accent,
                  padding: "12px 12px",
                }}
              >
                {block?.title}
              </td>
              <td
                style={{
                  borderWidth: "1px",
                  borderColor: colors?.accent,
                  padding: "12px 12px",
                }}
              >
                <input
                  type="checkbox"
                  checked={block?.remarks?.checked}
                  style={{
                    borderWidth: "2px",
                    borderColor: tags[block?.tag]?.text,
                  }}
                />
                <input
                  type="text"
                  value={block?.remarks?.note}
                  className={
                    block?.remarks?.note?.length === 0
                      ? "block -mt-5 w-[40%]"
                      : "inline-block mt-0 ml-1"
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to add a new block/row */}
      <div className="flex flex-row flex-nowrap justify-between gap-1 items-center mt-2 mb-2">
        <span
          className="block w-full h-[1px] rounded-sm"
          style={{
            backgroundColor: colors?.secondary,
          }}
        ></span>
        <button
          onClick={() => {
            setBlockAddModalVisible(true);
          }}
          className="w-fit aspect-square block rounded-full border-[1px] p-[4px] cursor-pointer"
          style={{
            borderColor: colors?.primary,
          }}
        >
          <FaPlus
            className="text-[10px]"
            style={{
              color: colors?.primary,
            }}
          />
        </button>
        <span
          className="block w-full h-[1px] rounded-sm"
          style={{
            backgroundColor: colors?.secondary,
          }}
        ></span>
      </div>

      <BlockAddModal />
    </section>
  );
};
export default DayPlan;
