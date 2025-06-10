import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import Header from "./components/Header"; // Import Header
import Footer from "./components/Footer"; // Import Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fijas y Picas - El Juego", // Updated title
  description: "Juega Fijas y Picas online. Adivina el número secreto y reta a tus amigos.", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body className={`${inter.className} flex flex-col min-h-screen`}> {/* Removed overflow-hidden */}
        <Header /> {/* Add Header */}
        <main className="flex-grow pt-20"> {/* Add main wrapper with flex-grow and padding */}
          {children}
        </main>
        <Footer /> {/* Add Footer */}
      </body>
    </html>
  );
}
