import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fijas y Picas – El juego de lógica y deducción definitivo",
  description:
    "Descubre fijas y picas, el clásico juego de adivinanza que lleva más de un siglo poniendo a prueba la mente. Juega picas y fijas online gratis desde cualquier dispositivo.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
