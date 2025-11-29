"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminHostPage({ params }: { params: { gameId: string } }) {
  const gameId = params.gameId;

  const [shortCode, setShortCode] = useState("");
  const [songs, setSongs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [players, setPlayers] = useState<any[]>([]);
  const [currentSong, setCurrentSong] = useState("");

  // Load game info
  useEffect(() => {
    const loadGame = async () => {
      const { data } = await supabase
        .from("games")
        .select("short_code")
        .eq("id", gameId)
        .single();

      if (data) setShortCode(data.short_code);
    };

    loadGame();
  }, [gameId]);

  // Load songs for this game
  useEffect(() => {
    const loadSongs = async () => {
      const { data } = await supabase
        .from("songs")
        .select("title")
        .eq("game_id", gameId);

      if (data) {
        setSongs(data.map((s) => s.title));
      }
    };

    loadSongs();
  }, [gameId]);

  // Realtime players
  useEffect(() => {
    const loadPlayers = async () => {
      const { data } = await supabase
        .from("players")
        .select("*")
        .eq("game_id", gameId);

      setPlayers(data || []);
    };

    loadPlayers();

    const channel = supabase
      .channel("players_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "players",
          filter: `game_id=eq.${gameId}`,
        },
        () => loadPlayers()
      )
      .subscribe();

    // cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  // Next Song
  const nextSong = async () => {
    if (currentIndex >= songs.length) {
      alert("No more songs left!");
      return;
    }

    const song = songs[currentIndex];
    setCurrentSong(song);
    setCurrentIndex(currentIndex + 1);

    await supabase
      .from("games")
      .update({ current_song: song, reveal: false })
      .eq("id", gameId);
  };

  // Reveal song
  const revealSong = async () => {
    await supabase
      .from("games")
      .update({ reveal: true })
      .eq("id", gameId);
  };

  // Hide song
  const hideSong = async () => {
    await supabase
      .from("games")
      .update({ reveal: false })
      .eq("id", gameId);
  };

  return (
    <div className="p-6 text-white max-w-3xl mx-auto">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">🎤 Admin Host Panel</h1>

        <p className="text-lg mt-3">
          <strong>Game Code:</strong>{" "}
          <span className="text-green-400">{shortCode}</span>
        </p>

        <p className="text-lg">
          <strong>Players:</strong>{" "}
          <span className="text-blue-400">{players.length}</span>
        </p>
      </div>

      {/* Current Song */}
      <div className="mb-6 p-4 rounded border border-purple-400/20 bg-black/40">
        <h2 className="text-xl mb-1">Current Song:</h2>
        <p className="text-2xl text-green-400 font-bold">
          {currentSong || "No song playing yet"}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mb-8">
        <button
          onClick={nextSong}
          className="py-3 bg-blue-500 text-black font-bold rounded shadow shadow-blue-500/40"
        >
          ▶️ Next Song
        </button>

        <button
          onClick={revealSong}
          className="py-3 bg-green-500 text-black font-bold rounded shadow shadow-green-500/40"
        >
          👁 Reveal to Players
        </button>

        <button
          onClick={hideSong}
          className="py-3 bg-yellow-400 text-black font-bold rounded shadow shadow-yellow-400/40"
        >
          🙈 Hide From Players
        </button>
      </div>

      {/* Player List */}
      <div className="bg-black/40 p-4 rounded border border-purple-400/20">
        <h2 className="text-xl mb-3">Players</h2>
        <ul className="space-y-2">
          {players.map((p) => (
            <li key={p.id} className="p-2 bg-black/40 rounded">
              {p.name}
              {p.called_bingo && (
                <span className="text-red-400 font-bold ml-2">BINGO!</span>
              )}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
