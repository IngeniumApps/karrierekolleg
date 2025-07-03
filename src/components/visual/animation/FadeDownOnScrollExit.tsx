import { motion, AnimatePresence, useInView } from 'framer-motion';
import { type ReactNode, useRef } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
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
    amount: threshold,
    margin: '-50px 0px -50px 0px',
  });

  return (
    <div ref={ref} className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {isInView && (
          <motion.div
            key="fade-child"
            animate={{ opacity: 0.95, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration,
              delay,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
