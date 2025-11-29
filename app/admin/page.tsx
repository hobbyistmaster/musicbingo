"use client";

import React, { useEffect, useState } from "react";

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [authorized, setAuthorized] = useState(false);

  // Check saved PIN on load
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("musicbingo_admin_pin");
    if (saved && saved === process.env.NEXT_PUBLIC_HOST_PIN) {
      setAuthorized(true);
      // go straight to setup if already unlocked
      window.location.href = "/setup";
    }
  }, []);

  function submit() {
    if (pin === process.env.NEXT_PUBLIC_HOST_PIN) {
      if (typeof window !== "undefined") {
        localStorage.setItem("musicbingo_admin_pin", pin);
        setAuthorized(true);
        window.location.href = "/setup";
      }
    } else {
      alert("Incorrect PIN");
    }
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
        <div className="w-full max-w-md bg-black/40 p-6 rounded-xl border border-quartersNeon/40 shadow-lg">
          <h1 className="text-3xl font-extrabold mb-4 text-center text-quartersNeon">
            Admin Login
          </h1>

          <p className="text-sm text-amber-200/80 mb-4 text-center">
            Enter your host PIN to manage games.
          </p>

          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            className="w-full p-3 mb-4 rounded-lg bg-black/60 border border-amber-400/40 text-center outline-none focus:border-quartersNeon"
          />

          <button
            onClick={submit}
            className="w-full py-3 rounded-lg font-bold bg-quartersNeon text-black shadow-lg shadow-quartersNeon/40 active:scale-95 transition-transform"
          >
            Unlock Admin Mode
          </button>
        </div>
      </div>
    );
  }

  // If somehow authorized but still on this page, just show a simple message
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <p>Redirecting to setup…</p>
    </div>
  );
}
