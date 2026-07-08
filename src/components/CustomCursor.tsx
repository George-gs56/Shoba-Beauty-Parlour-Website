"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Position of the mouse
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animations for the outer ring trailing effect
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Avoid synchronous state changes to prevent ESLint flags
    const mountTimeout = setTimeout(() => {
      setMounted(true);
    }, 0);

    // Disable cursor on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return () => clearTimeout(mountTimeout);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if mouse is hovering over an interactive element
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(`[role="button"]`) ||
        target.closest(".glass-card") ||
        target.closest(".btn-primary") ||
        target.closest(".btn-secondary");

      if (isInteractive) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.classList.add("custom-cursor-active");

    return () => {
      clearTimeout(mountTimeout);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY]);

  // Prevent SSR/Hydration mismatch: don't render until fully mounted
  if (!mounted) return null;

  // Touch devices don't show the custom cursor
  if (typeof window !== "undefined") {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return null;
  }

  return (
    <>
      {/* 1. Inner dot: Moves immediately with mouse */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "var(--color-gold)",
          pointerEvents: "none",
          zIndex: 99999,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />

      {/* 2. Outer ring: Trails behind with spring elastic motion */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid var(--color-gold)",
          pointerEvents: "none",
          zIndex: 99998,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: hovered ? "0 0 15px rgba(200, 162, 125, 0.4)" : "none",
        }}
        animate={{
          scale: hovered ? 1.8 : 1,
          backgroundColor: hovered ? "rgba(200, 162, 125, 0.08)" : "rgba(200, 162, 125, 0)",
          borderColor: hovered ? "var(--color-gold-hover)" : "var(--color-gold)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />
    </>
  );
}
