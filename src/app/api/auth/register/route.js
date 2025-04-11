import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const userData = await req.json();

    const { uid, name, email, password } = userData;

    if (!uid || !name || !email || !password)
      return NextResponse.json({
        ok: false,
        message: "Not enough data",
      });

    const db = await connectDB();
    const usersCollection = db.collection("users");

    const checkForExistingAccount = await usersCollection.findOne({ email });

    if (checkForExistingAccount)
      return NextResponse.json({
        ok: false,
        message: "An account with this email already exists, please login",
        email,
      });

    if (!ObjectId.isValid(uid))
      return NextResponse.json({
        ok: false,
        message: "Invalid uid",
      });

    const dataSet = await usersCollection.findOne({ _id: new ObjectId(uid) });

    if (!dataSet)
      return NextResponse.json({
        ok: false,
        message: "No dataset with this UID found",
      });

    if (dataSet?.email)
      return NextResponse.json({
        ok: false,
        message: "Dataset is already registered to an email",
      });

    let { _id, ...updatedUserData } = dataSet;

    updatedUserData = {
      ...updatedUserData,
      name,
      email,
      password,
      uid: _id,
    };

    const res = await usersCollection.replaceOne(
      { _id: new ObjectId(uid) },
      updatedUserData
    );

    if (!res?.modifiedCount > 0) {
      return NextResponse.json({
        ok: false,
        message: "Failed to update user data",
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Email connected successfully",
      uid,
      email,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error, message: error?.message });
  }
}
