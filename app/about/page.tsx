'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShadowOverlay } from '@/components/ui/shadow-overlay';
import { TextReveal } from '@/components/ui/text-reveal';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroShadow}>
          <ShadowOverlay
            color="rgba(139, 45, 45, 0.15)"
            animation={{ scale: 35, speed: 18 }}
            noise={{ opacity: 0.25, scale: 1 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Our Story</span>
          </motion.div>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Born from Darkness
          </motion.h1>
          <div className="divider" />
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Where ancient symbolism meets modern craftsmanship
          </motion.p>
        </div>
      </section>

      {/* Text Reveal */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <TextReveal className={styles.revealText}>
            ZX was founded on a simple belief — that darkness is beautiful. We saw a world of mass-produced, soulless accessories and chose a different path. A path lit by forge-fire and guided by centuries of gothic artistry.
          </TextReveal>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">Our Pillars</span>
            <h2 className={styles.sectionTitle}>What We Stand For</h2>
          </div>

          <div className={styles.valuesGrid}>
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                ),
                title: 'Uncompromising Quality',
                desc: 'Every piece is crafted from 925 sterling silver and natural gemstones. We never use plating, cheap alloys, or synthetic stones.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>
                ),
                title: 'Handcrafted with Soul',
                desc: 'Our artisans use traditional lost-wax casting combined with hand-finishing techniques passed down through generations of metalworkers.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                ),
                title: 'Global Community',
                desc: 'We ship to every corner of the world, connecting those who embrace the beauty of darkness across cultures and continents.',
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                className={styles.valueCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDesc}>{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Text Reveal */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <TextReveal className={styles.revealText}>
            We don&apos;t follow trends. We forge them in silver and set them with onyx. Each ZX piece is a declaration — that you refuse to be ordinary, that you find elegance in the shadows others fear.
          </TextReveal>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <ShadowOverlay
          color="rgba(201, 168, 76, 0.12)"
          animation={{ scale: 30, speed: 20 }}
          noise={{ opacity: 0.2, scale: 0.8 }}
          style={{ position: 'absolute', inset: 0 }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontFamily: 'var(--font-decorative)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: '16px' }}>
              Join the Dark Side
            </h2>
            <p style={{ color: 'var(--fg-secondary)', maxWidth: '500px', margin: '0 auto 32px', lineHeight: '1.7' }}>
              Explore our complete collection and find the piece that speaks to your soul.
            </p>
            <Link href="/shop" className="btn btn-primary">
              Browse Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
