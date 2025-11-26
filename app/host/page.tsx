"use client";

import React, { useState, useEffect } from "react";

export default function HostLoginPage() {
  const [pin, setPin] = useState("");
  const correctPin = process.env.NEXT_PUBLIC_HOST_PIN || "1234";

  // If already logged in → go straight to setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("musicbingo_host_pin");
      if (saved === correctPin) {
        window.location.href = "/setup";
      }
    }
  }, []);

  function submit() {
    if (pin === correctPin) {
      localStorage.setItem("musicbingo_host_pin", pin);
      window.location.href = "/setup";
    } else {
      alert("Incorrect PIN");
    }
  }

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 400,
        margin: "50px auto",
        background: "#111",
        color: "white",
        borderRadius: 12,
      }}
    >
      <h2 style={{ fontSize: 28, marginBottom: 20 }}>Host Login</h2>

      <input
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter Host PIN"
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 20,
          borderRadius: 8,
        }}
      />

      <button
        onClick={submit}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          background: "#00F5A0",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Unlock Host Mode
      </button>
    </div>
  );
}
