import { connectDB } from "@/src/lib/mongodb";
import Booking from "@/src/models/Booking";
import Listing from "@/src/models/Listing";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const listings = await Listing.find(
      { owner: decoded.userId },
      { _id: 1 }
    );
    const listingIds = listings.map((listing) => String(listing._id));

    const bookings = await Booking.find({
      listingId: { $in: listingIds },
    }).sort({ createdAt: -1 });

    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
