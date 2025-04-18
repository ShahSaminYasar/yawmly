import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { uid, subscription } = await req.json();

    const db = await connectDB();
    const notificationsCollection = db.collection("notifications");

    let user = await notificationsCollection.findOne({
      uid,
    });

    if (user && Array.isArray(user?.keys)) {
      if (
        user.keys.filter((k) => k?.endpoint === subscription?.endpoint)
          ?.length > 0
      )
        return NextResponse.json({
          ok: false,
          message: "Subscription already present",
        });
      user.keys = [...user?.keys, subscription];
    } else {
      user = {
        uid,
        keys: [subscription],
      };
    }

    const { _id, ...userNotificationData } = user;

    const res = await notificationsCollection.replaceOne(
      { uid },
      userNotificationData,
      { upsert: true }
    );

    console.log("RES: ", res);

    if (res?.modifiedCount > 0 || res?.upsertedCount > 0) {
      return NextResponse.json({
        ok: true,
        message: "Subscription saved successfully",
        uid,
        subscription,
      });
    }

    return NextResponse.json({
      ok: false,
      message:
        "Failed to update subscription data, please check network connection and try again",
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: error?.message || "Unknown error occured",
    });
  }
}
