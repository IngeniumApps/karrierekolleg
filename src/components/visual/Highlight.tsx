'use client';

import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import type {ReactNode} from "react";

export function cn(...inputs: (string | undefined | false | null)[]) {
    return twMerge(clsx(...inputs));
}

export const Highlight = ({
                              children,
                              className,
                              color = '#bbf452', // z. B. Tailwind "accent" blau
                          }: {
    children: ReactNode;
    className?: string;
    color?: string;
}) => {
    return (
        <motion.span
            initial={{ backgroundSize: '0% 100%' }}
            animate={{ backgroundSize: '100% 100%' }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
            style={{
                backgroundImage: `linear-gradient(90deg, ${color}, ${color})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left center',
                backgroundSize: '0% 100%',
                display: 'inline',
            }}
            className={cn(
                'relative inline-block px-1 pb-1 rounded-md',
                className
            )}
        >
            {children}
        </motion.span>
    );
};