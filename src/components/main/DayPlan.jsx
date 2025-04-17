import { outfit } from "@/lib/fonts";
import { useSettings } from "@/services/SettingsProvider";
import { minutesToTime } from "@/utils/minutesToTime";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import BlockAddModal from "./BlockAddModal";
import SessionBlock from "./SessionBlock";
import BlockEditModal from "./BlockEditModal";
import moment from "moment";

const DayPlan = ({ plan, planId }) => {
  const { colors, userData, setBlockAddModalVisible } = useSettings();

  //   States
  const [tags, setTags] = useState({});
  const [blockEditModalVisible, setBlockEditModalVisible] = useState(false);
  const [editingBlockIndex, setEditingBlockIndex] = useState(0);
  const [editingBlockData, setEditingBlockData] = useState({
    title: "",
    start: 0,
    end: 0,
    tag: "",
    remarks: {
      checked: false,
      note: "",
    },
  });

  //   Effetcs
  useEffect(() => {
    setTags(userData?.settings?.tags || {});
  }, [userData]);

  return (
    <section className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col items-center gap-0 mb-3">
        {/* <span className="text-xs text-slate-400 font-normal block text-center pb-3 -mt-3 mb-2 relative after:content-[''] after:block after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[230px] after:h-[1px] after:bg-slate-100">
          {moment().format("DD MMMM, YYYY")}
        </span> */}

        <span
          className="text-xs font-medium block text-center w-fit rounded-sm px-[8px] py-[3px] bg-white -mt-8 mb-2 ml-auto"
          style={{
            color: colors?.primary,
          }}
        >
          {moment().format("DD MMMM, YYYY")}
        </span>

        <h3
          className={`${outfit?.className} block text-center text-xl font-bold capitalize`}
          style={{
            color: colors?.accent,
          }}
        >
          {plan?.title}
        </h3>
      </div>

      {/* Plan Table */}
      <table
        style={{
          borderColor: colors?.accent,
          outlineColor: "rgba(255, 145, 77, 0.34)",
        }}
        className="plan_table rounded-lg overflow-hidden outline-2 w-full border-[1px] border-collapse text-[14px] sm:text-[15px] text-center lg:table-fixed"
      >
        <thead
          style={{
            backgroundColor: colors?.primary,
            color: "#fff",
            width: "100%",
          }}
        >
          <tr>
            {plan?.plan?.header?.map((heading, i) => (
              <th
                key={heading}
                style={{
                  borderWidth: "1px",
                  borderColor: colors?.accent,
                  padding: "8px",
                }}
                className={`${
                  i === 0
                    ? "min-w-[170px] sm:min-w-[210px]"
                    : i === 1
                    ? "w-full"
                    : "min-w-[170px] sm:min-w-[210px]"
                } md:w-1/3`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {plan?.plan?.rows
            ?.slice()
            ?.sort((a, b) => a.start - b.start)
            ?.map((block, index) => (
              <SessionBlock
                key={`session_block_${index}`}
                block={block}
                index={index}
                tags={tags}
                setBlockEditModalVisible={setBlockEditModalVisible}
                setEditingBlockIndex={setEditingBlockIndex}
                setEditingBlockData={setEditingBlockData}
              />
            ))}
        </tbody>
      </table>

      {/* Button to add a new block/row */}
      <div className="flex flex-row flex-nowrap justify-between gap-1 items-center mt-2 mb-2 group">
        <span
          className="block w-full h-[2px] rounded-sm opacity-20 group-hover:opacity-40"
          style={{
            backgroundColor: colors?.primary,
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
          className="block w-full h-[2px] rounded-sm opacity-20 group-hover:opacity-40"
          style={{
            backgroundColor: colors?.primary,
          }}
        ></span>
      </div>

      <BlockAddModal />
      <BlockEditModal
        blockEditModalVisible={blockEditModalVisible}
        setBlockEditModalVisible={setBlockEditModalVisible}
        editingBlockData={editingBlockData}
        setEditingBlockData={setEditingBlockData}
        editingBlockIndex={editingBlockIndex}
        tags={tags}
      />
    </section>
  );
};
export default DayPlan;
