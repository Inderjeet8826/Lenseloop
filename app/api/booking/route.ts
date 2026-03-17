export const dynamic = "force-dynamic";

import { connectDB } from "@/src/lib/mongodb";
import Booking from "@/src/models/Booking";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const booking = await Booking.create(body);

    return NextResponse.json(booking);

  } catch (error) {
    console.error("BOOKING ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}