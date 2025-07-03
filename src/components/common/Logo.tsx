import clsx from 'clsx';

interface LogoProps {
  scrolled: boolean;
}

export default function Logo({ scrolled }: LogoProps) {
  return (
    <div className="relative flex items-center gap-2 h-full z-10">
      <div
        className={clsx(
          'absolute -left-[6.875rem] top-[8.75rem] -translate-y-1/2 w-[37.5rem] pointer-events-none transition-opacity duration-300',
          scrolled ? 'opacity-0' : 'opacity-100',
        )}
      ></div>
    </div>
  );
}
