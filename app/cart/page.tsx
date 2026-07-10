'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import styles from './page.module.css';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--fg-dim)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '24px' }}>
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <h1 style={{ fontFamily: 'var(--font-decorative)', fontSize: '1.8rem', marginBottom: '12px' }}>
            Your Vault is Empty
          </h1>
          <p style={{ color: 'var(--fg-dim)', marginBottom: '32px' }}>
            Discover our collection and add pieces that speak to your dark soul.
          </p>
          <Link href="/shop" className="btn btn-primary">
            Explore the Collection
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <section className={styles.cartSection}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '40px' }}
        >
          <span className="section-label">Your Cart</span>
          <h1 style={{ fontFamily: 'var(--font-decorative)', fontSize: '2rem', marginTop: '12px' }}>
            The Vault ({itemCount} {itemCount === 1 ? 'piece' : 'pieces'})
          </h1>
        </motion.div>

        <div className={styles.cartGrid}>
          {/* Items */}
          <div className={styles.itemsList}>
            {items.map((item, i) => (
              <motion.div
                key={item.product.id}
                className={styles.cartItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/product/${item.product.id}`} className={styles.itemImage}>
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </Link>

                <div className={styles.itemInfo}>
                  <Link href={`/product/${item.product.id}`}>
                    <p className={styles.itemCategory}>{item.product.category}</p>
                    <h3 className={styles.itemName}>{item.product.name}</h3>
                  </Link>
                  <p className={styles.itemPrice}>₹{item.product.price.toLocaleString('en-IN')}</p>
                </div>

                <div className={styles.itemActions}>
                  <div className={styles.qtyControls}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className={styles.qty}>{item.quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <p className={styles.itemTotal}>
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </p>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.product.id)}
                    aria-label="Remove item"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div
            className={styles.summary}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className={styles.summaryTitle}>Order Summary</h3>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span style={{ color: 'var(--accent)' }}>Free</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
              Proceed to Checkout
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>

            <Link href="/shop" className="btn btn-outline" style={{ width: '100%', marginTop: '8px' }}>
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
