export default function HomePage() {
  return (
    <div className="text-center p-10 text-white">
      <h1 className="text-4xl font-bold mb-4">Music Bingo</h1>

      <p className="text-xl mb-8">Welcome! Choose an option below:</p>

      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <a
          href="/setup"
          className="py-3 rounded bg-blue-500 text-black font-bold"
        >
          🎵 Create a New Game
        </a>

        <a
          href="/host"
          className="py-3 rounded bg-green-500 text-black font-bold"
        >
          🖥 Host Login
        </a>

        <a
          href="/play"
          className="py-3 rounded bg-yellow-500 text-black font-bold"
        >
          🎫 Join a Game
        </a>
      </div>
    </div>
  );
}
