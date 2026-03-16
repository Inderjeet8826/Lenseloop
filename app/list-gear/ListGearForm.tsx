"use client";

import { useState } from "react";

export default function ListGear() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
    image: null as File | null,
    ownerPhone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.image) {
      alert("Please select image");
      return;
    }

    try {
      // upload to cloudinary
      const imageData = new FormData();
      imageData.append("file", form.image);
      imageData.append("upload_preset", "lensloop");

      const cloudRes = await fetch(
        "https://api.cloudinary.com/v1_1/dgcna8k5m/image/upload",
        {
          method: "POST",
          body: imageData,
        },
      );

      const cloudData = await cloudRes.json();

      console.log("Cloudinary response:", cloudData);

      if (!cloudData.secure_url) {
        alert("Image upload failed");
        return;
      }

      // save listing to DB
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          price: Number(form.price),
          location: form.location,
          description: form.description,
          image: cloudData.secure_url,
          ownerPhone: form.ownerPhone, // 👈 ADD THIS
        }),
      });

      if (res.ok) {
        alert("Listing added successfully 🔥");

        setForm({
          title: "",
          price: "",
          location: "",
          description: "",
          image: null,
          ownerPhone: "",
        });
      } else {
        alert("Database save failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred");
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">
          List Your Camera Gear
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Gear Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
              placeholder="Canon EOS R6"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Price Per Day (₹)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
              placeholder="2500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
              placeholder="South Delhi"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Upload image
            </label>
            <input
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.files?.[0] ?? null,
                })
              }
            />
          </div>
          <div>
  <label className="block mb-2 text-sm text-gray-400">
    WhatsApp Number
  </label>

  <input
    type="text"
    placeholder="9876543210"
    value={form.ownerPhone}
    className="w-full p-3 bg-gray-800 rounded"
    onChange={(e) =>
      setForm({
        ...form,
        ownerPhone: e.target.value.replace(/\D/g, ""),
      })
    }
  />
</div>
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
              placeholder="Describe condition, usage, accessories included..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200"
          >
            Submit Listing
          </button>
        </form>
      </div>
    </main>
  );
}
