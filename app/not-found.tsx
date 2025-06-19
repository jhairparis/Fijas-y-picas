import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/dictionary";

export default async function NotFound() {
  const dict = await getDictionary("en");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fondo gradiente igual al resto del sitio */}
      <div className="fixed inset-0 bg-gradient-to-b from-orange-50 to-amber-50 pointer-events-none -z-10" />
      <Header lang={"en"} dict={dict} />

      <main className="flex-grow pt-20 flex items-center justify-center">
        <div className="relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/5 to-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/5 to-orange-500/5 rounded-full blur-2xl" />

          <div className="relative z-10 text-center p-4 max-w-2xl mx-auto">
            <div className="mb-8">
              <Image
                src="/not found.svg"
                alt="Not Found"
                width={300}
                height={300}
                className="mx-auto mb-8 opacity-80"
              />
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent mb-4">
                {dict.notFound.title}
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-md mx-auto">
                {dict.notFound.description}
              </p>

              <div className="pt-4">
                <Link
                  href={`/en`}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-rose-600 hover:to-amber-600"
                >
                  <svg
                    className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  {dict.notFound.backHome}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer lang={"en"} dict={dict} />
    </div>
  );
}
