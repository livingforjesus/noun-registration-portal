import type { Metadata } from "next";

import "./globals.css";
import { Source_Sans_3 } from "next/font/google";

import { type FC } from "react";

import { Providers } from "@/app/_components/providers";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NOUN Registration Portal",
  description: "Application and Student Management System",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body className={sourceSans.className}>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
