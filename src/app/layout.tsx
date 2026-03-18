import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpsFlow Studio — We build digital that makes you money",
  description:
    "Design-led web & app studio for Australian businesses. Websites, mobile apps, and AI-powered tools that drive real revenue.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
