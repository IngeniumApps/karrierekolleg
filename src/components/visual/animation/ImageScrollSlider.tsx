import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { MotionValue } from 'framer-motion';

export default function ImageScrollSlider({
  images,
  progressList,
}: {
  images: string[];
  progressList: MotionValue<number>[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateIndex = () => {
      let highestVisibleIndex = 0;
      for (let i = 0; i < progressList.length; i++) {
        if (progressList[i].get() > 0.5) {
          highestVisibleIndex = i;
        }
      }
      setActiveIndex(highestVisibleIndex);
    };

    const unsubscribes = progressList.map((progress) => progress.on('change', updateIndex));

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [progressList]);

  return (
    <div className="absolute inset-0 overflow-visible z-20 rounded-xl">
      <div className="relative w-full h-full">
        {images.map((img, idx) => (
          <picture key={idx}>
            <motion.img
              key={idx}
              src={img}
              srcSet={`${img} 1x, ${img.replace('.webp', '@2x.webp')} 2x`}
              alt=""
              width={900}
              height={900}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute top-1/2 left-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700"
              style={{ opacity: activeIndex === idx ? 1 : 0 }}
              transition={{ duration: 3, ease: 'easeInOut' }}
            />
          </picture>
        ))}
      </div>
    </div>
  );
}
