"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      // localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl space-y-4 w-96"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          placeholder="Email"
          className="w-full p-3 bg-gray-800 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-800 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button className="w-full bg-white text-black py-3 rounded">
          Login
        </button>
        <div className="text-center text-sm text-gray-400 mt-4">
  Don’t have an account?{" "}
  <a
    href="/signup"
    className="text-white font-medium hover:underline"
  >
    Sign up
  </a>
</div>
      </form>
      
    </div>
    
  );
}
