"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuBrain, LuGlobe, LuBot } from "react-icons/lu";
import Image from "next/image";
import type { Dictionary } from "@/lib/types";

interface FeaturesProps {
  dict: Dictionary;
}

function Features({ dict }: FeaturesProps) {
  const [tab, setTab] = useState(1);

  const tabsData = [
    {
      id: 1,
      title: dict.features.tabs.ai.title,
      description: dict.features.tabs.ai.description,
      icon: <LuBot />,
      imageSrc: "/images/features-bg-1.png",
      altText: dict.features.tabs.ai.title,
    },
    {
      id: 2,
      title: dict.features.tabs.timers.title,
      description: dict.features.tabs.timers.description,
      icon: <LuBrain />,
      imageSrc: "/images/features-bg-2.png",
      altText: dict.features.tabs.timers.title,
    },
    {
      id: 3,
      title: dict.features.tabs.statistics.title,
      description: dict.features.tabs.statistics.description,
      icon: <LuGlobe />,
      imageSrc: "/images/features-bg-3.png",
      altText: dict.features.tabs.statistics.title,
    },
  ];

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current?.children[tab - 1]) {
      const childElement = tabs.current.children[tab - 1] as HTMLElement;
      tabs.current.style.height = childElement.offsetHeight + "px";
    }
  };

  useEffect(() => {
    heightFix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <section className="relative">
      <span
        className="absolute inset-0 bg-gradient-to-b from-rose-50 via-amber-50 to-orange-50 pointer-events-none"
        aria-hidden="true"
      />

      <span className="absolute top-0 left-1/3 w-72 h-72 bg-gradient-to-r from-rose-400/6 to-amber-400/6 rounded-full blur-3xl" />
      <span className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/8 to-orange-400/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 md:pt-20 pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto text-center pb-16 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase mb-4">
                {dict.features.subtitle}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-rose-900 to-amber-900 bg-clip-text text-transparent mb-6 leading-tight">
                {dict.features.title}
              </h2>
              <div className="text-lg md:text-xl text-gray-600 leading-relaxed space-y-2">
                <p>
                  {dict.features.description}{" "}
                  <span className="font-semibold text-rose-600">
                    fijas y picas online
                  </span>
                  .
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-6 mb-12 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-10"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {dict.features.modern}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {dict.features.modernDescription}
                </p>
              </motion.div>

              <div
                className="space-y-4"
                role="tablist"
                aria-label="Feature tabs"
              >
                {tabsData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <button
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ease-out transform hover:scale-[1.02] group ${
                        tab === item.id
                          ? "bg-gradient-to-r from-rose-50 to-amber-50 border-rose-200 shadow-xl shadow-rose-100/50"
                          : "bg-white border-gray-200 hover:border-rose-300 hover:shadow-lg shadow-sm"
                      }`}
                      onClick={() => setTab(item.id)}
                      role="tab"
                      aria-selected={tab === item.id}
                      aria-controls={`tab-panel-${item.id}`}
                      id={`tab-${item.id}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <div
                            className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                              tab === item.id
                                ? "bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent"
                                : "text-gray-900 group-hover:text-rose-600"
                            }`}
                          >
                            {item.title}
                          </div>
                          <div
                            className={`text-sm leading-relaxed transition-colors duration-300 ${
                              tab === item.id
                                ? "text-gray-700"
                                : "text-gray-600"
                            }`}
                          >
                            {item.description}
                          </div>
                        </div>
                        <div
                          className={`flex justify-center items-center w-12 h-12 rounded-xl shadow-md transition-all duration-300 flex-shrink-0 ${
                            tab === item.id
                              ? "bg-rose-500 text-white shadow-rose-200"
                              : "bg-white text-gray-600 group-hover:bg-rose-50 group-hover:text-rose-600 group-hover:shadow-lg"
                          }`}
                        >
                          <span className="text-lg">{item.icon}</span>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
              >
                <div className="relative" ref={tabs}>
                  <AnimatePresence mode="wait">
                    {tabsData.map(
                      item =>
                        tab === item.id && (
                          <motion.div
                            key={`item-${item.id}`}
                            id={`tab-panel-${item.id}`}
                            role="tabpanel"
                            aria-labelledby={`tab-${item.id}`}
                            className="w-full"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{
                              duration: 0.7,
                              ease: "easeInOut",
                            }}
                            onAnimationStart={() => heightFix()}
                          >
                            <div className="relative inline-flex flex-col">
                              <Image
                                className="md:max-w-none mx-auto rounded"
                                src={item.imageSrc}
                                width={500}
                                height={462}
                                alt={item.altText}
                                priority={item.id === 1}
                              />
                            </div>
                          </motion.div>
                        )
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
