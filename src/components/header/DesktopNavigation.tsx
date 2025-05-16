import React from 'react';
import { navItems } from '../../constants/navItems.ts';
import { useScrollSpy } from '../../hooks/useScrollSpy';

export default function DesktopNavigation({ scrolled }: { scrolled: boolean }) {
    const activeId = useScrollSpy(navItems.map(item => item.id), 100);

    return (
            <nav
                aria-label="Hauptnavigation"
                className="flex gap-10 text-sm font-medium"
            >
                {navItems.map((item) => {
                    const isActive = activeId === item.id;
                    const baseClasses = 'cursor-none transition-colors px-2 py-1 text-lg';

                    const colorClasses = scrolled
                        ? isActive
                            ? 'text-white border-b-2 border-white'
                            : 'text-white hover:text-white hover:border-b-2 hover:border-white'
                        : isActive
                            ? 'text-primary border-b-2 border-primary'
                            : 'text-black hover:text-primary hover:border-b-2 hover:border-primary';

                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`${baseClasses} ${colorClasses}`}
                        >
                            {item.label}
                        </a>
                    );
                })}
            </nav>
    );
}