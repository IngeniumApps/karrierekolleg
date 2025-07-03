import { useEffect, useState } from 'react';

export function useScrollSpy(ids: string[], offset = 0) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + offset + 1;

      const visibleSections = ids.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const top = el.offsetTop;
        return scrollPos >= top ? id : null;
      });

      const currentId = visibleSections.filter(Boolean).slice(-1)[0] || null;
      if (currentId && currentId !== activeId) {
        setActiveId(currentId);

        if (window.location.hash !== `#${currentId}`) {
          history.replaceState(null, '', `#${currentId}`);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset, activeId]);

  return activeId;
}
