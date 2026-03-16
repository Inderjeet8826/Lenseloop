import { connectDB } from "@/src/lib/mongodb";
import Listing from "@/src/models/Listing";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    await connectDB();

    // 🔐 Get token from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🔐 Verify token
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const body = await req.json();

    // ✅ Attach owner to listing
    const newListing = await Listing.create({
      ...body,
      owner: decoded.userId,
    });

    return NextResponse.json(newListing);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  const listings = await Listing.find().sort({ createdAt: -1 });
  return NextResponse.json(listings);
}