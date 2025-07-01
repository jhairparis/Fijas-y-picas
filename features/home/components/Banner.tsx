"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiX } from "react-icons/hi";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/types";

interface BannerProps {
  dict: Dictionary;
  lang: Locale;
}

function Banner({ dict }: BannerProps) {
  const [bannerOpen, setBannerOpen] = useState(true);

  return (
    <>
      {bannerOpen && (
        <div className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60">
          <div className="bg-slate-800 text-slate-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
            <div className="text-slate-500 inline-flex">
              <Link
                className="font-medium hover:underline text-emerald-400"
                href={`#`}
              >
                <span className="font-medium hover:no-underline text-slate-50 mr-[0.5px]">
                  {dict.banner.acceptText}{" "}
                </span>
                {dict.banner.cookies}
              </Link>
            </div>
            <button
              className="text-slate-500 hover:text-slate-400 pl-2 ml-3 border-l border-gray-700"
              onClick={() => setBannerOpen(false)}
            >
              <span className="sr-only">{dict.banner.close}</span>
              <HiX
                className="w-4 h-4 shrink-0 fill-current"
                aria-label={dict.banner.close}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
