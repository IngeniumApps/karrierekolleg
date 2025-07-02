// FadeDownOnScrollExit.tsx
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { type ReactNode, useRef } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** wie viel % muss sichtbar sein, bis „in view“ gilt (0-1) */
  threshold?: number;
};

export default function FadeDownOnScrollExit({
  children,
  className,
  delay = 0,
  duration = 0.6,
  threshold = 0.3,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: threshold, // Verhältnis sichtbar (0.3 = 30 %)
    margin: '-50px 0px -50px 0px', // timing-Feintuning
  });

  return (
    <div ref={ref} className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {isInView && (
          <motion.div
            key="fade-child" // nötig für Exit
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.95, y: 0 }}
            exit={{ opacity: 0, y: -20 }} //     ⬅️ Exit!
            transition={{
              duration,
              delay,
              ease: [0.4, 0, 0.2, 1], // wie im Beispiel
            }}
          >
              {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
