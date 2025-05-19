import { useEffect, useState } from 'react';
import clsx from 'clsx';
import DesktopNavigation from './DesktopNavigation.tsx';
import MobileNavigation from './MobileNavigation.tsx';
import Logo from '@components/common/Logo.tsx';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={clsx(
        'fixed top-0 left-0 w-full z-10 transition-all duration-300',
        scrolled ? 'bg-primary shadow-md h-20 z-30' : 'bg-transparent h-36',
      )}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-full transition-all duration-300">
        <Logo scrolled={scrolled} />
        {/*<div className="hidden md:flex md:items-center md:h-full">*/}
        <div className="hidden lg:flex lg:items-center lg:h-full">
          <DesktopNavigation scrolled={scrolled} />
        </div>
        {/*<div className="md:hidden"> */}
        <div className="lg:hidden">
          <MobileNavigation scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
}
