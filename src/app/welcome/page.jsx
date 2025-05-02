"use client";
import Step0 from "@/components/welcome/Step0";
import Step1 from "@/components/welcome/Step1";
import Step2 from "@/components/welcome/Step2";
import { useSettings } from "@/services/SettingsProvider";
import { timeToMinutes } from "@/utils/timeToMinutes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { setUpdatingUserData, setUserData } = useSettings();

  // States
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    settings: {
      wakeUpTime: "",
      tags: {
        study: {
          bg: "#fde4be",
          text: "#ff6302",
        },
        coaching: {
          bg: "#e0f3ff",
          text: "#006eff",
        },
        college: {
          bg: "#eae0ff",
          text: "#d400ff",
        },
        rest: {
          bg: "#fdffdb",
          text: "#ffa200",
        },
        prayer: {
          bg: "#c2ffe2",
          text: "#00b377",
        },
        snacks: {
          bg: "#f8e0ff",
          text: "#9900ff",
        },
        nap: {
          bg: "#3f9fde",
          text: "#ebfcff",
        },
        sleep: {
          bg: "#334f8e",
          text: "#f5f9ff",
        },
        meal: {
          bg: "#ffe0f7",
          text: "#ff42a7",
        },
        washroom: {
          bg: "#c2ffed",
          text: "#00755e",
        },
      },
      preferredTimeFormat: "t",
    },
  });

  // Effetcs
  useEffect(() => {
    document.title = `Welcome — YAWMLY`;
  }, []);

  // Functions
  const nextStep = async () => {
    if (step < 2) {
      setStep((prev) => prev + 1);
    } else {
      try {
        setUpdatingUserData(true);
        let userData = {
          ...formData,
          registeredAt: new Date(),
          plans: [
            {
              title: "Default plan",
              createdOn: new Date(),
              plan: {
                header: ["Time", "Session", "Remarks"],
                rows: [
                  {
                    start: timeToMinutes(formData?.settings?.wakeUpTime),
                    end: timeToMinutes(formData?.settings?.wakeUpTime) + 50,
                    title: "Wake up and get ready",
                    tag: "rest",
                    remarks: {
                      checked: false,
                      note: "",
                    },
                  },
                ],
              },
            },
          ],
          dDays: [],
          selectedPlan: 0,
          selectedDDay: 0,
          lastUpdatedAt: new Date().toISOString(),
        };
        const res = await axios.post("/api/auth/new-user", userData);
        if (res?.data?.ok && res?.data?.uid) {
          userData.uid = res?.data?.uid;
          localStorage.setItem("user", JSON.stringify(userData));
          let localFlags = JSON.parse(localStorage?.getItem("flags")) || {};
          localStorage.setItem(
            "flags",
            JSON.stringify({
              ...localFlags,
              welcomed: true,
            })
          );
          setUserData(userData);
          setUpdatingUserData(false);
          return router.push("/");
        } else {
          setUpdatingUserData(false);
          console.log("Failed to insert new user data - network error");
          return toast.error("Network Error");
        }
      } catch (error) {
        setUpdatingUserData(false);
        console.error(error);
        return toast.error(
          error?.message || "Network error, please try again..."
        );
      }
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const steps = [
    {
      id: "nameInput",
      component: (
        <Step0
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      ),
    },
    {
      id: "wakeUpTimeInput",
      component: (
        <Step1
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
    },
    {
      id: "introPage",
      component: (
        <Step2
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
    },
  ];

  useEffect(() => {
    if (
      status !== "loading" &&
      (session?.user || localStorage?.getItem("user"))
    ) {
      return router.push("/");
    }
  }, [status, session]);

  return steps[step]?.component;
};
export default page;
