import { type ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import clsx from 'clsx';

export const Highlight = ({
  children,
  className,
  color = '#A3E635',
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) setShouldAnimate(true);
  }, [isInView]);

  return (
    <motion.span
      ref={ref}
      initial={{ backgroundSize: '0% 100%' }}
      animate={shouldAnimate ? { backgroundSize: '100% 100%' } : {}}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      style={{
        backgroundImage: `linear-gradient(90deg, ${color}, ${color})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={clsx('relative inline-block rounded-full px-2 pb-1', className)}
    >
      {children}
    </motion.span>
  );
};
