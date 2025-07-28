import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { email, message } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const [result] = await db
      .insert(contactMessages)
      .values({
        email,
        message,
      })
      .returning({ id: contactMessages.id });

    return NextResponse.json({ success: true, id: result.id }, { status: 201 });
  } catch (err) {
    console.error("Error saving contact message:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
