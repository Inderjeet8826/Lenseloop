import { connectDB } from "@/src/lib/mongodb";
import Booking from "@/src/models/Booking";
import Listing from "@/src/models/Listing";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/src/components/LogoutButton";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // 🔐 If no token → redirect to login
  if (!token) {
    redirect("/login");
  }

  let userId;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    userId = decoded.userId;
  } catch (error) {
    redirect("/login");
  }

  await connectDB();

  // ✅ Only show logged-in user's listings
  const listings = await Listing.find({ owner: userId }).sort({
    createdAt: -1,
  });

  // ✅ Only show bookings related to this user's listings
  const listingIds = listings.map((l: any) => l._id);

  const bookings = await Booking.find({
    listingId: { $in: listingIds },
  }).sort({ createdAt: -1 });

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <LogoutButton />
      </div>

      {/* Listings */}
      <h2 className="text-2xl font-semibold mb-4">Your Listings</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {listings.map((item: any) => (
          <div
            key={item._id}
            className="bg-gray-900 rounded-xl overflow-hidden"
          >
            {item.image && (
              <img src={item.image} className="h-40 w-full object-cover" />
            )}

            <div className="p-4">
              <h3 className="font-semibold">{item.title}</h3>

              <p className="text-gray-400">₹{item.price}/day</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bookings */}
      <h2 className="text-2xl font-semibold mb-4">Booking Requests</h2>

      <div className="space-y-4">
        {bookings.map((booking: any) => (
          <div key={booking._id} className="bg-gray-900 p-4 rounded-xl">
            <p>
              <strong>Name:</strong> {booking.renterName}
            </p>

            <p>
              <strong>Phone:</strong> {booking.renterPhone}
            </p>

            <p>
              <strong>Message:</strong> {booking.message}
            </p>

            <p className="text-gray-500 text-sm mt-2">
              {new Date(booking.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
