import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Registration Portal",
  description: "Turbo monorepo: Next.js app + Express API + Drizzle DB"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
