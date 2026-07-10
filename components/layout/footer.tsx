import React from 'react';
import Link from 'next/link';
import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3 style={{ fontFamily: 'var(--font-decorative)', fontSize: '1.4rem', color: 'var(--accent)' }}>
              ZX
            </h3>
            <p className={styles.tagline}>
              Gothic jewellery forged in darkness, worn with pride.
            </p>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Navigate</h4>
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/cart">Cart</Link>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Categories</h4>
            <Link href="/shop">Rings</Link>
            <Link href="/shop">Necklaces</Link>
            <Link href="/shop">Bracelets</Link>
            <Link href="/shop">Earrings</Link>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <a href="mailto:contact@zxjewellery.com">contact@zxjewellery.com</a>
            <p style={{ color: 'var(--fg-dim)', fontSize: '0.8rem' }}>Worldwide Shipping</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} ZX Gothic Jewellery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
