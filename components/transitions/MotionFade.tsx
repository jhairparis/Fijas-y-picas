"use client";
import React, { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeProps } from "../../helpers/type";

const MotionFade: FC<FadeProps> = ({ in: isVisible, children, time = 500 }) => {
  const fadeVariants = {
    initial: {
      opacity: 0,
      x: "-100%",
    },
    animate: {
      opacity: 1,
      x: "0%",
    },
    exit: {
      opacity: 0,
      x: "100%",
    },
  };

  const duration = time / 1000; // Convert to seconds

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="fade-content"
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MotionFade;
