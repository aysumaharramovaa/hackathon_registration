import { NextResponse } from "next/server";
import dbConnect from "./../../../lib/mongodb"; 
import Registration from "./../../../models/Registration";

export async function POST(req: Request) {
  try {
    console.log("API hit ✅");

    await dbConnect();
    console.log("MongoDB qoşuldu ✅");

    const body = await req.json();
    console.log("Gələn data:", body);

    const newUser = await Registration.create(body);
    console.log("MongoDB-yə yazıldı ✅");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API ERROR ❌", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
