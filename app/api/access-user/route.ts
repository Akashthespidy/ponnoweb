import { db } from "@/db";
import { waitlistUsers } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("POST body:", body);

    // Validate required fields
    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Allow partial save: only enforce name validation if provided
    if (
      ("firstName" in body || "lastName" in body) &&
      (!body.firstName || !body.lastName)
    ) {
      return NextResponse.json(
        { error: "First name and last name are required" },
        { status: 400 }
      );
    }

    // Insert or update in database with optimized query
    const existingUser = await db
      .select()
      .from(waitlistUsers)
      .where(eq(waitlistUsers.email, body.email))
      .limit(1)
      .then((res) => res[0]);

    let user;
    if (existingUser) {
      // Update existing user
      [user] = await db
        .update(waitlistUsers)
        .set({
          businessName: body.businessName,
          businessCategory: body.businessCategory,
          businessAddress: body.businessAddress,
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
          updatedAt: new Date(),
        })
        .where(eq(waitlistUsers.email, body.email))
        .returning();
    } else {
      // Create new user
      [user] = await db
        .insert(waitlistUsers)
        .values({
          businessName: body.businessName,
          businessCategory: body.businessCategory,
          businessAddress: body.businessAddress,
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phone: body.phone,
        })
        .returning();
    }

    console.log("Saved user:", user);
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error: any) {
    console.error("Error saving to waitlist:", error);

    // Handle unique constraint violation
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "This email is already on the waitlist" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to save to waitlist",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
