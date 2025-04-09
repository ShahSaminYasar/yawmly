import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const userData = await req.json();

    if (!userData) return null;

    const db = await connectDB();
    const usersCollection = db.collection("users");

    const res = await usersCollection.insertOne(userData);

    if (!res?.insertedId) {
      return NextResponse.json({
        ok: false,
        message: "Failed to add user to the db",
      });
    }

    return NextResponse.json({
      ok: true,
      message: "User was added successfully",
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error, message: error?.message });
  }
}
