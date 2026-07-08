"use client";

import { motion } from "framer-motion";
import { ArrowUp, Instagram, Facebook, Youtube } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Column 1: Brand Info */}
          <div className={styles.footerBrand}>
            <span className={styles.logoTitle}>SHOBA</span>
            <span className={styles.logoSubtitle}>Beauty Parlour</span>
            <p className={styles.brandDesc}>
              A luxury beauty parlour specializing in exquisite bridal makeup, occasion styling, 
              high-end skincare, and premium hair couture. Perfected by artistry.
            </p>
            <div className={styles.socials}>
              <a href="https://www.instagram.com/shobajeni/reels/" target="_blank" className={styles.socialLink} aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://www.youtube.com/@shobajeni" target="_blank" className={styles.socialLink} aria-label="Youtube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Hours */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Opening Hours</h4>
            <div className={styles.hoursList}>
              <div className={styles.hoursRow}>
                <span>Monday - Friday</span>
                <strong>09:00 AM - 08:00 PM</strong>
              </div>
              <div className={styles.hoursRow}>
                <span>Saturday</span>
                <strong>07:00 AM - 08:00 PM</strong>
              </div>
              <div className={styles.hoursRow}>
                <span>Sunday</span>
                <strong className={styles.closed}>Booking Only</strong>
              </div>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Address Details:</h4>
            <address className={styles.addressBlock}>
              <p>KTM Nagar, Elathagiri RD, Palepalle</p>
              <p>Krishnagiri, Tamil Nadu 635108</p>
              <p style={{ marginTop: "15px" }}>
                <span>Phone:</span> +91 9994062045
              </p>
              <p>
                <span>Email:</span> shoba-parlour@gmail.com
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Line */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Shoba Beauty Parlour LLC. All rights reserved. Made with love for premium bridal aesthetics.
          </p>

          <motion.button
            onClick={scrollToTop}
            className={styles.scrollTopBtn}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
