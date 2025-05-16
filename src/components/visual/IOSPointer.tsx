import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isClient, setIsClient] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const width = useMotionValue(32);
    const height = useMotionValue(32);

    const smoothX = useSpring(x, { stiffness: 600, damping: 40 });
    const smoothY = useSpring(y, { stiffness: 600, damping: 40 });
    const smoothW = useSpring(width, { stiffness: 600, damping: 40 });
    const smoothH = useSpring(height, { stiffness: 600, damping: 40 });

    useEffect(() => {
        setIsClient(true);

        const updatePosition = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            const interactive = target?.closest('a, button, [role="button"], [data-hover-box]') as HTMLElement | null;
            const padding = 10;

            if (interactive) {
                const rect = interactive.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const relX = e.clientX - centerX;
                const relY = e.clientY - centerY;

                // Parallax Bewegung im Ziel-Element
                interactive.style.transform = `translate(${relX * 0.2}px, ${relY * 0.2}px)`;

                // Cursor-Box mit Padding
                const padding = 8;
                width.set(rect.width + padding * 2);
                height.set(rect.height + padding * 2);
                x.set(rect.left - padding);
                y.set(rect.top - padding);
                setIsActive(true);
            } else {
                width.set(20);
                height.set(20);
                x.set(e.clientX - 10);
                y.set(e.clientY - 10);
                setIsActive(false);

                // Reset transform aller Box-Ziele
                document.querySelectorAll('a, button, [role="button"], [data-hover-box]').forEach(el => {
                    (el as HTMLElement).style.transform = 'translate(0px, 0px)';
                });
            }
        };

        window.addEventListener('mousemove', updatePosition);
        return () => window.removeEventListener('mousemove', updatePosition);
    }, [x, y, width, height]);

    if (!isClient) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: smoothX,
                y: smoothY,
                width: smoothW,
                height: smoothH,
                borderRadius: isActive ? 6 : '50%',
                backgroundColor: isActive ? '#d9e5f1' : '#d9e5f1',
            }}
        />
    );
}