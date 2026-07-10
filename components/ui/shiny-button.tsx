'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ShinyButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  className?: string;
}

export function ShinyButton({ children, className = '', ...props }: ShinyButtonProps) {
  return (
    <motion.button
      className={`btn-shiny ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="shiny-text">{children}</span>
      <div className="shiny-glare" />
    </motion.button>
  );
}
