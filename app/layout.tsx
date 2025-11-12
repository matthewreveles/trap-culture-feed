import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trap Culture Feed",
  description: "Facebook/Instagram photo feed for Trap Culture",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
