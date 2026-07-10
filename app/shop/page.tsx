'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ui/product-card';
import { TextReveal } from '@/components/ui/text-reveal';
import { products, categories } from '@/lib/products';
import styles from './page.module.css';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      <section className={styles.hero}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Collection</span>
          </motion.div>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            The Vault
          </motion.h1>
          <div className="divider" />
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Browse our complete collection of handcrafted gothic pieces
          </motion.p>
        </div>
      </section>

      <section className={styles.shopSection}>
        <div className="container">
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--fg-dim)', padding: '60px 0' }}>
              No pieces found in this category.
            </p>
          )}
        </div>
      </section>

      <section style={{ padding: '80px 0 40px' }}>
        <div className="container">
          <TextReveal className={styles.reveal}>
            Every ring, necklace, and brooch in our vault has been individually inspected and blessed with the spirit of dark artistry. We ship worldwide with care befitting each sacred piece.
          </TextReveal>
        </div>
      </section>
    </>
  );
}
