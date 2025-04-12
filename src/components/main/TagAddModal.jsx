import { useSettings } from "@/services/SettingsProvider";
import { useMemo } from "react";
import { FaChevronLeft } from "react-icons/fa6";

const TagAddModal = ({ setTagAddModalVisible, setNewSessionTag }) => {
  const { colors, userData, setUserData } = useSettings();

  // Memos
  const inputStyle = useMemo(
    () => ({
      outlineColor: colors.accent,
      borderColor: colors.accent,
    }),
    [colors]
  );

  //   Functions
  const addNewTag = (e) => {
    e.preventDefault();

    let tagTitle = e.target?.new_tag_name?.value?.toLowerCase();
    let tagBGColor = e.target?.new_tag_bg_color?.value;
    let tagTextColor = e.target?.new_tag_text_color?.value;

    let updatedUserData = {
      ...userData,
      settings: {
        ...userData?.settings,
        tags: {
          ...userData?.settings?.tags,
          [tagTitle]: {
            bg: tagBGColor,
            text: tagTextColor,
          },
        },
      },
      lastUpdatedAt: new Date().toISOString(),
    };

    setUserData(updatedUserData);
    setTagAddModalVisible(false);
    if (setNewSessionTag) setNewSessionTag(tagTitle);
  };

  return (
    <div className="z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down relative">
      {/* Go Back Button */}
      <button
        type="button"
        onClick={() => setTagAddModalVisible(false)}
        className="rounded-sm bg-white border-2 p-1 absolute top-3 left-3 cursor-pointer"
        style={{
          color: colors?.primary,
          borderColor: colors.secondary,
        }}
      >
        <FaChevronLeft className="text-sm" />
      </button>

      <span
        className="text-2xl font-normal block text-center mb-3"
        style={{
          color: colors?.primary,
        }}
      >
        New Session Tag
      </span>

      <form onSubmit={addNewTag} className="w-full">
        {/* Tag Name Input */}
        <span className="text-sm font-normal block text-left text-slate-600 mb-1">
          Name of the tag
        </span>
        <input
          type="text"
          placeholder="Tag Name"
          name="new_tag_name"
          className="input w-full"
          style={inputStyle}
        />

        {/* Tag Colors Input */}
        <span className="text-sm font-normal block text-left text-slate-600 mb-0 mt-3">
          Tag colors
        </span>
        <div className="flex flex-row gap-3 items-start">
          <div className="flex flex-col items-center gap-0 text-sm text-slate-600 font-normal">
            {/* BG Color Input */}
            <input
              type="color"
              name="new_tag_bg_color"
              defaultValue={"#ff914d"}
              style={{
                borderColor: colors?.shade,
              }}
            />
            <span>BG</span>
          </div>
          <div className="flex flex-col items-center gap-0 text-sm text-slate-600 font-normal">
            {/* FG Color Input */}
            <input
              type="color"
              name="new_tag_text_color"
              defaultValue={"#fcfcfc"}
              style={{
                borderColor: colors?.shade,
              }}
            />
            <span>FG</span>
          </div>
        </div>

        {/* Tag Publish Button */}
        <button
          type="submit"
          className="w-full text-sm font-semibold block text-center text-slate-100 px-2 py-[8px] rounded-sm active:scale-[92%] mt-3 cursor-pointer"
          style={{
            backgroundColor: colors?.primary,
          }}
        >
          Add New Tag
        </button>
      </form>
    </div>
  );
};
export default TagAddModal;
