import { connectDB } from "@/lib/connectDB";
import { now } from "moment";
import { NextResponse } from "next/server";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:shahsaminyasar@yahoo.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function GET(req) {
  if (
    !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
    !process.env.VAPID_PRIVATE_KEY
  ) {
    throw new Error("VAPID keys are not defined in environment variables.");
  }

  try {
    const db = await connectDB();
    const usersCollection = db.collection("users");
    const notificationsCollection = db.collection("notifications");

    let targetTimes = [];

    // Get present time at UTC+6
    const nowDateTime = new Date();
    const isBDTime = nowDateTime.getTimezoneOffset() === -360; // BD Time Offset = -360 (UTC+6)
    const now = isBDTime
      ? nowDateTime
      : new Date(nowDateTime.getTime() + 6 * 60 * 60 * 1000);

    // Get all users who have their wake-up-time within the next 15 mins
    for (let i = 0; i < 15; i++) {
      let n = new Date(now.getTime() + i * 60 * 1000);
      let hours = n.getHours().toString().padStart(2, "0");
      let minutes = n.getMinutes().toString().padStart(2, "0");
      targetTimes.push(`${hours}:${minutes}`);
    }

    const targetUsers = await usersCollection
      .find({
        "settings.wakeUpTime": {
          $in: targetTimes,
        },
      })
      .toArray();

    const userUids = targetUsers.map((u) => u.uid);

    const notifiableUsers = await notificationsCollection
      .find({
        uid: {
          $in: userUids,
        },
      })
      .toArray();

    let count = {
      success: 0,
      failed: 0,
    };

    for (const user of notifiableUsers) {
      let subscriptionKeys = user?.keys;
      let userData = targetUsers.filter((u) => u.uid === user.uid);

      for (const sub of subscriptionKeys) {
        try {
          await webpush.sendNotification(
            sub,
            JSON.stringify({
              title: "Rise and Shine!",
              body: `Let's get to work ${userData?.[0]?.name}! Time to own the day.`,
              url: "https://yawmly.vercel.app",
            })
          );
          count.success += 1;
        } catch (error) {
          count.failed += 1;
          console.log("Notification failed: ", error);
        }
      }
    }

    return NextResponse.json({
      ok: true,
      count,
      targetTimes: targetTimes,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: error?.message,
      error,
    });
  }
}
