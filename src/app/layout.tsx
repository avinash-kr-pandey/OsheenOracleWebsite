import type { Metadata } from "next";
import { Charm, Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";

// Fonts
const charm = Charm({
  variable: "--font-charm",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Metadata
export const metadata: Metadata = {
  title: "Osheen Oracle",
  description: "Let The Healing Begin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${charm.variable} ${cormorant.variable} ${montserrat.variable} antialiased`}
      >
        {/* All providers are now inside LayoutWrapper */}
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
