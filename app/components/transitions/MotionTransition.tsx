import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MotionTransitionProps {
  show?: boolean;
  appear?: boolean;
  unmount?: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  beforeEnter?: () => void;
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

// Helper function to convert Tailwind classes to Framer Motion values
const parseAnimationClasses = (classes: string) => {
  const classArray = classes.split(" ");
  const result: Record<string, string | number> = {};

  classArray.forEach(cls => {
    if (cls.includes("opacity-")) {
      const value = cls.replace("opacity-", "");
      result.opacity = value === "0" ? 0 : parseFloat(value) / 100;
    } else if (cls.includes("translate-y-")) {
      const value = cls.replace("translate-y-", "");
      if (value.startsWith("-")) {
        result.y = `-${value.slice(1)}`;
      } else {
        result.y = value;
      }
    } else if (cls.includes("translate-x-")) {
      const value = cls.replace("translate-x-", "");
      if (value.startsWith("-")) {
        result.x = `-${value.slice(1)}`;
      } else {
        result.x = value;
      }
    } else if (cls.includes("scale-")) {
      const value = cls.replace("scale-", "");
      result.scale = parseFloat(value) / 100;
    }
  });

  return result;
};

// Extract duration from Tailwind classes
const extractDuration = (classes: string) => {
  const match = classes.match(/duration-(\d+)/);
  return match ? parseInt(match[1]) / 1000 : 0.3; // Default 300ms
};

// Extract easing from Tailwind classes
const extractEasing = (classes: string) => {
  if (classes.includes("ease-in-out")) return "easeInOut";
  if (classes.includes("ease-in")) return "easeIn";
  if (classes.includes("ease-out")) return "easeOut";
  return "easeInOut"; // Default
};

const MotionTransition: React.FC<MotionTransitionProps> = ({
  show = true,
  appear = false,
  unmount = true,
  enter = "",
  enterFrom = "",
  enterTo = "",
  leave = "",
  leaveTo = "",
  beforeEnter,
  children,
  className = "",
  ...rest
}) => {
  // Parse animation values
  const initialValues = parseAnimationClasses(enterFrom);
  const animateValues = parseAnimationClasses(enterTo);
  const exitValues = parseAnimationClasses(leaveTo);

  // Extract timing
  const duration = extractDuration(enter || leave);
  const easing = extractEasing(enter || leave);

  // Create animation variants
  const variants = {
    initial: initialValues,
    animate: animateValues,
    exit: exitValues
  };

  const transition = {
    duration,
    ease: easing
  };

  // Handle beforeEnter callback - moved outside conditional to comply with hooks rules
  React.useEffect(() => {
    if (show && beforeEnter) {
      beforeEnter();
    }
  }, [show, beforeEnter]);

  if (unmount) {
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            className={className}
            variants={variants}
            initial={appear ? "initial" : false}
            animate="animate"
            exit="exit"
            transition={transition}
            {...rest}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={appear ? "initial" : false}
      animate={show ? "animate" : "initial"}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default MotionTransition;
