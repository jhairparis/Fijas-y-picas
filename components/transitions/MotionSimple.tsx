"use client";
import React, { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeProps } from "@/types/game";

const MotionSimple: FC<FadeProps> = ({
  in: isVisible,
  children,
  time = 300,
}) => {
  const simpleVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const duration = time / 1000; // Convert to seconds

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={simpleVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration,
            ease: "easeIn",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MotionSimple;
