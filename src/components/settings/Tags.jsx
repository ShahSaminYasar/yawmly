import { useSettings } from "@/services/SettingsProvider";
import Tag from "./Tag";
import { FaCirclePlus } from "react-icons/fa6";
import { useState } from "react";

const Tags = () => {
  const { userData, setUserData, colors } = useSettings();

  // States
  const [tagNameToDelete, setTagNameToDelete] = useState("");
  const [tagDeleteModalVisible, setTagDeleteModalVisible] = useState(false);
  const [tagAddModalVisible, setTagAddModalVisible] = useState(false);

  // Functions
  const deleteTag = () => {
    let { [tagNameToDelete]: _, ...remainingTags } = userData.settings.tags;
    setUserData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        tags: remainingTags,
      },
    }));
    setTagDeleteModalVisible(false);
  };

  return (
    <>
      <div className="w-full pl-2 mt-3">
        {/* Title */}
        <div className="w-full border-t border-slate-300 mt-2 -mb-1 -ml-2">
          <span className="block w-fit bg-white -translate-y-3 text-sm text-slate-900 font-medium pr-1 ">
            Tags
          </span>

          <button
            type="button"
            onClick={() => setTagAddModalVisible(true)}
            className="w-fit text-xs font-normal text-left text-slate-100 px-2 py-[6px] rounded-sm active:scale-[92%] whitespace-nowrap mt-[5px] cursor-pointer flex flex-row gap-1 items-center -translate-y-[40px] ml-auto -mb-[30px]"
            style={{
              backgroundColor: colors?.primary,
            }}
          >
            <FaCirclePlus className="text-sm" /> Add New Tag
          </button>
        </div>

        <div className="w-full max-w-[400px] text-[12px] sm:text-sm text-slate-600">
          <div className="w-full grid grid-cols-5 gap-1 text-slate-900">
            <span>Name</span>
            <span className="block text-center">BG Color</span>
            <span className="block text-center">Text Color</span>
            <span className="block text-center">Actions</span>
          </div>
          {userData?.settings?.tags &&
            Object.entries(userData?.settings?.tags)?.map(
              ([tagName, tagColors], tagIndex) => (
                <Tag
                  tagName={tagName}
                  tagColors={tagColors}
                  setTagDeleteModalVisible={setTagDeleteModalVisible}
                  setTagNameToDelete={setTagNameToDelete}
                  tagIndex={tagIndex}
                  key={`${tagName}_${tagIndex}`}
                />
              )
            )}
        </div>

        <button
          type="button"
          onClick={() => setTagAddModalVisible(true)}
          className="w-fit text-xs font-normal text-left text-slate-100 px-2 py-[6px] rounded-sm active:scale-[92%] whitespace-nowrap mt-[5px] cursor-pointer flex flex-row gap-1 items-center mx-auto sm:mx-0"
          style={{
            backgroundColor: colors?.primary,
          }}
        >
          <FaCirclePlus className="text-sm" /> Add New Tag
        </button>
      </div>

      {/* Tag Delete Modal */}
      {tagDeleteModalVisible && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-xs flex items-center justify-center fade p-4">
          {/* Modal Closer Layer */}
          <div
            className="absolute z-[-1] top-0 left-0 w-full h-full bg-transparent"
            onClick={() => setTagDeleteModalVisible(false)}
          ></div>

          {/* Tag Delete Modal */}
          <div
            className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down`}
          >
            <span
              className="text-2xl font-normal block text-center mb-3"
              style={{
                color: colors?.primary,
              }}
            >
              Delete Tag
            </span>

            <p className="block text-center text-lg font-medium mb-2">
              Are you sure you want to delete the tag{" "}
              <span
                className="font-semibold"
                style={{
                  color: colors?.primary,
                }}
              >
                {tagNameToDelete}
              </span>
              ?
            </p>

            <p className="block text-center text-sm italic font-medium mb-3 text-red-500">
              This action cannot be undone!
            </p>

            <div className="flex flex-row gap-2 items-center">
              <button
                type="button"
                onClick={() => setTagDeleteModalVisible(false)}
                className="w-[50%] text-sm font-normal block text-center px-2 py-[8px] rounded-sm active:scale-[92%] mt-1 cursor-pointer bg-white border-2"
                style={{
                  color: colors?.primary,
                  borderColor: colors?.primary,
                }}
              >
                Cancel
              </button>
              <button
                onClick={deleteTag}
                className="w-full text-sm font-semibold flex flex-row gap-1 items-center justify-center text-center px-2 py-[8px] rounded-sm active:scale-[92%] mt-1 cursor-pointer text-white border-2"
                style={{
                  backgroundColor: colors?.primary,
                  borderColor: colors?.primary,
                }}
              >
                Yes, delete tag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tag Add Modal */}
      {tagAddModalVisible && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-xs flex items-center justify-center fade p-4">
          {/* Modal Closer Layer */}
          <div
            className="absolute z-[-1] top-0 left-0 w-full h-full bg-transparent"
            onClick={() => {
              setTagAddModalVisible(false);
            }}
          ></div>

          <TagAddModal setTagAddModalVisible={setTagAddModalVisible} />
        </div>
      )}
    </>
  );
};
export default Tags;
