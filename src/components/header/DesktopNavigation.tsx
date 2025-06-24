import { navItems } from '../../constants/navItems.ts';
import { useScrollSpy } from '../../hooks/useScrollSpy';

export default function DesktopNavigation({ scrolled }: { scrolled: boolean }) {
  const activeId = useScrollSpy(
    navItems.map((item) => item.id),
    100,
  );

  return (
    <nav aria-label="Hauptnavigation" className="flex gap-10 text-sm font-medium">
      {navItems.map((item) => {
        const isActive = activeId === item.id;
        const baseClasses = 'cursor-none transition-colors px-2 py-1 text-xl';

        const colorClasses = scrolled
          ? isActive
            ? 'text-accent border-b-2 border-accent font-bold'
            : 'text-white hover:text-accent hover:border-b-2 hover:border-accent hover:font-bold'
          : isActive
            ? 'text-primary border-b-2 border-primary font-bold'
            : 'text-black hover:text-primary hover:border-b-2 hover:border-primary hover:font-bold';
        return (
          <a
            key={item.id}
            href={`${import.meta.env.BASE_URL}#${item.id}`}
            aria-current={isActive ? 'page' : undefined}
            className={`${baseClasses} ${colorClasses}`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
