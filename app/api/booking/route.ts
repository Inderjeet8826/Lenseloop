import { connectDB } from "@/src/lib/mongodb";
import Booking from "@/src/models/Booking";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const booking = await Booking.create(body);

  return NextResponse.json(booking);
}