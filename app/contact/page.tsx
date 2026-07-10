'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShadowOverlay } from '@/components/ui/shadow-overlay';
import { TextReveal } from '@/components/ui/text-reveal';
import VaporizeTextCycle, { Tag } from '@/components/ui/vaporize-text';
import styles from './page.module.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'contact@zxjewellery.com',
    href: 'mailto:contact@zxjewellery.com',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    value: 'Mumbai, India',
    href: null,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      // We don't reset submitted here anymore because we want to show the vaporize effect permanently
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroShadow}>
          <ShadowOverlay
            color="rgba(201, 168, 76, 0.12)"
            animation={{ scale: 30, speed: 18 }}
            noise={{ opacity: 0.2, scale: 1 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Contact</span>
          </motion.div>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Get in Touch
          </motion.h1>
          <div className="divider" />
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Have a question about our pieces? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Form */}
            <motion.div
              className={styles.formWrap}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className={styles.formTitle}>Send us a message</h3>
              <p className={styles.formDesc}>
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="contact-name" className="input-label">Name</label>
                      <input id="contact-name" name="name" type="text" className="input" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="contact-email" className="input-label">Email</label>
                      <input id="contact-email" name="email" type="email" className="input" placeholder="you@email.com" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="contact-phone" className="input-label">Phone</label>
                      <input id="contact-phone" name="phone" type="tel" className="input" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="contact-subject" className="input-label">Subject</label>
                      <select id="contact-subject" name="subject" className="input" value={formData.subject} onChange={handleChange} required>
                        <option value="" disabled>Select a topic</option>
                        <option value="Product Inquiry">Product Inquiry</option>
                        <option value="Custom Order">Custom Order</option>
                        <option value="Shipping & Returns">Shipping & Returns</option>
                        <option value="Wholesale">Wholesale</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-message" className="input-label">Message</label>
                    <textarea id="contact-message" name="message" className="input" placeholder="Tell us what you need..." value={formData.message} onChange={handleChange} required rows={5} />
                  </div>

                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={isSubmitting || submitted}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    )}
                  </button>
                </form>
              ) : null}
            {submitted && (
              <div style={{ height: '400px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <VaporizeTextCycle
                  texts={["Message", "Sent", "Successfully"]}
                  font={{
                      fontFamily: "var(--font-display)",
                      fontSize: "40px",
                      fontWeight: 600
                  }}
                  color="#c9a84c"
                  spread={5}
                  density={5}
                  animation={{
                      vaporizeDuration: 2,
                      fadeInDuration: 1,
                      waitDuration: 0.5
                  }}
                  direction="left-to-right"
                  alignment="center"
                  tag={Tag.H2}
                />
              </div>
            )}
            </motion.div>

            {/* Info Panel */}
            <div className={styles.infoPanel}>
              <div className={styles.infoCards}>
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.label}
                    className={styles.infoCard}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className={styles.infoIcon}>{info.icon}</div>
                    <div>
                      <p className={styles.infoLabel}>{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className={styles.infoValue}>{info.value}</a>
                      ) : (
                        <p className={styles.infoValue}>{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text Reveal */}
      <section style={{ padding: '80px 0 40px' }}>
        <div className="container">
          <TextReveal className={styles.revealText}>
            Whether you seek a custom piece forged to your vision or have questions about our existing collection, we are here to guide you through the shadows and help you find the perfect dark treasure.
          </TextReveal>
        </div>
      </section>
    </>
  );
}
