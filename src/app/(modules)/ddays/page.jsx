"use client";
import DDayAddModal from "@/components/main/DDayAddModal";
import DDayCard from "@/components/main/DDayCard";
import DDayDeleteModal from "@/components/main/DDayDeleteModal";
import DDayEditModal from "@/components/main/DDayEditModal";
import { useSettings } from "@/services/SettingsProvider";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";

const page = () => {
  const { userData, colors, setUserData } = useSettings();

  // States
  const [dDayAddModalVisible, setDDayAddModalVisible] = useState(false);
  const [dDayEditModalVisible, setDDayEditModalVisible] = useState(false);
  const [editingDDayData, setEditingDDayData] = useState({
    index: 0,
    name: "",
    date: "",
    bgColor: "",
    textColor: "",
  });
  const [dDayDeleteModalVisible, setDDayDeleteModalVisible] = useState(false);
  const [deletingDDayIndex, setDeletingDDayIndex] = useState(0);

  //   Functions
  const editDDay = (setAsActive = false) => {
    let { index, name, date, bgColor, textColor } = editingDDayData;

    let updatedDDay = {
      name,
      date,
      bgColor,
      textColor,
    };

    const newDDays = userData?.dDays?.map((d, i) =>
      i === index ? updatedDDay : d
    );

    const updatedUserData = {
      ...userData,
      dDays: newDDays,
      selectedDDay: setAsActive ? index : userData?.selectedDDay,
    };

    setUserData({ ...updatedUserData });
    setDDayEditModalVisible(false);
    return toast.success("D-Day updated");
  };

  return (
    <>
      <section className="flex flex-row gap-6 justify-center flex-wrap">
        {userData?.dDays?.map((dDay, index) => (
          <DDayCard
            key={`${dDay?.name}_${index}`}
            dDay={dDay}
            index={index}
            setEditingDDayData={setEditingDDayData}
            setDDayEditModalVisible={setDDayEditModalVisible}
            setDDayDeleteModalVisible={setDDayDeleteModalVisible}
            setDeletingDDayIndex={setDeletingDDayIndex}
          />
        ))}
      </section>

      <button
        className="px-3 py-3 text-white rounded-xl flex justify-center items-center gap-1 shadow-sm fixed bottom-5 right-5 text-sm cursor-pointer active:scale-[96%]"
        style={{
          background: `linear-gradient(45deg, ${colors?.primary}, ${colors?.accent})`,
        }}
        onClick={() => setDDayAddModalVisible(true)}
      >
        <FaPlus /> Add D-Day
      </button>

      <DDayAddModal
        dDayAddModalVisible={dDayAddModalVisible}
        setDDayAddModalVisible={setDDayAddModalVisible}
      />

      <DDayEditModal
        dDayEditModalVisible={dDayEditModalVisible}
        setDDayEditModalVisible={setDDayEditModalVisible}
        editingDDayData={editingDDayData}
        setEditingDDayData={setEditingDDayData}
        editDDay={editDDay}
      />

      <DDayDeleteModal
        dDayDeleteModalVisible={dDayDeleteModalVisible}
        setDDayDeleteModalVisible={setDDayDeleteModalVisible}
        index={deletingDDayIndex}
      />
    </>
  );
};
export default page;
