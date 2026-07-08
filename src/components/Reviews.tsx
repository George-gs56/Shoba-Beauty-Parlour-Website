"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Reviews.module.css";

const reviews = [
  {
    id: 1,
    name: "Priya Ramasubramanian",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    text: "Shoba Beauty Parlour-ல் என் திருமண மேக்கப் மிகவும் அழகாக இருந்தது! அவர்கள் என் சருமத்தை புரிந்து கொண்டு பாரம்பரிய மணப்பெண் தோற்றத்தை அசாத்தியமாக செய்தார்கள். மனமார்ந்த நன்றி!",
    service: "Traditional Bridal Makeup",
    avatar: "PR",
  },
  {
    id: 2,
    name: "Karthika Subramaniam",
    location: "Coimbatore, Tamil Nadu",
    rating: 5,
    text: "Shoba Beauty Parlour என்னுடைய நிச்சயதார்த்த நாளில் அருமையாக மேக்கப் செய்தார்கள். என் கணவர் மட்டுமில்லாமல் எல்லோரும் பாராட்டினார்கள். நிச்சயமாக மீண்டும் வருவேன்!",
    service: "Engagement & Roka Makeup",
    avatar: "KS",
  },
  {
    id: 3,
    name: "Deepika Venkataraman",
    location: "Madurai, Tamil Nadu",
    rating: 5,
    text: "I've been coming to Shoba Beauty Parlour for the past 3 years now. The team is incredibly talented and always understands exactly what I want. My Diwali party makeup looked absolutely stunning!",
    service: "Festive & Party Makeup",
    avatar: "DV",
  },
  {
    id: 4,
    name: "Ananya Krishnamurthy",
    location: "Salem, Tamil Nadu",
    rating: 5,
    text: "Best bridal makeup in Tamil Nadu, period! My HD Bridal Makeup lasted the entire day from morning pooja to the reception at midnight. Not a single touch-up needed. The artists are highly professional.",
    service: "HD Bridal Makeup",
    avatar: "AK",
  },
  {
    id: 5,
    name: "Meenakshi Sundaram",
    location: "Trichy, Tamil Nadu",
    rating: 5,
    text: "The minimalist makeup Shoba's team did for my corporate headshots was exactly what I needed — natural, glowing, and very professional. My LinkedIn profile photo has never looked better!",
    service: "Corporate & Headshot Makeup",
    avatar: "MS",
  },
  {
    id: 6,
    name: "Revathi Nagarajan",
    location: "Tirunelveli, Tamil Nadu",
    rating: 5,
    text: "My bridesmaid makeup was so beautifully done! The team matched it perfectly with the bride's look. Everyone kept complimenting me throughout the wedding. Thank you Shoba Beauty Parlour!",
    service: "Bridesmaid Makeup",
    avatar: "RN",
  },
  {
    id: 7,
    name: "Lavanya Chandrasekaran",
    location: "Erode, Tamil Nadu",
    rating: 5,
    text: "Had my Mehendi and Sangeet makeup done here and it was festive, vibrant, and lasted all night through all the dance performances! The flowers they styled in my hair were gorgeous.",
    service: "Mehendi & Sangeet Makeup",
    avatar: "LC",
  },
  {
    id: 8,
    name: "Gayathri Balakrishnan",
    location: "Vellore, Tamil Nadu",
    rating: 5,
    text: "Airbrush bridal makeup was something I always wanted to try, and Shoba Beauty Parlour delivered beyond my expectations. Even in the summer heat, my makeup stayed intact for 18+ hours. Truly magical work!",
    service: "Airbrush Bridal Makeup",
    avatar: "GB",
  },
  {
    id: 9,
    name: "Soundarya Rajesh",
    location: "Madurai, Tamil Nadu",
    rating: 5,
    text: "Enakkaga romba beautiful-ah bridal makeup panni kuduthanga. Ellarume enna romba paaratunanga. Shoba beauty parlour thaan best!",
    service: "Traditional Bridal Makeup",
    avatar: "SR",
  },
  {
    id: 10,
    name: "Pooja Srinivasan",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    text: "Sariyo thappo en skin type-ah ketu, organic elixirs use panni super-ah styling pannanga. Service romba professional-ah irundhathu!",
    service: "Airbrush Bridal Makeup",
    avatar: "PS",
  },
  {
    id: 11,
    name: "Janani Karthik",
    location: "Coimbatore, Tamil Nadu",
    rating: 5,
    text: "My engagement makeup was absolutely gorgeous. Makeup natural-ah irundhuchu, heavy-ah theriyala. Thank you so much team Shoba!",
    service: "Engagement & Roka Makeup",
    avatar: "JK",
  },
];

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [cardWidth, setCardWidth] = useState(340);
  const [gap, setGap] = useState(24);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 640) {
        setItemsToShow(1);
        setCardWidth(290);
        setGap(15);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
        setCardWidth(340);
        setGap(20);
      } else {
        setItemsToShow(3);
        setCardWidth(340);
        setGap(24);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsToShow);
  const safeIndex = Math.min(activeIndex, maxIndex);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Peeking calculations
  const blockWidth = itemsToShow * cardWidth + (itemsToShow - 1) * gap;
  const centerOffset = windowWidth / 2 - blockWidth / 2;
  const offset = -safeIndex * (cardWidth + gap);
  const xPosition = offset + centerOffset;

  const leftConstraint = -(maxIndex * (cardWidth + gap)) + centerOffset;
  const rightConstraint = centerOffset;

  return (
    <section id="reviews" className="section" style={{ backgroundColor: "var(--color-bg-deep)", overflow: "hidden" }}>
      <div
        className="glow-orb"
        style={{
          width: "350px",
          height: "350px",
          top: "20%",
          left: "-8%",
          background: "rgba(200, 162, 125, 0.05)",
        }}
      />

      <div className="container" style={{ position: "relative" }}>
        {/* Header without navigation controls */}
        <div className={styles.sectionHeader}>
          <div className="luxury-title-container" style={{ marginBottom: 0 }}>
            <span className="luxury-subtitle">Client Stories</span>
            <h2 className="luxury-title">
              Real <span>Reviews.</span>
            </h2>
            <p style={{ color: "var(--color-text-secondary)", maxWidth: "520px", marginTop: "12px" }}>
              From Tamil Nadu brides and professionals — authentic experiences at Shoba Beauty Parlour.
            </p>
          </div>
        </div>

        {/* Carousel Viewport with overlays */}
        <div className={styles.carouselWrapper}>
          <button
            onClick={handlePrev}
            className={styles.navArrow}
            aria-label="Previous reviews"
          >
            <ChevronLeft size={22} />
          </button>

          <div className={styles.carouselViewport}>
            <motion.div
              className={styles.carouselTrack}
              drag="x"
              dragConstraints={{
                left: leftConstraint,
                right: rightConstraint
              }}
              dragElastic={0.25}
              onDragEnd={(e, info) => {
                const swipeThreshold = 50;
                const swipe = info.offset.x;
                const velocity = info.velocity.x;

                if (swipe < -swipeThreshold || velocity < -500) {
                  setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
                } else if (swipe > swipeThreshold || velocity > 500) {
                  setActiveIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
                }
              }}
              animate={{ x: xPosition }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              {reviews.map((review, idx) => {
                // Visible check
                const isVisible = idx >= safeIndex && idx < safeIndex + itemsToShow;
                return (
                  <motion.div
                    key={review.id}
                    className={styles.carouselCardWrapper}
                    style={{ width: cardWidth, marginRight: gap, flexShrink: 0 }}
                    animate={{
                      scale: isVisible ? 1.0 : 0.88,
                      opacity: isVisible ? 1.0 : 0.4,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={`${styles.reviewCard} glass-card`} style={{ height: "100%" }}>
                      {/* Stars */}
                      <div className={styles.stars}>
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={14} fill="var(--color-gold)" color="var(--color-gold)" />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>

                      {/* Service Badge */}
                      <span className={styles.serviceBadge}>{review.service}</span>

                      {/* Reviewer Info */}
                      <div className={styles.reviewer}>
                        <div className={styles.avatar}>{review.avatar}</div>
                        <div>
                          <span className={styles.reviewerName}>{review.name}</span>
                          <span className={styles.reviewerLocation}>{review.location}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <button
            onClick={handleNext}
            className={styles.navArrow}
            aria-label="Next reviews"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Pagination indicator dots */}
        {maxIndex > 0 && (
          <div className={styles.dotsContainer}>
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`${styles.dot} ${idx === safeIndex ? styles.activeDot : ""}`}
                aria-label={`Go to reviews slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
