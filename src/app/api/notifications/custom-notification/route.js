import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:shahsaminyasar@yahoo.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function POST(req) {
  if (
    !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
    !process.env.VAPID_PRIVATE_KEY
  ) {
    throw new Error("VAPID keys are not defined in environment variables.");
  }

  try {
    const { uid, title, body, url } = await req.json();

    if (!title)
      return NextResponse.json({
        ok: false,
        message: "Not enough data provided",
      });

    const db = await connectDB();
    const notificationsCollection = db.collection("notifications");

    let targetKeyHolders;

    if (uid) {
      targetKeyHolders = await notificationsCollection.find({ uid }).toArray();
    } else {
      targetKeyHolders = await notificationsCollection.find().toArray();
    }

    if (uid && (!targetKeyHolders || targetKeyHolders.length === 0))
      return NextResponse.json({
        ok: false,
        message: "User doesn't have any subscription yet",
      });

    let count = {
      success: 0,
      failed: 0,
    };

    for (const user of targetKeyHolders) {
      for (const key of user.keys) {
        try {
          await webpush.sendNotification(
            key,
            JSON.stringify({
              title,
              body: body || "",
              url: url || "https://yawmly.vercel.app",
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
      message: `Sent ${count.success} successfully and ${count?.failed} failed`,
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
