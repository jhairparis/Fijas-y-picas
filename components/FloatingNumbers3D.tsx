"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const FloatingNumbers3D = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const numbersData = useMemo(() => {
    if (!isClient)
      return { numbers: [], floatingNumbers: [], depthNumbers: [] };

    return {
      numbers: Array.from({ length: 12 }, (_, i) => ({
        id: i,
        value: Math.floor(Math.random() * 10),
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
        scale: 0.8 + Math.random() * 0.8,
      })),

      floatingNumbers: Array.from({ length: 8 }, (_, i) => ({
        id: i + 12,
        value: Math.floor(Math.random() * 10),
        x: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 6 + Math.random() * 3,
        scale: 1 + Math.random() * 0.5,
      })),

      depthNumbers: Array.from({ length: 5 }, (_, i) => ({
        id: i + 20,
        value: Math.floor(Math.random() * 10),
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 10 + Math.random() * 5,
        scale: 0.5 + Math.random() * 0.7,
      })),
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {numbersData.numbers.map((num) => (
        <div
          key={num.id}
          className="absolute"
          style={{ left: `${num.x}%`, top: `${num.y}%` }}
        >
          <motion.div
            className="relative text-rose-600/80 font-bold select-none z-10"
            initial={{
              opacity: 0,
              y: 100,
              rotateX: 0,
              rotateY: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: [0, 0.8, 1, 0.8, 0],
              y: [-100, -50, 0, 50, 100],
              rotateX: [0, 180, 360],
              rotateY: [0, 180, 360],
              scale: [0.5, num.scale, num.scale * 1.2, num.scale, 0.5],
            }}
            transition={{
              duration: num.duration,
              delay: num.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              fontSize: `${num.scale * 3}rem`,
              transformStyle: "preserve-3d",
              textShadow: `
                2px 2px 4px rgba(225, 29, 72, 0.6),
                -1px -1px 2px rgba(190, 18, 60, 0.4),
                -2px -2px 4px rgba(190, 18, 60, 0.3),
                -3px -3px 6px rgba(190, 18, 60, 0.2)
              `,
              filter: "drop-shadow(0 2px 8px rgba(225, 29, 72, 0.4))",
            }}
          >
            {num.value}
          </motion.div>
        </div>
      ))}

      {/* Números flotantes verticales optimizados */}
      {numbersData.floatingNumbers.map((num) => (
        <div key={num.id} className="absolute" style={{ left: `${num.x}%` }}>
          <motion.div
            className="relative text-orange-500/70 font-extrabold select-none z-10"
            initial={{
              opacity: 0,
              y: "100vh",
              rotateZ: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 0.6, 0.8, 0.6, 0],
              y: ["-10vh", "-50vh", "-100vh"],
              rotateZ: [0, 360],
              scale: [0, num.scale, num.scale * 1.1, 0],
              x: [0, Math.sin(num.id) * 50, Math.cos(num.id) * 30],
            }}
            transition={{
              duration: num.duration,
              delay: num.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              fontSize: `${num.scale * 2}rem`,
              transformStyle: "preserve-3d",
              // Efecto 3D optimizado con CSS
              textShadow: `
                2px 2px 6px rgba(249, 115, 22, 0.6),
                -1px -1px 3px rgba(234, 88, 12, 0.4),
                -2px -2px 6px rgba(234, 88, 12, 0.3)
              `,
              filter: "drop-shadow(0 2px 8px rgba(249, 115, 22, 0.4))",
            }}
          >
            {num.value}
          </motion.div>
        </div>
      ))}

      {/* Números con efecto de profundidad optimizados */}
      {numbersData.depthNumbers.map((num) => (
        <div
          key={num.id}
          className="absolute"
          style={{ left: `${num.x}%`, top: `${num.y}%` }}
        >
          <motion.div
            className="relative text-amber-600/60 font-black select-none z-10"
            initial={{
              opacity: 0,
              scale: 0,
              rotateX: -90,
              z: -100,
            }}
            animate={{
              opacity: [0, 0.7, 0.9, 0.7, 0],
              scale: [0, num.scale, num.scale * 1.3, num.scale, 0],
              rotateX: [-90, 0, 90, 180, 270],
              rotateY: [0, 180, 360],
              z: [-100, 0, 100, 0, -100],
            }}
            transition={{
              duration: num.duration,
              delay: num.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              fontSize: `${num.scale * 3.5}rem`,
              perspective: "1000px",
              transformStyle: "preserve-3d",
              // Efecto 3D más pronunciado con CSS optimizado
              textShadow: `
                3px 3px 12px rgba(217, 119, 6, 0.7),
                -2px -2px 6px rgba(180, 83, 9, 0.5),
                -4px -4px 12px rgba(180, 83, 9, 0.4),
                -6px -6px 18px rgba(180, 83, 9, 0.3)
              `,
              filter: "drop-shadow(0 4px 12px rgba(217, 119, 6, 0.5))",
            }}
          >
            {num.value}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default FloatingNumbers3D;
