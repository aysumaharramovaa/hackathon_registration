import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.email || !body.university) {
      return NextResponse.json(
        { message: "Zəhmət olmasa bütün sahələri doldurun" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("hackathon_registration");
    const result = await db.collection("registrations").insertOne(body);

    return NextResponse.json({
      message: "Qeydiyyat uğurludur 🎉",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Xəta baş verdi" },
      { status: 500 }
    );
  }
}
