"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-10">
      
      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-4 text-quartersNeon drop-shadow-[0_0_10px_#c084fc]">
        🎵 Music Bingo
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-amber-200/80 mb-10 text-center max-w-xl">
        Fast • Fun • Interactive music bingo for your bar, venue, or party.
        Pick a mode below to get started!
      </p>

      {/* Button Grid */}
      <div className="grid grid-cols-1 gap-5 w-full max-w-sm">
        
        <a
          href="/setup"
          className="
            bg-purple-500 hover:bg-purple-400 
            text-black font-bold py-4 rounded-xl text-center 
            shadow-lg shadow-purple-500/40 transition-transform active:scale-95
          "
        >
          🎵 Create New Game
        </a>

        <a
          href="/host"
          className="
            bg-green-400 hover:bg-green-300 
            text-black font-bold py-4 rounded-xl text-center 
            shadow-lg shadow-green-400/40 transition-transform active:scale-95
          "
        >
          🖥 Host Login
        </a>

        <a
          href="/play"
          className="
            bg-yellow-300 hover:bg-yellow-200 
            text-black font-bold py-4 rounded-xl text-center 
            shadow-lg shadow-yellow-300/40 transition-transform active:scale-95
          "
        >
          🎫 Join Game
        </a>
      </div>

      {/* Footer */}
      <p className="mt-14 text-xs text-neutral-500">
        © {new Date().getFullYear()} Music Bingo • Powered by Quarters
      </p>
    </div>
  );
}
