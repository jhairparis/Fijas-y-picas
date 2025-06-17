import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

// Metadata básico y neutro para el layout raíz
export const metadata: Metadata = {
  title: "Fijas y Picas",
  description: "Classic logic and deduction game online",
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://fijasypicas.jhairparis.com"),
};

// Root layout - required by Next.js
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
