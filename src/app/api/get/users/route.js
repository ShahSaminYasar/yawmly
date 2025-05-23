import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");
  const aid = searchParams.get("aid");

  if (!uid && !aid)
    return NextResponse.json({
      status: 403,
      message: "Access forbidden",
      ok: false,
    });

  if (!uid && aid && aid !== process.env.NEXT_PUBLIC_ADMIN_AID) {
    return NextResponse.json({
      status: 403,
      message: "Access forbidden",
      ok: false,
    });
  }

  try {
    const db = await connectDB();
    const usersCollection = db.collection("users");

    let res;

    if (uid) {
      res = await usersCollection.find({ _id: new ObjectId(uid) })?.toArray();
    } else {
      res = await usersCollection.find()?.toArray();
    }

    return NextResponse.json({
      ok: true,
      message: `Users data fetched successfully. ${
        uid ? `Queried for UID: ${uid}` : ""
      }`,
      data: res,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error, message: error?.message });
  }
}
