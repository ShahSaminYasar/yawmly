"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa6";
import moment from "moment-timezone";

const page = () => {
  const { data: session, status } = useSession();

  //   States
  const [users, setUsers] = useState([]);
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingNotification, setSendingNotification] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (
      !session ||
      session?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_AID
    ) {
      return redirect("/");
    }

    const getUsers = async () => {
      setLoading(true);
      const res = await axios.get(
        `/api/get/users?aid=${encodeURIComponent(
          process.env.NEXT_PUBLIC_ADMIN_AID
        )}`
      );
      if (res?.data?.ok) {
        setLoading(false);
        setUsers(res?.data?.data);
      } else {
        console.log(res?.data);
        return toast.error(res?.data?.message);
      }
    };

    const getKeys = async () => {
      const res = await axios.get(
        `/api/get/notification-keys?aid=${encodeURIComponent(
          process.env.NEXT_PUBLIC_ADMIN_AID
        )}`
      );
      if (res?.data?.ok) {
        setKeys(res?.data?.data);
      } else {
        console.log(res?.data);
        return toast.error(res?.data?.message);
      }
    };

    getUsers();
    getKeys();
  }, [session]);

  //   Functions
  const notifyUser = async (e) => {
    e.preventDefault();
    setSendingNotification(true);

    const uid = e.target.uid.value;
    const title = e.target.title.value;
    const body = e.target.body.value;
    const url = e.target.url.value;

    // console.log(uid, title, body, url);

    try {
      const res = await axios.post("/api/notifications/custom-notification", {
        uid,
        title,
        body,
        url,
      });

      if (res?.data?.ok) {
        setSendingNotification(false);
        return toast.success(
          res?.data?.message || "Notifications sent successfully"
        );
      } else {
        setSendingNotification(false);
        return toast.error(res?.data?.message || "Operation failed");
      }
    } catch (error) {
      setSendingNotification(false);
      console.error(error);
      return toast.error(error?.message || "Unknown/Network error");
    }
  };

  return (
    <section className="w-full flex flex-col gap-3 items-start text-slate-700 text-sm font-medium py-6 fade">
      <h4 className="text-2xl font-medium block text-center w-full fade mb-2">
        All Users ({users?.length})
      </h4>

      <div className="w-full flex flex-col gap-5 items-center lg:justify-center lg:flex-row lg:items-start lg:gap-1">
        {loading ? (
          <div className="w-full py-20 flex items-center justify-center">
            <span className="loading loading-spinner loading-sm text-slate-900"></span>
          </div>
        ) : (
          <div className="w-full max-w-2xl mx-auto h-[60vh] overflow-auto border border-slate-200">
            <table
              className="table-fixed font-medium text-[10px] sm:text-[12px] text-slate-600"
              cellSpacing={0}
            >
              <thead className="bg-slate-800 text-white text-[12px] w-full sticky top-0 left-0">
                <tr>
                  <th>Name</th>
                  <th>Registered</th>
                  <th>Last Online</th>
                  <th>🔔</th>
                  <th>UID</th>
                </tr>
              </thead>

              <tbody>
                {users?.map((user) => (
                  <tr
                    key={user?.uid || user?._id}
                    className="even:bg-slate-100 border-b border-b-slate-100"
                  >
                    <td className="p-2 w-full text-center">
                      <div className="flex flex-col gap-0 items-center">
                        <span>{user?.name}</span>
                        <span className="text-[9px] text-slate-500 block max-w-[100px] overflow-x-scroll">
                          {user?.email}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 min-w-[70px] sm:min-w-[100px] text-slate-600 text-center">
                      {moment
                        .tz(user?.registeredAt, "Asia/Dhaka")
                        .format("HH:mm, DD/MM/YYYY")}
                    </td>
                    <td className="p-2 min-w-[70px] sm:min-w-[100px] text-slate-600 text-center">
                      {moment
                        .tz(user?.lastUpdatedAt, "Asia/Dhaka")
                        .format("HH:mm, DD/MM/YYYY")}
                    </td>
                    <td className="p-2 min-w-[50px] text-center">
                      {keys?.filter(
                        (k) => k?.uid === user?.uid || k?.uid === user?._id
                      )?.length > 0
                        ? "✅"
                        : "❌"}
                    </td>
                    <td className="p-2 min-w-[50px] text-center">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(user?.uid || user?._id);
                          return toast("Copied", { icon: "📋" });
                        }}
                        className="cursor-pointer text-slate-700 text-lg"
                      >
                        <FaCopy />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="my-6 w-[98%] h-[1px] bg-slate-200 lg:hidden"></div>

        <div className="w-full">
          <form
            onSubmit={notifyUser}
            className="w-full max-w-[420px] mx-auto p-4 rounded-lg shadow-sm bg-white text-xs font-medium text-slate-700 flex flex-col gap-3 items-center"
          >
            <h4 className="text-2xl font-medium block text-left">
              Send Notification
            </h4>
            <input
              type="text"
              name="uid"
              placeholder="UID of user"
              className="input input-sm w-full"
            />
            <input
              type="text"
              name="title"
              required
              placeholder="Notification title"
              className="input input-sm w-full"
            />
            <textarea
              name="body"
              placeholder="Notification body"
              rows={5}
              className="textarea textarea-sm w-full resize-y"
            ></textarea>
            <input
              type="text"
              name="url"
              placeholder="Redirect URL"
              className="input input-sm w-full"
            />
            <button
              type="submit"
              className="w-full rounded-sm shadow py-2 px-3 text-center font-semibold bg-slate-800 text-white cursor-pointer disabled:opacity-50 active:scale-95 duration-100"
              disabled={sendingNotification}
            >
              {sendingNotification ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default page;
