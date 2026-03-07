import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`min-h-[calc(100vh-140px)] ${className || ''}`}
    >
      {children}
    </motion.div>
  );
}
