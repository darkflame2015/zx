'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { ShadowOverlay } from '@/components/ui/shadow-overlay';
import styles from './page.module.css';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: () => void) => void;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [orderId, setOrderId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'India',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRazorpayPayment = async () => {
    if (!window.Razorpay) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    setStep('processing');

    try {
      // Create order on the backend
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: total }),
      });

      const orderData = await res.json();

      if (!res.ok) {
        throw new Error(orderData.error?.description || 'Failed to create order');
      }

      setOrderId(orderData.receipt); // Use the receipt as our local tracking ID

      const options: RazorpayOptions = {
        key: 'rzp_test_TBwrT2dFPBSmRS', // Provided Razorpay Key ID
        amount: orderData.amount, // from backend (in paise)
        currency: orderData.currency,
        name: 'ZX Gothic Jewellery',
        description: `Order ${orderData.receipt} — ${items.length} piece(s)`,
        image: '/logo.png',
        order_id: orderData.id, // ID from Razorpay Order API
        handler: function (response: RazorpayResponse) {
          setPaymentId(response.razorpay_payment_id);
          clearCart();
          setStep('success');
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#c9a84c',
        },
        modal: {
          ondismiss: function () {
            setStep('form');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function () {
        alert('Payment failed. Please try again.');
        setStep('form');
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Could not initialize payment. Please try again.');
      setStep('form');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRazorpayPayment();
  };

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h1 style={{ fontFamily: 'var(--font-decorative)', fontSize: '1.8rem', marginBottom: '16px' }}>
          Nothing to Checkout
        </h1>
        <p style={{ color: 'var(--fg-dim)', marginBottom: '32px' }}>Add some pieces to your cart first.</p>
        <Link href="/shop" className="btn btn-primary">Browse Collection</Link>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <section className={styles.successSection}>
        <div className={styles.successShadow}>
          <ShadowOverlay
            color="rgba(201, 168, 76, 0.15)"
            animation={{ scale: 35, speed: 20 }}
            noise={{ opacity: 0.2, scale: 1 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.successIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 style={{ fontFamily: 'var(--font-decorative)', fontSize: '2rem', margin: '24px 0 12px' }}>
              Payment Successful
            </h1>
            <p style={{ color: 'var(--fg-secondary)', maxWidth: '480px', margin: '0 auto 16px', lineHeight: '1.7' }}>
              Your gothic treasures are being prepared with the utmost care. You&apos;ll receive a confirmation
              email shortly with tracking details.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '32px' }}>
              <p style={{ fontFamily: 'var(--font-display)', color: 'var(--fg-dim)', fontSize: '0.7rem', letterSpacing: '0.15em' }}>
                ORDER: {orderId}
              </p>
              {paymentId && (
                <p style={{ fontFamily: 'var(--font-display)', color: 'var(--fg-dim)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                  PAYMENT ID: {paymentId}
                </p>
              )}
            </div>
            <Link href="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <section className={styles.checkoutSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '40px' }}
          >
            <span className="section-label">Checkout</span>
            <h1 style={{ fontFamily: 'var(--font-decorative)', fontSize: '2rem', marginTop: '12px' }}>
              Complete Your Order
            </h1>
          </motion.div>

          <form onSubmit={handleSubmit} className={styles.checkoutGrid}>
            {/* Form Fields */}
            <div className={styles.formCol}>
              {/* Contact */}
              <div className={styles.formBlock}>
                <h3 className={styles.blockTitle}>Contact Information</h3>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className="input-label">Email</label>
                    <input name="email" type="email" className="input" placeholder="you@email.com" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className={styles.field}>
                    <label className="input-label">Phone</label>
                    <input name="phone" type="tel" className="input" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className={styles.formBlock}>
                <h3 className={styles.blockTitle}>Shipping Address</h3>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className="input-label">First Name</label>
                    <input name="firstName" className="input" placeholder="First name" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className={styles.field}>
                    <label className="input-label">Last Name</label>
                    <input name="lastName" className="input" placeholder="Last name" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className={styles.field}>
                  <label className="input-label">Address</label>
                  <input name="address" className="input" placeholder="Street address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className="input-label">City</label>
                    <input name="city" className="input" placeholder="City" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className={styles.field}>
                    <label className="input-label">State</label>
                    <input name="state" className="input" placeholder="State" value={formData.state} onChange={handleChange} required />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className="input-label">PIN Code</label>
                    <input name="zip" className="input" placeholder="PIN code" value={formData.zip} onChange={handleChange} required />
                  </div>
                  <div className={styles.field}>
                    <label className="input-label">Country</label>
                    <input name="country" className="input" placeholder="Country" value={formData.country} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              {/* Razorpay Info */}
              <div className={styles.formBlock}>
                <h3 className={styles.blockTitle}>Payment</h3>
                <div className={styles.razorpayNote}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <div>
                    <p style={{ fontWeight: 500, marginBottom: '4px' }}>Secure Payment via Razorpay</p>
                    <p style={{ color: 'var(--fg-dim)', fontSize: '0.8rem' }}>
                      UPI, Cards, Net Banking, Wallets — all payment modes supported.
                      Your payment details are handled securely by Razorpay.
                    </p>
                  </div>
                </div>
                <div className={styles.paymentMethods}>
                  <span>UPI</span>
                  <span>Cards</span>
                  <span>Net Banking</span>
                  <span>Wallets</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={step === 'processing'}
              >
                {step === 'processing' ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')} with Razorpay`}
              </button>
            </div>

            {/* Order Summary */}
            <div className={styles.summaryCol}>
              <div className={styles.summaryCard}>
                <h3 className={styles.blockTitle}>Order Summary</h3>
                {items.map(item => (
                  <div key={item.product.id} className={styles.summaryItem}>
                    <div>
                      <p className={styles.summaryItemName}>{item.product.name}</p>
                      <p className={styles.summaryItemQty}>Qty: {item.quantity}</p>
                    </div>
                    <p className={styles.summaryItemPrice}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
                <div className={styles.summaryDivider} />
                <div className={styles.summaryRow}>
                  <span>Subtotal</span><span>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span><span style={{ color: 'var(--accent)' }}>Free</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>Total</span><span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
