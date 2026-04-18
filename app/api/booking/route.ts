export const dynamic = "force-dynamic";

import { connectDB } from "@/src/lib/mongodb";
import Booking from "@/src/models/Booking";
import Listing from "@/src/models/Listing";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const listingId = String(body?.listingId || "").trim();
    const renterName = String(body?.renterName || "").trim();
    const renterPhone = String(body?.renterPhone || "")
      .replace(/\D/g, "")
      .trim();
    const message = String(body?.message || "").trim();

    if (!listingId || !renterName || !renterPhone || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (renterName.length > 100 || renterPhone.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { error: "Invalid booking details" },
        { status: 400 }
      );
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    const booking = await Booking.create({
      listingId,
      listingTitle: listing.title,
      renterName,
      renterPhone,
      message,
    });

    return NextResponse.json(booking);

  } catch (error) {
    console.error("BOOKING ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
