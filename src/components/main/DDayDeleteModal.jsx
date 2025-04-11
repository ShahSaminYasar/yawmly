import { useSettings } from "@/services/SettingsProvider";
import moment from "moment";
import toast from "react-hot-toast";

const DDayDeleteModal = ({
  dDayDeleteModalVisible,
  setDDayDeleteModalVisible,
  index,
}) => {
  const { colors, userData, setUserData } = useSettings();

  //   Functions
  const deleteDDay = () => {
    let name = userData?.dDays?.[index]?.name;
    let isTheActiveDDay = index === userData?.selectedDDay;
    setUserData((prev) => ({
      ...prev,
      dDays: userData?.dDays?.filter((d, i) => i !== index),
      selectedDDay: isTheActiveDDay ? 0 : userData?.selectedDDay,
    }));
    setDDayDeleteModalVisible(false);
    return toast.success(`The D-Day - '${name}' was deleted successfully`);
  };

  return (
    dDayDeleteModalVisible && (
      <div className="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,82,35,0.12)] backdrop-blur-xs flex items-center justify-center fade p-4">
        {/* Modal Closer Layer */}
        <div
          className="absolute z-[-1] top-0 left-0 w-full h-full bg-transparent"
          onClick={() => setDDayDeleteModalVisible(false)}
        ></div>

        {/* D-Day Delete Modal */}
        <div
          className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down`}
        >
          <span
            className="text-2xl font-normal block text-center mb-3"
            style={{
              color: colors?.primary,
            }}
          >
            Delete D-Day
          </span>

          <p className="block text-center text-xl font-bold mb-2">
            Are you sure you want to delete this D-Day?
          </p>

          <span className="block text-center text-lg font-normal">
            Name: {userData?.dDays?.[index]?.name}
          </span>
          <span className="block text-center text-lg font-normal mb-2">
            Date:{" "}
            {moment(userData?.dDays?.[index]?.date).format("D MMMM, YYYY")}
          </span>

          <p className="block text-center text-lg italic font-medium mb-3">
            This action cannot be undone!
          </p>

          <div className="flex flex-row gap-2 items-center">
            <button
              type="button"
              onClick={() => setDDayDeleteModalVisible(false)}
              className="w-[50%] text-sm font-normal block text-center px-2 py-[8px] rounded-sm active:scale-[97%] mt-1 cursor-pointer bg-white border-2"
              style={{
                color: colors?.primary,
                borderColor: colors?.primary,
              }}
            >
              Cancel
            </button>
            <button
              onClick={deleteDDay}
              className="w-full text-sm font-semibold flex flex-row gap-1 items-center justify-center text-center px-2 py-[8px] rounded-sm active:scale-[97%] mt-1 cursor-pointer text-white border-2"
              style={{
                backgroundColor: colors?.primary,
                borderColor: colors?.primary,
              }}
            >
              Yes, delete it
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default DDayDeleteModal;
