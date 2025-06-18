import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { PUBLIC_URL_ } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(PUBLIC_URL_),
  title: "Fijas y Picas - Juego de Lógica y Deducción",
  description:
    "Juego clásico de lógica y deducción disponible online. Juega Fijas y Picas en tu navegador y desafía a tus amigos.",
  robots: {
    index: true,
    follow: true,
  },
};

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
