import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { uid } = await req.json();

    const db = await connectDB();
    const usersCollection = db.collection("users");

    const res = await usersCollection.updateOne(
      { _id: new ObjectId(uid) },
      {
        $set: {
          lastUpdatedAt: new Date().toISOString(),
        },
      }
    );

    // console.log(uid, res);

    if (res?.modifiedCount === 0) {
      return NextResponse.json({
        ok: false,
        message: "Failed to update last seen",
      });
    }

    return NextResponse.json({
      ok: true,
      message: "User's last seen updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: error?.message || "Network error",
    });
  }
}
