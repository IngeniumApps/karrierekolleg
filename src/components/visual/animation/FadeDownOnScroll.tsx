import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

export default function FadeDownOnScroll({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      viewport={{ once: true }} // only the first time the element comes into view
    >
      {children}
    </motion.div>
  );
}
