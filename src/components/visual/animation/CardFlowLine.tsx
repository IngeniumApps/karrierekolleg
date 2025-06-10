// CardFlowLine.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CardFlowLine = () => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    // Exakter Pfad wie im Bild - durch und um die Cards
    const pathData = `
    M-200,200 
    C400,150 600,180 800,200
    C1000,220 1200,300 1400,400
    C1600,500 1800,600 2000,500
    C2200,400 2400,300 2600,350
    C2800,400 3000,500 3200,600
    C3400,700 3600,650 3800,600
  `;

    return (
        <div
            ref={ref}
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
            style={{ zIndex: 5 }}
        >
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 3000 800"
                preserveAspectRatio="none"
                style={{
                    width: '200%',
                    height: '150%',
                    left: '-50%',
                    top: '-25%'
                }}
            >
                {/* Haupt-Linie - Rot wie im Bild */}
                <motion.path
                    d={pathData}
                    stroke="#BBF451"
                    strokeWidth="13"
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