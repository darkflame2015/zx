'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import styles from './product-card.module.css';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/product/${product.id}`} className={styles.imageWrap}>
        {product.badge && <span className="badge">{product.badge}</span>}
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className={styles.image}
        />
        <div className={styles.overlay}>
          <span className={styles.viewText}>View Details</span>
        </div>
      </Link>

      <div className={styles.info}>
        <p className={styles.category}>{product.category}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
        <button
          className={`btn btn-outline ${styles.addBtn}`}
          onClick={() => addItem(product)}
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
