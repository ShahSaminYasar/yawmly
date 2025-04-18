import { connectDB } from "@/lib/connectDB";
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

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;

    const targetUsers = await usersCollection
      .find({ "settings.wakeUpTime": currentTime })
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
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: error?.message,
      error,
    });
  }
}
