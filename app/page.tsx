'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShadowOverlay } from '@/components/ui/shadow-overlay';
import { TextReveal } from '@/components/ui/text-reveal';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import { ProductCard } from '@/components/ui/product-card';
import { products } from '@/lib/products';
import styles from './page.module.css';

const parallaxImages = [
  { src: '/skull-ring.png', alt: 'Gothic Skull Ring' },
  { src: '/snake-necklace.png', alt: 'Snake Necklace' },
  { src: '/bat-bracelet.png', alt: 'Bat Wing Cuff' },
  { src: '/gothic-earrings.png', alt: 'Gothic Earrings' },
  { src: '/cross-pendant.png', alt: 'Cross Pendant' },
  { src: '/raven-brooch.png', alt: 'Raven Brooch' },
  { src: '/hero-banner.png', alt: 'Gothic Collection' },
];

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src="/hero-banner.png"
            alt="Gothic Jewellery Collection"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className={styles.heroOverlayGrad} />
        </div>

        <div className={styles.heroShadow}>
          <ShadowOverlay
            color="rgba(201, 168, 76, 0.15)"
            animation={{ scale: 40, speed: 20 }}
            noise={{ opacity: 0.3, scale: 1 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Handcrafted Gothic Jewellery</span>
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Dark Elegance,<br />
            <span className={styles.heroAccent}>Forged in Silver</span>
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Each piece tells a story of shadows and light — handcrafted from<br />
            sterling silver, adorned with dark symbolism, born from darkness.
          </motion.p>

          <motion.div
            className={styles.heroCtas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link href="/shop" className="btn btn-primary">
              Explore Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link href="/about" className="btn btn-outline">
              Our Craft
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Text Reveal Section */}
      <section className={styles.revealSection}>
        <div className="container">
          <TextReveal className={styles.revealText}>
            We believe jewellery is more than decoration. It is an extension of your soul — a dark mirror reflecting the beauty that others fear to embrace. Every cross, every pendant, every shadow cast in silver carries the weight of ancient symbolism.
          </TextReveal>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredSection}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">Featured Pieces</span>
            <h2 className={styles.sectionTitle}>Curated Darkness</h2>
            <div className="divider" />
          </div>

          <div className={styles.productsGrid}>
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/shop" className="btn btn-outline">
              View All Pieces
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Zoom Parallax Gallery */}
      <section className={styles.parallaxSection}>
        <div style={{ textAlign: 'center', marginBottom: '0', padding: '60px 24px 0' }}>
          <span className="section-label">Gallery</span>
          <h2 className={styles.sectionTitle}>A Glimpse into the Vault</h2>
          <div className="divider" />
        </div>
        <ZoomParallax images={parallaxImages} />
      </section>

      {/* Categories Banner with ShadowOverlay */}
      <section className={styles.categoriesBanner}>
        <ShadowOverlay
          color="rgba(139, 45, 45, 0.2)"
          animation={{ scale: 30, speed: 15 }}
          noise={{ opacity: 0.2, scale: 0.8 }}
          style={{ position: 'absolute', inset: 0 }}
        />
        <div className={`container ${styles.categoriesContent}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <span className="section-label">Craftsmanship</span>
            <h2 className={styles.sectionTitle}>Every Piece Has a Soul</h2>
            <p style={{ color: 'var(--fg-secondary)', maxWidth: '600px', margin: '16px auto 32px', fontSize: '0.95rem', lineHeight: '1.8' }}>
              Our artisans use traditional lost-wax casting techniques combined with modern precision
              to create pieces that are both timeless and bold.
            </p>
            <Link href="/shop" className="btn btn-primary">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Second Text Reveal */}
      <section className={styles.revealSection} style={{ paddingBottom: '40px' }}>
        <div className="container">
          <TextReveal className={styles.revealText}>
            From the depths of obsidian mines to the fires of the forge, each ZX piece undergoes a journey of transformation. Sterling silver is shaped, oxidized, and hand-finished to create wearable darkness that stands the test of time.
          </TextReveal>
        </div>
      </section>
    </>
  );
}
