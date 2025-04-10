"use client";
import PlanAddModal from "@/components/main/PlanAddModal";
import PlanCard from "@/components/main/PlanCard";
import { useSettings } from "@/services/SettingsProvider";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const page = () => {
  const { userData, colors } = useSettings();

  // States
  const [plans, setPlans] = useState([]);
  const [planAddModalVisible, setPlanAddModalVisible] = useState(false);

  // Effects
  useEffect(() => {
    setPlans(userData?.plans || []);
  }, [userData]);

  return (
    <>
      <section className="flex flex-row gap-6 justify-center flex-wrap">
        {plans?.map((plan, index) => (
          <PlanCard key={`${plan?.title}_${index}`} plan={plan} index={index} />
        ))}
      </section>

      <button
        className="px-3 py-3 text-white rounded-xl flex justify-center items-center gap-1 shadow-sm fixed bottom-5 right-5 text-sm cursor-pointer active:scale-[96%]"
        style={{
          background: `linear-gradient(45deg, ${colors?.primary}, ${colors?.accent})`,
        }}
        onClick={() => setPlanAddModalVisible(true)}
      >
        <FaPlus /> Add new plan
      </button>

      <PlanAddModal
        planAddModalVisible={planAddModalVisible}
        setPlanAddModalVisible={setPlanAddModalVisible}
      />
    </>
  );
};
export default page;
