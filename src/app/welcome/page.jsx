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
        rest: {
          bg: "#f6f6f6",
          text: "#ff914d",
        },
        namaz: {
          bg: "#e67e22",
          text: "#ffffff",
        },
        snack: {
          bg: "#2ecc71",
          text: "#000000",
        },
        nap: {
          bg: "#2980b9",
          text: "#ffffff",
        },
        sleep: {
          bg: "#f1c40f",
          text: "#000000",
        },
        breakfast: {
          bg: "#d35400",
          text: "#ffffff",
        },
        lunch: {
          bg: "#3498db",
          text: "#ffffff",
        },
        dinner: {
          bg: "#e74c3c",
          text: "#ffffff",
        },
        washroom: {
          bg: "#1abc9c",
          text: "#000000",
        },
        bath: {
          bg: "#9b59b6",
          text: "#ffffff",
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
          localStorage.setItem(
            "flags",
            JSON.stringify({
              welcomed: true,
            })
          );
          setUserData(userData);
          setUpdatingUserData(false);
          return router.push("/");
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
