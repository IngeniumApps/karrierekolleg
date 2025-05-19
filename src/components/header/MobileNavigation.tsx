import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navItems } from '../../constants/navItems'; // [{ href, text, shape, color }]
import XMarkIcon from '../../assets/icons/custom/XMarkIcon.tsx';
import HamburgerIcon from '../../assets/icons/custom/HamburgerIcon.tsx';
import Shape from '../../assets/icons/custom/Shape.tsx';
import clsx from 'clsx';
import { useScrollSpy } from '../../hooks/useScrollSpy.ts';

export default function MobileNavigation({ scrolled }: { scrolled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const activeId = useScrollSpy(
    navItems.map((item) => item.id),
    100,
  );

  const closeDrawer = () => {
    setIsOpen(false);
    document.documentElement.classList.remove('overflow-hidden');
  };

  const openDrawer = () => {
    setIsOpen(true);
    document.documentElement.classList.add('overflow-hidden');
  };

  // Close on Esc
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && closeDrawer();
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="flex items-center justify-between h-full">
      {/* Toggle Button */}
      <button
        onClick={openDrawer}
        aria-label="Menü öffnen"
        className={clsx(
          'focus:outline-none z-50 relative',
          scrolled ? 'text-white' : 'text-gray-800',
        )}
      >
        <HamburgerIcon className="w-11 h-11 stroke-current" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 touch-none" // evtl. backdrop-blur-xs
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={closeDrawer}
              aria-hidden="true"
            />

            {/* Drawer Content */}
            <motion.div
              ref={drawerRef}
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('/images/background.svg')`,
                backgroundSize: '150% auto',
                backgroundRepeat: 'repeat-y',
                backgroundPosition: 'top center',
              }}
              id="drawer"
              className="fixed top-0 right-0 h-dvh w-3/4 max-w-[350px] z-[1100] bg-white
                                       flex flex-col justify-between shadow-xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              {/* Close Button */}
              <div
                className={clsx('flex items-center justify-end p-5', scrolled ? 'h-20' : 'h-36')}
              >
                <button onClick={closeDrawer} aria-label="Menü schließen" className="z-[1102]">
                  <XMarkIcon className="w-11 h-11" />
                </button>
              </div>
              {/* Navigation */}
              <ul
                className={clsx(
                  'flex flex-col gap-1 items-center justify-center flex-1',
                  scrolled ? '-mt-20' : '-mt-36',
                )}
              >
                {navItems.map((item) => (
                  <li
                    key={item.id}
                    className="relative w-[90%] h-20 flex items-center justify-center overflow-visible"
                  >
                    <Shape shape={item.shape!} color={item.color!} />
                    <a
                      href={`${import.meta.env.BASE_URL}#${item.id}`}
                      className={clsx(
                        'relative z-10 text-3xl text-white font-headline font-bold px-2',
                        activeId === item.id ? 'border-b-2 border-white' : 'border-none',
                      )}
                      onClick={closeDrawer}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
