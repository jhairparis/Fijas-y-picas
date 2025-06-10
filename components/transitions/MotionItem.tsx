import React from "react";
import { motion } from "framer-motion";

interface MotionItemProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

const MotionItem: React.FC<MotionItemProps> = ({
  children,
  className = "",
  duration = 0.5,
}) => {
  const itemVariants = {
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

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration,
        ease: "easeIn",
      }}
      layout
    >
      {children}
    </motion.div>
  );
};

export default MotionItem;
