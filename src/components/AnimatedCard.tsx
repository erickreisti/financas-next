// src/components/AnimatedCard.tsx - ATUALIZADO
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedCard = ({
  children,
  className = "",
  delay = 0,
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`animated-card ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface SlideInProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
}

export const SlideIn = ({
  children,
  className = "",
  direction = "left",
}: SlideInProps) => {
  const directionClass = `slide-in-${direction}`;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
        y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${directionClass} ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface StaggerListProps {
  children: ReactNode;
  className?: string;
}

export const StaggerList = ({ children, className = "" }: StaggerListProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={`stagger-list ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = ({ children, className = "" }: StaggerItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`stagger-item ${className}`}
    >
      {children}
    </motion.div>
  );
};
