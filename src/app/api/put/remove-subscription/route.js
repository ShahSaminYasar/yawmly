import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { uid, subscription } = await req.json();

    if (!uid || !subscription)
      return NextResponse.json({
        ok: false,
        message: "Not enough data",
      });

    const db = await connectDB();
    const notificationsCollection = db.collection("notifications");

    const res = await notificationsCollection.updateOne(
      { uid },
      {
        $pull: {
          keys: { endpoint: subscription?.endpoint },
        },
      }
    );

    console.log("Remove key res: ", res);

    if (res?.modifiedCount > 0) {
      return NextResponse.json({
        ok: true,
        message: "Subscription key was removed successfully",
      });
    } else {
      return NextResponse.json({
        ok: false,
        message: "Subscription key was not removed",
      });
    }
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: error?.message || "Network Error",
      error,
    });
  }
}
