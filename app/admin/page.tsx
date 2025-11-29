"use client";

import React, { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [rounds, setRounds] = useState(1);
  const [clipLength, setClipLength] = useState(20);
  const [pattern, setPattern] = useState("line");

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Create New Game</h1>

      {/* GAME TITLE */}
      <div className="mb-6">
        <label className="block mb-2 text-sm text-amber-300">Game Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Friday Night Bingo"
          className="w-full p-3 rounded bg-black/40 border border-purple-400/30"
        />
      </div>

      {/* ROUNDS */}
      <div className="mb-6">
        <label className="block mb-2 text-sm text-amber-300">Number of Rounds</label>
        <input
          type="number"
          min="1"
          max="10"
          value={rounds}
          onChange={(e) => setRounds(Number(e.target.value))}
          className="w-full p-3 rounded bg-black/40 border border-purple-400/30"
        />
      </div>

      {/* CLIP LENGTH */}
      <div className="mb-6">
        <label className="block mb-2 text-sm text-amber-300">Clip Length (seconds)</label>
        <input
          type="range"
          min="5"
          max="45"
          value={clipLength}
          onChange={(e) => setClipLength(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-sm mt-1">Clip Length: {clipLength}s</p>
      </div>

      {/* PATTERN */}
      <div className="mb-6">
        <label className="block mb-2 text-sm text-amber-300">Winning Pattern</label>
        <select
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className="w-full p-3 rounded bg-black/40 border border-purple-400/30"
        >
          <option value="line">Line</option>
          <option value="fourcorners">Four Corners</option>
          <option value="outer">Outer Square</option>
          <option value="blackout">Blackout</option>
        </select>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        onClick={() => alert("Game creation not wired yet.")}
        className="w-full py-4 bg-purple-500 text-black font-bold rounded-lg text-lg
          shadow-lg shadow-purple-500/40 active:scale-95 transition"
      >
        Create Game
      </button>
    </div>
  );
}
