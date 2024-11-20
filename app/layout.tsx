import type { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";

// GOOGLE FONT
const quicksand = Quicksand({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Auth Demo",
  description: "Auth Demo by Ii",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // className="dark"
    <html lang="en">
      <body className={`${quicksand.className}`}>{children}</body>
    </html>
  );
}
