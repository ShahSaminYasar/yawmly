import { connectDB } from "@/lib/connectDB";
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
    const keysCollection = db.collection("notifications");

    let res;

    if (uid) {
      res = await keysCollection.findOne({ uid });
    } else {
      res = await keysCollection.find()?.toArray();
    }

    return NextResponse.json({
      ok: true,
      message: `Keys data fetched successfully. ${
        uid ? `Queried for UID: ${uid}` : ""
      }`,
      data: res,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error, message: error?.message });
  }
}
