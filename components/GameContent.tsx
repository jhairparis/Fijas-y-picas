"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuBrain, LuGlobe, LuBot, LuPlay } from "react-icons/lu";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/types";

interface GameContentProps {
  lang: Locale;
  dict: Dictionary;
}

export default function GameContent({ lang, dict }: GameContentProps) {
  const gameOptions = [
    {
      id: "hvh",
      route: "humano-humano",
      title: dict.gameMode?.humanVsHuman || "Humano vs Humano",
      description:
        dict.gameMode?.humanVsHumanDesc ||
        "Juega contra otro jugador en modo local",
      icon: LuBrain,
      color: "from-purple-600 to-blue-500",
      hoverColor: "hover:from-purple-700 hover:to-blue-600",
    },
    {
      id: "hvm",
      route: "maquina-pistas",
      title: dict.gameMode?.humanVsMachine || "Humano vs Máquina",
      description:
        dict.gameMode?.humanVsMachineDesc ||
        "Enfréntate a la inteligencia artificial",
      icon: LuBot,
      color: "from-blue-600 to-cyan-500",
      hoverColor: "hover:from-blue-700 hover:to-cyan-600",
    },
    {
      id: "mvh",
      route: "maquina-adivina",
      title: dict.gameMode?.machineGuesses || "Máquina Adivina",
      description:
        dict.gameMode?.machineGuessesDesc ||
        "La máquina intenta adivinar tu número",
      icon: LuBot,
      color: "from-green-600 to-teal-500",
      hoverColor: "hover:from-green-700 hover:to-teal-600",
    },
    {
      id: "torneo",
      route: "torneo",
      title: dict.gameMode?.onlineTournament || "Torneo Online",
      description:
        dict.gameMode?.onlineTournamentDesc ||
        "Compite contra jugadores de todo el mundo",
      icon: LuGlobe,
      color: "from-pink-500 to-orange-400",
      hoverColor: "hover:from-pink-600 hover:to-orange-500",
      disabled: true,
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background gradients consistent with site design */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-orange-50 via-rose-50 to-amber-50 pointer-events-none"
        aria-hidden="true"
      />

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-rose-400/8 to-amber-400/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/6 to-orange-400/6 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 md:pt-20 pb-16 md:pb-20">
          {/* Header section */}
          <div className="max-w-4xl mx-auto text-center pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase mb-4">
                {dict.gameContent.subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-rose-900 to-amber-900 bg-clip-text text-transparent mb-8 leading-tight">
                {dict.gameContent.title}
              </h1>
              <p
                className="text-xl md:text-2xl text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: dict.gameContent.description,
                }}
              />
            </motion.div>
          </div>

          {/* Quick Rules Banner - Optimized for new position */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-r from-rose-600 to-amber-600 rounded-3xl p-6 md:p-8 text-white text-center shadow-2xl mb-8"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-bold mb-3">
                {dict.gameContent.callToAction.title}
              </h2>
              <p className="text-base md:text-lg opacity-90 mb-4 leading-relaxed">
                {dict.gameContent.callToAction.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <span className="text-sm font-semibold">
                    {dict.gameContent.callToAction.fixedHint}
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <span className="text-sm font-semibold">
                    {dict.gameContent.callToAction.picasHint}
                  </span>
                </div>
              </div>
              <Link
                className="inline-block bg-white text-rose-600 hover:text-rose-700 px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 hover:shadow-xl hover:scale-105"
                href="/como-jugar"
              >
                {dict.gameContent.callToAction.detailedInstructions}
              </Link>
            </div>
          </motion.div>

          {/* Game mode selection */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                {dict.gameMode?.selectGameMode || "Selecciona un modo de juego"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gameOptions.map((option, index) => {
                  const IconComponent = option.icon;

                  if (option.disabled) {
                    return (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="relative p-6 rounded-2xl border-2 border-gray-200 bg-gray-50 opacity-75"
                      >
                        <div className="flex items-center justify-center mb-4">
                          <IconComponent className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-500 text-center mb-2">
                          {option.title}
                        </h3>
                        <p className="text-gray-400 text-center text-sm mb-4">
                          {option.description}
                        </p>
                        <div className="text-center">
                          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                            {dict.gameMode?.comingSoon || "Próximamente"}
                          </span>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={`/${lang}/jugar/${option.route}`}
                        className={`block p-6 rounded-2xl border-2 border-transparent bg-gradient-to-br ${option.color} ${option.hoverColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 group`}
                      >
                        <div className="flex items-center justify-center mb-4">
                          <IconComponent className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <h3 className="text-xl font-bold text-center mb-2">
                          {option.title}
                        </h3>
                        <p className="text-white/90 text-center text-sm mb-4">
                          {option.description}
                        </p>
                        <div className="flex items-center justify-center">
                          <LuPlay className="w-5 h-5 mr-2" />
                          <span className="font-semibold">
                            {dict.gameMode?.playNow || "Jugar ahora"}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Information section - Interactive Timeline Design */}
          <div className="max-w-6xl mx-auto mt-16">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mb-12"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-amber-500/10 rounded-full blur-3xl" />
                <h2 className="relative text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent mb-4">
                  {dict.gameContent.information.heroSection.title}
                </h2>
              </div>
              <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <p
                  className="text-lg text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html:
                      dict.gameContent.information.heroSection.description,
                  }}
                />
              </div>
            </motion.div>

            {/* Interactive Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Benefit Card 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-purple-200/50"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🧠</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {dict.gameContent.information.benefits.mentalPower.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {
                      dict.gameContent.information.benefits.mentalPower
                        .description
                    }
                  </p>
                </div>
              </motion.div>

              {/* Benefit Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-amber-200/50"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {dict.gameContent.information.benefits.precision.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {
                      dict.gameContent.information.benefits.precision
                        .description
                    }
                  </p>
                </div>
              </motion.div>

              {/* Benefit Card 3 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="group relative overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-rose-200/50 md:col-span-2 lg:col-span-1"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-rose-400/20 to-pink-400/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {dict.gameContent.information.benefits.mentalAgility.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {
                      dict.gameContent.information.benefits.mentalAgility
                        .description
                    }
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Game Modes - Timeline/Accordion Style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-12"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                  {dict.gameContent.information.gameModes.title}
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {dict.gameContent.information.gameModes.subtitle}
                </p>
              </div>

              <div className="space-y-6">
                {/* Classic Mode - Expanded Layout */}
                <div className="relative overflow-hidden bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl border border-purple-200/30">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500"></div>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <LuBrain className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-2xl font-bold text-gray-900">
                            {
                              dict.gameContent.information.gameModes.classic
                                .title
                            }
                          </h4>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                            {
                              dict.gameContent.information.gameModes.classic
                                .popularBadge
                            }
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {
                            dict.gameContent.information.gameModes.classic
                              .description
                          }
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-lg border border-purple-200">
                            {
                              dict.gameContent.information.gameModes.classic
                                .features.players
                            }
                          </span>
                          <span className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-lg border border-purple-200">
                            {
                              dict.gameContent.information.gameModes.classic
                                .features.strategy
                            }
                          </span>
                          <span className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-lg border border-purple-200">
                            {
                              dict.gameContent.information.gameModes.classic
                                .features.realTime
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Mode - Compact Layout */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl border border-emerald-200/30">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-500"></div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                          <LuBot className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">
                            {
                              dict.gameContent.information.gameModes
                                .humanVsMachine.title
                            }
                          </h4>
                          <span className="text-sm text-emerald-600 font-medium">
                            {
                              dict.gameContent.information.gameModes
                                .humanVsMachine.subtitle
                            }
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                        {
                          dict.gameContent.information.gameModes.humanVsMachine
                            .description
                        }
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded border border-emerald-200">
                          {
                            dict.gameContent.information.gameModes
                              .humanVsMachine.features.ai
                          }
                        </span>
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded border border-emerald-200">
                          {
                            dict.gameContent.information.gameModes
                              .humanVsMachine.features.practice
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-200/30">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-orange-500"></div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                          <LuBot className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">
                            {
                              dict.gameContent.information.gameModes
                                .machineVsHuman.title
                            }
                          </h4>
                          <span className="text-sm text-amber-600 font-medium">
                            {
                              dict.gameContent.information.gameModes
                                .machineVsHuman.subtitle
                            }
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                        {
                          dict.gameContent.information.gameModes.machineVsHuman
                            .description
                        }
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs rounded border border-amber-200">
                          {
                            dict.gameContent.information.gameModes
                              .machineVsHuman.features.reverse
                          }
                        </span>
                        <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs rounded border border-amber-200">
                          {
                            dict.gameContent.information.gameModes
                              .machineVsHuman.features.algorithms
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tournament Mode - Special Layout */}
                <div className="relative overflow-hidden bg-gradient-to-r from-rose-500/5 to-pink-500/5 rounded-2xl border border-rose-200/30">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500 to-pink-500"></div>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg relative">
                          <LuGlobe className="w-10 h-10 text-white" />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-yellow-800 text-xs font-bold">
                              !
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-2xl font-bold text-gray-900">
                            {
                              dict.gameContent.information.gameModes.tournament
                                .title
                            }
                          </h4>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                            {
                              dict.gameContent.information.gameModes.tournament
                                .comingSoonBadge
                            }
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {
                            dict.gameContent.information.gameModes.tournament
                              .description
                          }
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-200">
                            {
                              dict.gameContent.information.gameModes.tournament
                                .features.global
                            }
                          </span>
                          <span className="px-3 py-1 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-200">
                            {
                              dict.gameContent.information.gameModes.tournament
                                .features.elimination
                            }
                          </span>
                          <span className="px-3 py-1 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-200">
                            {
                              dict.gameContent.information.gameModes.tournament
                                .features.rankings
                            }
                          </span>
                        </div>
                        <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-4 border border-rose-200">
                          <p className="text-sm text-rose-700 mb-2">
                            <strong>
                              {
                                dict.gameContent.information.gameModes
                                  .tournament.collaboration.title
                              }
                            </strong>
                          </p>
                          <p className="text-sm text-gray-600 mb-3">
                            {
                              dict.gameContent.information.gameModes.tournament
                                .collaboration.description
                            }
                          </p>
                          <a
                            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            href="https://github.com/IllustriousLoop/Fijas-y-picas"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>👨‍💻</span>
                            {
                              dict.gameContent.information.gameModes.tournament
                                .collaboration.buttonText
                            }
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          {/*x*/}
        </div>
      </div>
    </section>
  );
}
