"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles as SparklesIcon } from "lucide-react";
import Image from "next/image";
import styles from "./Hero.module.css";

const heroImages = [
  { src: "/images/about_makeup.jpg", alt: "Professional Makeup Styling" },
  { src: "/images/about_glam.jpg", alt: "High-Glam Evening Look" },
  { src: "/images/about_bride.jpg", alt: "Traditional Bridal Transformation" },
  { src: "/images/about_minimalist.jpg", alt: "Minimalist Glow Makeup" }
];

const sparkles = [
  { top: "12%", left: "18%", size: 6, delay: 0, duration: 3.5 },
  { top: "28%", left: "82%", size: 8, delay: 1.2, duration: 4.8 },
  { top: "72%", left: "15%", size: 5, delay: 0.6, duration: 3.2 },
  { top: "84%", left: "78%", size: 7, delay: 1.8, duration: 4.2 },
  { top: "48%", left: "88%", size: 9, delay: 2.4, duration: 3.8 },
  { top: "58%", left: "22%", size: 5, delay: 0.9, duration: 4.5 },
];

export default function Hero() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // range -10 to 10
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section id="home" className={styles.heroSection} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Background Glow Orbs */}
      <div
        className="glow-orb"
        style={{
          width: "400px",
          height: "400px",
          top: "10%",
          right: "10%",
          background: "rgba(200, 162, 125, 0.08)",
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: "300px",
          height: "300px",
          bottom: "10%",
          left: "5%",
          background: "rgba(230, 184, 162, 0.06)",
        }}
      />
      {/* 3D Floating Background Shapes */}
      <div className={styles.floating3DBg}>
        {/* Layer 1: Far Depth Layer (translateZ -120px) */}
        <motion.div
          className={styles.shapeLayerFar}
          style={{
            transform: `rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg) translateZ(-120px)`,
          }}
        >
          <div className={`${styles.bgShape} ${styles.shape1}`} />
          <div className={`${styles.bgShape} ${styles.shape2}`} />
        </motion.div>

        {/* Layer 2: Mid Depth Layer (translateZ -60px) */}
        <motion.div
          className={styles.shapeLayerMid}
          style={{
            transform: `rotateY(${mousePosition.x * 0.8}deg) rotateX(${-mousePosition.y * 0.8}deg) translateZ(-60px)`,
          }}
        >
          <div className={`${styles.bgShape} ${styles.shape3}`} />
          <div className={`${styles.bgShape} ${styles.shape4}`} />
        </motion.div>

        {/* Layer 3: Close Depth Layer (translateZ 30px) */}
        <motion.div
          className={styles.shapeLayerFore}
          style={{
            transform: `rotateY(${mousePosition.x * 1.2}deg) rotateX(${-mousePosition.y * 1.2}deg) translateZ(30px)`,
          }}
        >
          <div className={`${styles.bgShape} ${styles.shape5}`} />
          <div className={`${styles.bgShape} ${styles.shape6}`} />
        </motion.div>
      </div>

      <div className={styles.heroContainer}>
        {/* Left Column: Typography Content */}
        <motion.div
          className={styles.heroTextContent}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.tagline}>
            <SparklesIcon size={14} className={styles.tagIcon} />
            <span>The Sanctuary of Rejuvenation</span>
          </div>

          <h1 className={styles.mainTitle}>
            Science of Skin, <br />
            <span>Art of Beauty.</span>
          </h1>

          <p className={styles.description}>
            Enter a world of bespoke luxury. At Shoba Beauty Parlour, we blend natural botanicals, 
            clinical science, and artistic hair & makeup styling to reveal your true radiance.
          </p>

          <div className={styles.actionButtons}>
            <a href="#booking" className="btn-primary">
              Book Appointment <ArrowRight size={16} />
            </a>
            <a href="#services" className="btn-secondary">
              View Menu
            </a>
          </div>

          {/* Micro Stats / Highlights */}
          <div className={styles.highlights}>
            <div className={styles.highlightItem}>
              <span className={styles.highlightVal}>98%</span>
              <span className={styles.highlightLabel}>Natural Botanicals</span>
            </div>
            <div className={styles.highlightDivider} />
            <div className={styles.highlightItem}>
              <span className={styles.highlightVal}>12+</span>
              <span className={styles.highlightLabel}>Years of Excellence</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Premium CSS/Framer Motion Beauty Animation */}
        <motion.div
          className={styles.heroCanvasContainer}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
            transition: "transform 0.1s ease-out"
          }}
        >
          <div className={styles.compositionWrapper}>
            {/* Ambient gold glow */}
            <div className={styles.glowAura} />

            {/* Elegant rotating rings */}
            <div className={styles.spinningRing} />
            <div className={styles.spinningRingOuter} />

            {/* Left botanical illustration */}
            <svg
              className={`${styles.botanicalDecor} ${styles.botanicalDecorLeft}`}
              width="100"
              height="150"
              viewBox="0 0 100 150"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M10 140 Q 50 80 80 10 Q 55 50 30 90 Z" />
              <path d="M35 100 Q 60 75 75 40 Q 55 60 45 80 Z" />
              <path d="M15 125 Q 35 110 50 85 Q 35 95 25 110 Z" />
            </svg>

            {/* Right botanical illustration */}
            <svg
              className={`${styles.botanicalDecor} ${styles.botanicalDecorRight}`}
              width="100"
              height="150"
              viewBox="0 0 100 150"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M90 140 Q 50 80 20 10 Q 45 50 70 90 Z" />
              <path d="M65 100 Q 40 75 25 40 Q 45 60 55 80 Z" />
              <path d="M85 125 Q 65 110 50 85 Q 65 95 75 110 Z" />
            </svg>

            {/* Gold sparkles floating around */}
            {sparkles.map((spark, idx) => (
              <motion.div
                key={idx}
                className={styles.goldSparkle}
                style={{
                  top: spark.top,
                  left: spark.left,
                  width: spark.size,
                  height: spark.size,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: spark.duration,
                  repeat: Infinity,
                  delay: spark.delay,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Central Luxury Arch Mirror Slideshow */}
            <div className={styles.slideshowContainer}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImgIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  style={{ width: "100%", height: "100%", position: "relative" }}
                >
                  <Image
                    src={heroImages[currentImgIndex].src}
                    alt={heroImages[currentImgIndex].alt}
                    fill
                    sizes="(max-width: 768px) 280px, 320px"
                    priority
                    style={{ objectFit: "cover" }}
                  />
                  {/* Subtle luxurious overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to bottom, transparent 60%, rgba(7, 7, 7, 0.4) 100%)",
                      pointerEvents: "none"
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Elegant Bottom Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className={styles.scrollText}>Scroll to Explore</span>
        <div className={styles.scrollLine}>
          <motion.div
            className={styles.scrollDot}
            animate={{ y: [0, 24, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
