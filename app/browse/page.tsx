import { connectDB } from "@/src/lib/mongodb";
import Listing from "@/src/models/Listing";
import Link from "next/link";

export default async function Browse() {
  await connectDB();
  const listings = await Listing.find().sort({ createdAt: -1 });

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        Available Gear in Delhi NCR
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {listings.map((item: any) => (
          <div
            key={item._id}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="p-6">
              <img src={item.image} className="h-56 w-full object-cover rounded-md" />
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-400 mt-2">{item.location}</p>
              <p className="mt-4 text-lg font-bold">₹{item.price} / day</p>
              {/* View Details Button */}
              <Link
                href={`/gear/${item._id}`}
                className="mt-4 block text-center bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
