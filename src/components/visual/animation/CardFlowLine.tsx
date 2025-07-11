import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CardFlowLine = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const pathData = `
    M 514 188 C 1000 220 997 22 1378 383 C 1545 533 1711 797 2056 574 C 2417 342 2400 300 2778 460
    `;

  return (
    <div
      ref={ref}
      className="hidden lg:block absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ zIndex: 5 }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 3000 800"
        style={{
          width: '200%',
          height: '150%',
          left: '-50%',
          top: '-25%',
        }}
      >
        <motion.path
          d={pathData}
          stroke="#BBF451"
          strokeWidth="25"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            pathLength,
          }}
        />
      </svg>
    </div>
  );
};

export default CardFlowLine;
