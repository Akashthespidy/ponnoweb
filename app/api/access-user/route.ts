import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, businessName, businessCategory, businessDescription } = await req.json();
    if (!email || !businessName || !businessCategory || !businessDescription) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    // TODO: Add Drizzle/Neon DB logic here when ready
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
} 