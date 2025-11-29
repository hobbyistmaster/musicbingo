"use client";

export default function PlayerPage({ params }) {
  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold">Player Page</h1>
      <p>Game ID: {params.gameId}</p>
    </div>
  );
}
