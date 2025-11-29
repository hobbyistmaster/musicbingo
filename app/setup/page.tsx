"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SetupPage() {
  const [title, setTitle] = useState("");
  const [prize, setPrize] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("0");
  const [clip, setClip] = useState(15);
  const [rounds, setRounds] = useState(1);
  const [pattern, setPattern] = useState("line");
  const [showArtist, setShowArtist] = useState(false);
  const [songs, setSongs] = useState([]);

  const [loading, setLoading] = useState(false);

  function generateShortCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  async function createGame() {
    if (!title || songs.length < 25) {
      alert("Enter a title and AT LEAST 25 songs.");
      return;
    }

    setLoading(true);

    const shortCode = generateShortCode();

    // CREATE GAME
    const { data: game, error } = await supabase
      .from("games")
      .insert([
        {
          title,
          prize,
          genre,
          price,
          clip,
          rounds,
          pattern,
          show_artist: showArtist,
          short_code: shortCode,
          current_song: "",
          reveal: false,
        },
      ])
      .select()
      .single();

    if (error) {
      alert("Error creating game: " + error.message);
      setLoading(false);
      return;
    }

    // INSERT SONGS
    const songRows = songs.map((t) => ({
      game_id: game.id,
      title: t,
    }));

    const { error: songError } = await supabase
      .from("songs")
      .insert(songRows);

    setLoading(false);

    if (songError) {
      alert("Songs failed: " + songError.message);
      return;
    }

    // REDIRECT TO ADMIN
    window.location.href = `/admin/game/${game.id}`;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-xl mx-auto">

      <h1 className="text-4xl font-extrabold text-center mb-6 text-quartersNeon">
        Create New Game
      </h1>

      {/* Title */}
      <div className="mb-4">
        <label className="text-sm">Game Title</label>
        <input
          className="w-full p-2 text-black rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="80s Night"
        />
      </div>

      {/* Prize */}
      <div className="mb-4">
        <label className="text-sm">Prize</label>
        <input
          className="w-full p-2 text-black rounded"
          value={prize}
          onChange={(e) => setPrize(e.target.value)}
          placeholder="Free Drink"
        />
      </div>

      {/* Genre */}
      <div className="mb-4">
        <label className="text-sm">Genre / Theme</label>
        <input
          className="w-full p-2 text-black rounded"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="80s / 90s / Country"
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="text-sm">Price Per Round</label>
        <input
          className="w-full p-2 text-black rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0"
        />
      </div>

      {/* Clip Length */}
      <div className="mb-4">
        <label className="text-sm">Clip Length (seconds)</label>
        <select
          className="w-full p-2 text-black rounded"
          value={clip}
          onChange={(e) => setClip(Number(e.target.value))}
        >
          {[10, 15, 20, 25, 30, 35, 40, 45].map((sec) => (
            <option key={sec} value={sec}>
              {sec} seconds
            </option>
          ))}
        </select>
      </div>

      {/* Rounds */}
      <div className="mb-4">
        <label className="text-sm">Number of Rounds</label>
        <input
          type="number"
          className="w-full p-2 text-black rounded"
          value={rounds}
          onChange={(e) => setRounds(Number(e.target.value))}
        />
      </div>

      {/* Pattern */}
      <div className="mb-4">
        <label className="text-sm">Winning Pattern</label>
        <select
          className="w-full p-2 text-black rounded"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        >
          <option value="line">Line</option>
          <option value="4corners">Four Corners</option>
          <option value="outside">Outside Square</option>
        </select>
      </div>

      {/* Show Artist Checkbox */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={showArtist}
          onChange={() => setShowArtist(!showArtist)}
        />
        <label>Show artist on player cards?</label>
      </div>

      {/* Song List */}
      <div className="mb-6">
        <label className="text-sm">Song List (1 per line)</label>
        <textarea
          className="w-full p-2 text-black rounded h-48"
          value={songs.join("\n")}
          onChange={(e) =>
            setSongs(
              e.target.value
                .split("\n")
                .map((s) => s.trim())
                .filter((s) => s.length > 0)
            )
          }
          placeholder={"Billie Jean\nTake On Me\nAfrica\n..."}
        />
      </div>

      {/* Create Game Button */}
      <button
        onClick={createGame}
        disabled={loading}
        className="bg-green-500 text-black py-3 rounded font-bold w-full active:scale-95 transition"
      >
        {loading ? "Creating..." : "Create Game"}
      </button>
    </div>
  );
}
