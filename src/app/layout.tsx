import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shoba Beauty Parlour | Luxury Skincare, Makeup & Styling",
  description: "Experience premium bridal makeup, organic beauty therapies, and professional styling at Shoba Beauty Parlour. Book your luxury personalized consultation.",
  keywords: ["beauty salon", "skincare clinic", "bridal makeup", "hair stylist", "Shoba beauty parlour"],
  authors: [{ name: "Shoba Beauty Parlour Team" }],
};

import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
