import { useSettings } from "@/services/SettingsProvider";
import { useState } from "react";
import { GoTrash } from "react-icons/go";

const Tag = ({
  tagName,
  tagColors,
  setTagNameToDelete,
  setTagDeleteModalVisible,
}) => {
  const { setUserData, colors } = useSettings();

  //   States
  const [tagModified, setTagModified] = useState(false);

  const updateTag = (e) => {
    e.preventDefault();

    let bgColor = e.target.bg_color.value;
    let textColor = e.target.text_color.value;

    setUserData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        tags: {
          ...prev.settings.tags,
          [tagName]: {
            text: textColor,
            bg: bgColor,
          },
        },
      },
    }));

    setTagModified(false);
  };

  return (
    <form
      onSubmit={updateTag}
      className="w-full grid grid-cols-5 gap-1 py-2 border-b border-b-slate-100"
    >
      <span>{tagName}</span>
      <input
        type="color"
        name="bg_color"
        defaultValue={tagColors?.bg || "#000000"}
        className="block mx-auto"
        onChange={() => !tagModified && setTagModified(true)}
      />
      <input
        type="color"
        name="text_color"
        defaultValue={tagColors?.text || "#000000"}
        className="block mx-auto"
        onChange={() => !tagModified && setTagModified(true)}
      />
      <div className="w-full flex justify-center gap-1">
        <button
          type="button"
          className="p-1 w-[27px] h-[27px] grid place-content-center rounded-full bg-red-500 text-white text-sm cursor-pointer"
          onClick={() => {
            setTagNameToDelete(tagName);
            setTagDeleteModalVisible(true);
          }}
        >
          <GoTrash />
        </button>
      </div>

      {tagModified && (
        <button
          type="submit"
          className="px-1 py-1 text-white text-sm cursor-pointer fade rounded-sm"
          style={{
            backgroundColor: colors?.primary,
          }}
        >
          Save
        </button>
      )}
    </form>
  );
};
export default Tag;
