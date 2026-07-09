import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import MakeupGallery from "@/components/MakeupGallery";
import Reviews from "@/components/Reviews";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import ThreeBackgroundWrapper from "@/components/ThreeBackgroundWrapper";

export default function Home() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100vw", overflowX: "hidden" }}>
      {/* Three.js Global Background Animation */}
      <ThreeBackgroundWrapper />

      {/* Dynamic Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Philosophy Section */}
      <About />

      {/* Makeup Services Section */}
      <Services />

      {/* Makeup Gallery Carousel */}
      <MakeupGallery />

      {/* Client Reviews */}
      <Reviews />

      {/* Booking Reservations Section */}
      <Booking />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
