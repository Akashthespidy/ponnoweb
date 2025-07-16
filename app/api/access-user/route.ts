import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { accessUsers } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { email, businessName, businessCategory, businessDescription } =
      await req.json();
    if (!email || !businessName || !businessCategory || !businessDescription) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }
    await db.insert(accessUsers).values({
      email,
      businessName,
      businessCategory,
      businessDescription,
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
