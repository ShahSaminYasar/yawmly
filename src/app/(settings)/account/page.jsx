"use client";
import AuthPage from "@/components/auth/AuthPage";
import { useSettings } from "@/services/SettingsProvider";
import moment from "moment";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaInstagram } from "react-icons/fa6";
import { GoFile, GoGlobe, GoMail, GoSignOut } from "react-icons/go";

const page = () => {
  const { userData, setLogoutModalVisible, colors, setUserData } =
    useSettings();
  const { status, data: session } = useSession();

  // States
  const [nameEditFormVisible, setNameEditFormVisible] = useState(false);

  // Effects
  useEffect(() => {
    document.title = `Account — YAWMLY`;
  }, []);

  return status === "authenticated" ? (
    <section className="w-full flex flex-col gap-3 items-start text-slate-700 text-sm font-medium py-6 fade">
      <h3
        className="text-2xl font-semibold"
        style={{
          color: colors?.accent,
        }}
      >
        ACCOUNT INFO
      </h3>

      <p className="flex flex-wrap items-center gap-1 whitespace-nowrap">
        You are currently logged in as:{" "}
        <span className="font-semibold whitespace-nowrap">
          {userData?.name}{" "}
          <button
            onClick={() => setNameEditFormVisible((prev) => !prev)}
            className="inline-block ml-1 text-[10px] font-light underline text-slate-400 cursor-pointer"
          >
            Edit name
          </button>
        </span>
      </p>

      {nameEditFormVisible && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setUserData((prev) => ({
              ...prev,
              name: e.target?.name?.value,
            }));
            setNameEditFormVisible(false);
            return toast.success("Name updated");
          }}
          className="flex flex-row w-full max-w-[300px] items-center gap-2"
        >
          <input
            type="text"
            name="name"
            className="input input-md input-bordered text-sm"
            placeholder="Your full name"
            defaultValue={userData?.name}
            required
            style={{
              borderColor: colors?.primary,
              outlineColor: colors?.primary,
            }}
          />
          <button
            type="submit"
            className="px-2 py-2 cursor-pointer whitespace-nowrap text-white text-xs font-medium rounded-sm"
            style={{
              backgroundColor: colors?.primary,
            }}
          >
            Save
          </button>
        </form>
      )}

      <p>
        Connected email:{" "}
        <span className="font-semibold">
          {session?.user?.email}{" "}
          {userData?.password?.includes("google-oauth:") && "(Google Account)"}
        </span>
      </p>

      {navigator.onLine ? (
        <p className="block pt-5 mt-2 border-t border-slate-200 w-full font-semibold text-green-500">
          <span className="not-italic">✅</span> Data synced! Log in on any
          device to view your plans.
        </p>
      ) : (
        <p className="block pt-5 mt-2 border-t border-slate-200 w-full font-semibold text-yellow-500">
          <span className="not-italic">☁</span> Offline mode active. Your
          changes will be synced automatically when an internet connection is
          detected.
        </p>
      )}

      <span className="text-slate-500 text-xs font-normal -mb-2">
        {moment().format("hh:mma, D MMMM YYYY")}
      </span>
      <span className="text-slate-500 text-xs font-normal">
        Account created on:{" "}
        {moment(userData?.registeredAt).format("D MMMM YYYY [at] hh:mma")}
      </span>

      <div className="w-full my-2 py-4 border-y border-y-slate-300 text-xs text-slate-600">
        <p className="text-sm mt-2">Want to know the story behind Yawmly?</p>
        <Link
          href={"/devlog"}
          className="flex w-fit rounded-xl px-3 py-2 shadow-sm bg-slate-100 text-slate-500 border border-slate-500 font-medium items-center gap-1 mt-2 mb-4"
        >
          <GoFile className="text-sm" /> Read the Devlog
        </Link>

        <p className="text-sm">
          👋 If you have any questions, feedback, or encounter any bugs in the
          app, feel free to reach out through any of the following:{" "}
        </p>

        <div
          className="flex flex-col gap-1 font-medium my-2"
          style={{
            color: colors?.primary,
          }}
        >
          <Link href={"mailto:shahsaminyasar@yahoo.com"} target="_blank">
            <GoMail className="text-sm inline-block mr-1" />{" "}
            shahsaminyasar@email.com
          </Link>
          <Link href={"https://shahsaminyasar.vercel.app"} target="_blank">
            <GoGlobe className="text-sm inline-block mr-1" />{" "}
            shahsaminyasar.vercel.app
          </Link>
          <Link href={"https://instagram.com/shah_samin_yasar"} target="_blank">
            <FaInstagram className="text-sm inline-block mr-1" />{" "}
            instagram.com/shah_samin_yasar
          </Link>
        </div>
      </div>

      <button
        onClick={() => setLogoutModalVisible(true)}
        className="bg-red-500 text-white text-xs rounded-md font-medium active:scale-[92%] cursor-pointer px-3 py-2 flex items-center gap-1"
      >
        LOGOUT <GoSignOut />
      </button>
    </section>
  ) : (
    <AuthPage />
  );
};
export default page;
