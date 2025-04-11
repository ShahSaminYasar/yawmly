import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const db = await connectDB();
    const usersCollection = db.collection("usersTest");

    const res = usersCollection.insertOne(data);

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error, message: error?.message });
  }
}
