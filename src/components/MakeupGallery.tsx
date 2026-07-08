"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./MakeupGallery.module.css";

const galleryItems = [
  {
    id: 1,
    src: "/images/about_bride.jpg",
    label: "Traditional Bridal",
  },
  {
    id: 2,
    src: "/images/about_makeup.jpg",
    label: "Professional Salon Styling",
  },
  {
    id: 3,
    src: "/images/about_glam.jpg",
    label: "High-Glam Evening Look",
  },
  {
    id: 4,
    src: "/images/about_minimalist.jpg",
    label: "Minimalist Glow Makeup",
  },
  // Duplicated for seamless loop
  {
    id: 5,
    src: "/images/about_bride.jpg",
    label: "Traditional Bridal",
  },
  {
    id: 6,
    src: "/images/about_makeup.jpg",
    label: "Professional Salon Styling",
  },
  {
    id: 7,
    src: "/images/about_glam.jpg",
    label: "High-Glam Evening Look",
  },
  {
    id: 8,
    src: "/images/about_minimalist.jpg",
    label: "Minimalist Glow Makeup",
  },
];

export default function MakeupGallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="makeupgallery" className={styles.gallerySection}>
      <div className={styles.sectionHeader}>
        <span className="luxury-subtitle">Portfolio</span>
        <h2 className="luxury-title">
          Our <span>Creations.</span>
        </h2>
        <p className={styles.gallerySubtitle}>
          Real transformations — from traditional bridal to high-fashion looks.
        </p>
      </div>

      {/* Continuous scroll track */}
      <div className={styles.galleryTrackWrapper}>
        {/* Left fade gradient */}
        <div className={styles.fadeLeft} />
        {/* Right fade gradient */}
        <div className={styles.fadeRight} />

        <motion.div
          ref={trackRef}
          className={styles.galleryTrack}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {galleryItems.map((item) => (
            <div key={item.id} className={styles.galleryCard}>
              <div className={styles.imageFrame}>
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="300px"
                  className={styles.galleryImage}
                />
                {/* Label overlay */}
                <div className={styles.labelOverlay}>
                  <span>{item.label}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
