import { useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion';
import { forwardRef, useRef, useState } from 'react';
import clsx from 'clsx';
import FadeDownOnScroll from '@components/visual/animation/FadeDownOnScrollExit.tsx';
import { chatEntriesLeft, chatEntriesRight } from '../../constants/chatEntries.tsx';
import { type Slide, whatIsKollegData } from '../../constants/whatIsKollegData.tsx';
import ImageScrollSlider from '@components/visual/animation/ImageScrollSlider.tsx';
import { useIsDesktop } from '../../hooks/useIsDesktop.ts';
import parse from 'html-react-parser';
import HeroChatBubble from '@components/testimonials/HeroChatBubbles.tsx';
import HeroLeftContent from '@components/testimonials/HeroLeftContent.tsx';

type CollegSlide = Extract<Slide, { kind: 'colleg' }>;

const useScrollYProgress = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  return { scrollYProgress, ref };
};

export default function WhatIsKollegScroller({ className }: { className?: string }) {
  const scrollProgressIndex0 = useMotionValue(1);
  const { ref: targetRefIndex1, scrollYProgress: scrollProgressIndex1 } = useScrollYProgress();
  const { ref: targetRefIndex2, scrollYProgress: scrollProgressIndex2 } = useScrollYProgress();
  const { ref: targetRefIndex3, scrollYProgress: scrollProgressIndex3 } = useScrollYProgress();
  const { ref: targetRefIndex4, scrollYProgress: scrollProgressIndex4 } = useScrollYProgress();
  const isDesktop = useIsDesktop();

  const [showBubbles, setShowBubbles] = useState(true);

  useMotionValueEvent(scrollProgressIndex1, 'change', (latest) => {
    // sichtbar, solange erster Colleg-Slide noch nicht im Viewport-Bottom angekommen ist
    setShowBubbles(latest < 0.01);
  });

  return (
    <div className={className}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-5">
        <div className="">
          {whatIsKollegData.map((item, index) => (
            <div key={index} className="">
              {item.kind === 'hero' ? (
                <>
                  <FadeDownOnScroll
                    duration={1}
                    delay={0}
                    className="hidden lg:flex z-10 w-full h-[calc(100vh-theme(spacing.20))] flex-col justify-center px-6"
                  >
                    <HeroLeftContent />
                  </FadeDownOnScroll>
                  <div className="landscape:mt-28 landscape:mb-20 flex lg:hidden z-10 w-full h-[calc(100vh-theme(spacing.20))] flex-col justify-center px-6">
                    <HeroLeftContent />
                  </div>
                </>
              ) : (
                <>
                  <WhatIsKollegSection
                    {...item}
                    ref={
                      index === 1
                        ? targetRefIndex1
                        : index === 2
                          ? targetRefIndex2
                          : index === 3
                            ? targetRefIndex3
                            : index === 4
                              ? targetRefIndex4
                              : null
                    }
                  />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:block z-10 overflow-visible">
          <div className="sticky top-20 h-[calc(100vh-theme(spacing.20))] overflow-visible">
            {isDesktop && (
              <>
                <ImageScrollSlider
                  progressList={[
                    scrollProgressIndex0,
                    scrollProgressIndex1,
                    scrollProgressIndex2,
                    scrollProgressIndex3,
                    scrollProgressIndex4,
                  ]}
                  images={whatIsKollegData.map(
                    (i) => `${import.meta.env.BASE_URL}images/hero-images/${i.image}`,
                  )}
                />

                {showBubbles && (
                  <>
                    <HeroChatBubble
                      position="top-[55%] left-0"
                      delayOffset={0}
                      entries={chatEntriesLeft}
                    />
                    <HeroChatBubble
                      position="bottom-[60px] right-0"
                      delayOffset={1500}
                      entries={chatEntriesRight}
                    />
                  </>
                )}

                <div className="absolute bottom-0 left-0 -translate-x-1/2 -ml-[0.625rem] h-[60px] z-20">
                  <div
                    className="bg-white/70 backdrop-blur-md text-primary text-sm sm:text-base px-6 py-2 rounded-full shadow-md animate-bounce"
                    aria-hidden="true"
                  >
                    ↓ Scroll weiter
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const WhatIsKollegSection = forwardRef<HTMLDivElement, CollegSlide>(
  ({ title, description }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'z-10 w-full lg:h-[calc(100vh-theme(spacing.20))] flex flex-col justify-center',
        )}
      >
        <FadeDownOnScroll className="px-6 hidden lg:block" duration={1} delay={0}>
          <div className="lg:text-left self-center text-center relative">
            <div
              className={clsx(
                'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2',
                'w-[750px] z-0 aspect-square rounded-full',
                'bg-white/60 backdrop-blur-sm border border-white/30 shadow-xl',
              )}
            />
            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-headline font-extrabold mb-8 leading-tight relative z-10">
              <span className="relative inline-block text-4xl sm:text-5xl md:text-6xl lg:text-6xl text-primary">
                <span className="relative z-[1] text-primary">{title}</span>
              </span>
            </h1>

            <div className="relative z-[1] text-center text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {typeof description === 'string' ? parse(description) : description}
            </div>
          </div>
        </FadeDownOnScroll>

        <div className="mb-6 p-8 block lg:hidden bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="lg:text-left self-center text-center relative">
            <h1 className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-8 leading-tight relative z-10">
              <span className="relative inline-block text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl">
                <span className="relative z-[1] text-primary">{title}</span>
              </span>
            </h1>

            <div className="relative z-[1] text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {typeof description === 'string' ? parse(description) : description}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
