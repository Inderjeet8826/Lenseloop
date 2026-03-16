"use client";

import { useState } from "react";

export default function BookingPage({ params }: any) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listingId: params.id,
        renterName: form.name,
        renterPhone: form.phone,
        message: form.message,
      }),
    });

    alert("Booking request sent 🔥");
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Request Booking
        </h1>

        <input
          placeholder="Your name"
          className="w-full p-3 bg-gray-800 rounded"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Phone number"
          className="w-full p-3 bg-gray-800 rounded"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <textarea
          placeholder="Message"
          className="w-full p-3 bg-gray-800 rounded"
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <button className="w-full bg-white text-black py-3 rounded">
          Send Request
        </button>
      </form>
    </main>
  );
}