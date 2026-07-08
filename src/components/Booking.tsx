"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Sparkles, Send, CheckCircle2 } from "lucide-react";
import styles from "./Booking.module.css";

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    elixir: "none",
    date: "",
    time: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.service || !form.date || !form.time) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API reservation call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const servicesList = [
    { value: "traditional-bridal", label: "Traditional Bridal Makeup" },
    { value: "hd-bridal", label: "HD Bridal Makeup" },
    { value: "airbrush-bridal", label: "Airbrush Bridal Makeup" },
    { value: "engagement", label: "Engagement & Roka Makeup" },
    { value: "mehendi-sangeet", label: "Mehendi & Sangeet Makeup" },
    { value: "bridesmaid", label: "Bridesmaid & Family Makeup" },
    { value: "high-glam", label: "High-Glam Evening Makeup" },
    { value: "cocktail", label: "Cocktail & Reception Makeup" },
    { value: "festive", label: "Festive & Party Makeup" },
    { value: "editorial", label: "Editorial & Fashion Makeup" },
    { value: "corporate", label: "Corporate & Headshot Makeup" },
    { value: "minimalist", label: "Minimalist 'No-Makeup' Makeup" },
  ];

  const elixirsList = [
    { value: "none", label: "No customized elixir" },
    { value: "rose", label: "Rose Radiance Elixir" },
    { value: "gold", label: "Golden Honey Nectar" },
    { value: "aloe", label: "Aloe Pure Infusion" },
  ];

  return (
    <section id="booking" className="section" style={{ backgroundColor: "var(--color-bg-deep)" }}>
      {/* Decorative Orbs */}
      <div
        className="glow-orb"
        style={{
          width: "350px",
          height: "350px",
          top: "10%",
          left: "-5%",
          background: "rgba(200, 162, 125, 0.04)",
        }}
      />

      <div className="container">
        {/* Title with scroll reveal */}
        <motion.div
          className="luxury-title-container text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="luxury-subtitle">Reservations</span>
          <h2 className="luxury-title">
            Book Your <span>Experience.</span>
          </h2>
        </motion.div>

        <div className={styles.bookingWrapper}>
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="booking-form"
                className={`${styles.bookingForm} glass-card`}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className={styles.formGrid}>
                  {/* Name */}
                  <div className={styles.inputGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g. Your Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  {/* Email */}
                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="e.g. example@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  {/* Service Selection */}
                  <div className={styles.inputGroup}>
                    <label htmlFor="service">Select Treatment *</label>
                    <select
                      id="service"
                      required
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                    >
                      <option value="" disabled>-- Select a treatment --</option>
                      {servicesList.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Elixir Lab Integration */}
                  <div className={styles.inputGroup}>
                    <label htmlFor="elixir">
                      Custom Elixir Base <Sparkles size={12} style={{ color: "var(--color-gold)", marginLeft: "4px" }} />
                    </label>
                    <select
                      id="elixir"
                      value={form.elixir}
                      onChange={(e) => setForm({ ...form, elixir: e.target.value })}
                    >
                      {elixirsList.map((e) => (
                        <option key={e.value} value={e.value}>{e.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date selection */}
                  <div className={styles.inputGroup}>
                    <label htmlFor="date">
                      <Calendar size={12} style={{ marginRight: "6px" }} /> Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>

                  {/* Time selection */}
                  <div className={styles.inputGroup}>
                    <label htmlFor="time">
                      <Clock size={12} style={{ marginRight: "6px" }} /> Preferred Time *
                    </label>
                    <select
                      id="time"
                      required
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                    >
                      <option value="" disabled>-- Select time slot --</option>
                      <option value="07:00">07:00 AM</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="01:00">01:00 PM</option>
                      <option value="03:00">03:00 PM</option>
                      <option value="05:00">05:00 PM</option>
                      <option value="07:00">07:00 PM</option>
                      <option value="09:00">09:00 PM</option>
                    </select>
                  </div>

                  {/* Special Notes */}
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label htmlFor="notes">Special Requests / Allergies</label>
                    <textarea
                      id="notes"
                      rows={4}
                      placeholder="Share details about your skin type or custom preferences..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.formFooter}>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                    style={{ width: "100%", padding: "16px" }}
                  >
                    {isSubmitting ? (
                      <span className={styles.loader}>Securing Appointment...</span>
                    ) : (
                      <>
                        Confirm Consultation <Send size={14} />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="booking-success"
                className={`${styles.successCard} glass-card`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className={styles.successIcon}>
                  <CheckCircle2 size={64} className={styles.checkIcon} />
                </div>
                <h3 className={styles.successTitle}>Reservation Requested</h3>
                <p className={styles.successDesc}>
                  Thank you, <strong>{form.name}</strong>. We are processing your request. 
                  A booking confirmation with detailed preparation guides has been sent to 
                  <strong> {form.email}</strong>.
                </p>

                <div className={styles.receiptDetails}>
                  <div className={styles.receiptRow}>
                    <span>Treatment:</span>
                    <strong>{servicesList.find((s) => s.value === form.service)?.label.split(" ($")[0]}</strong>
                  </div>
                  <div className={styles.receiptRow}>
                    <span>Elixir Option:</span>
                    <strong>{elixirsList.find((e) => e.value === form.elixir)?.label.split(" (+")[0]}</strong>
                  </div>
                  <div className={styles.receiptRow}>
                    <span>Date:</span>
                    <strong>{form.date}</strong>
                  </div>
                  <div className={styles.receiptRow}>
                    <span>Time Slot:</span>
                    <strong>{form.time}</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setForm({
                      name: "",
                      email: "",
                      service: "",
                      elixir: "none",
                      date: "",
                      time: "",
                      notes: "",
                    });
                  }}
                  className="btn-secondary"
                  style={{ marginTop: "30px", width: "100%" }}
                >
                  Book Another Session
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
