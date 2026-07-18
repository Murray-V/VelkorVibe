import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Velkor Vibe",
  description: "Multi-Seat Venture OS — starter",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          background: "#0b1020",
          color: "#eef2f9",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
