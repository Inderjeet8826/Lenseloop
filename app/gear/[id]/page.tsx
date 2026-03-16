import { connectDB } from "@/src/lib/mongodb";
import Listing from "@/src/models/Listing";

export default async function GearDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();

  const item = await Listing.findById(id);

  console.log("this is the item comming from db"+item)
  

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-10">
        Gear not found
      </div>
    );
  }
  

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="rounded-2xl w-full h-[400px] object-cover"
          />
        )}

        <div>
          <h1 className="text-4xl font-bold">{item.title}</h1>

          <p className="text-gray-400 mt-2">{item.location}</p>

          <p className="mt-6 text-lg">{item.description}</p>

          <p className="mt-6 text-2xl font-bold">₹{item.price} / day</p>
          <a
  href={`https://wa.me/91${item.ownerPhone?.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hi, I want to rent your ${item.title} listed on LensLoop`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 block text-center bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600"
>
  Contact on WhatsApp
</a>
          <a
            href={`/book/${item._id}`}
            className="mt-6 block text-center bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200"
          >
            Request Booking
          </a>
        </div>
      </div>
    </main>
  );
}
