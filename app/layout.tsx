import "./globals.css";

export const metadata = {
  title: "Music Bingo",
  description: "Music Bingo powered by Quarters",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
