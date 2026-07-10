'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { products } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { ShadowOverlay } from '@/components/ui/shadow-overlay';
import { ProductCard } from '@/components/ui/product-card';
import styles from './page.module.css';

export default function ProductPage() {
  const params = useParams();
  const product = products.find(p => p.id === params.id);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '120px 0' }}>
        <h1>Product not found</h1>
        <Link href="/shop" className="btn btn-outline" style={{ marginTop: '24px' }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <>
      <section className={styles.productSection}>
        <div className="container">
          <div className={styles.productGrid}>
            {/* Image */}
            <motion.div
              className={styles.imageWrap}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.shadowWrap}>
                <ShadowOverlay
                  color="rgba(224, 230, 237, 0.1)"
                  animation={{ scale: 25, speed: 15 }}
                  noise={{ opacity: 0.15, scale: 0.8 }}
                  style={{ position: 'absolute', inset: 0, zIndex: 1 }}
                />
              </div>
              {product.badge && <span className="badge" style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 5 }}>{product.badge}</span>}
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className={styles.productImage}
                priority
              />
            </motion.div>

            {/* Details */}
            <motion.div
              className={styles.details}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.category}>{product.category}</span>
              <h1 className={styles.name}>{product.name}</h1>

              <div className={styles.priceRow}>
                <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
                {product.originalPrice && (
                  <span className={styles.saveBadge}>
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <div className="divider" style={{ margin: '20px 0' }} />

              <p className={styles.description}>{product.description}</p>

              <ul className={styles.detailsList}>
                {product.details.map((detail, i) => (
                  <li key={i}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>

              <div className={styles.actions}>
                <button
                  className="btn btn-primary"
                  onClick={() => addItem(product)}
                  style={{ flex: 1 }}
                >
                  Add to Cart — ₹{product.price.toLocaleString('en-IN')}
                </button>
              </div>

              <div className={styles.guarantees}>
                <div className={styles.guarantee}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5a2 2 0 01-2 2h-1"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  <span>Free worldwide shipping</span>
                </div>
                <div className={styles.guarantee}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span>Lifetime warranty</span>
                </div>
                <div className={styles.guarantee}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                  <span>30-day returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className={styles.relatedSection}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-label">You May Also Like</span>
            <h2 style={{ fontFamily: 'var(--font-decorative)', fontSize: '1.6rem', marginTop: '12px' }}>
              Related Pieces
            </h2>
          </div>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
