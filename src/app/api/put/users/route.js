import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    let data = await req.json();

    if (data._id) delete data._id;

    const db = await connectDB();
    const usersCollection = db.collection("users");

    const res = await usersCollection.replaceOne(
      { _id: new ObjectId(data?.uid) },
      data
    );

    if (res?.modifiedCount === 0) {
      console.log(res);
      return NextResponse.json({
        ok: false,
        message: "Failed to update document",
      });
    }

    return NextResponse.json({
      ok: true,
      message: "User's data was updated successfully",
      uid: data?.uid,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      message: error?.message,
    });
  }
}
