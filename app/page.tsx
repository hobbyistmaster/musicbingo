export default function HomePage() {
  return (
    <div style={{ padding: 40, fontSize: 24 }}>
      <h1>🎵 Music Bingo</h1>
      <p>Homepage is working!</p>

      <a
        href="/host"
        style={{
          display: "inline-block",
          marginTop: 20,
          padding: "12px 20px",
          background: "#00F5A0",
          color: "black",
          borderRadius: 8,
          fontWeight: "bold",
          textDecoration: "none"
        }}
      >
        Host Login
      </a>
    </div>
  );
}
