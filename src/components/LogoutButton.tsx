"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
  );
}