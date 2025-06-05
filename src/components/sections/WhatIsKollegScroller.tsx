import {useMotionValue, useScroll} from 'framer-motion';
import {forwardRef, useRef} from 'react';
import {whatIsCollegData} from '../../constants/whatIsCollegData.ts';
import UnderlineBrush from '@components/visual/animation/UnderlineBrush.tsx';
import clsx from 'clsx';
import FadeDownOnScroll from '@components/visual/animation/FadeDownOnScroll.tsx';
import {chatEntriesLeft, chatEntriesRight} from '../../constants/chatEntries.ts';
import HeroChatBubble from '@components/visual/HeroChatBubbles.tsx';
import HeroLeftContent from '@components/visual/HeroLeftContent.tsx';
import type {Slide} from '../../constants/whatIsCollegData.ts';
import ImageScrollSlider from '@components/visual/animation/ImageScrollSlider.tsx';
import {useIsDesktop} from '../../hooks/useIsDesktop.ts';

type CollegSlide = Extract<Slide, { kind: 'colleg' }>;

const useScrollYProgress = () => {
    const ref = useRef(null);
    /* ["start end", "end end"]:
          - scrollProgress starts when the start of the target meets end of the container.
          - scrollProgress ends when the end of the target meets end of the container.
      */
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ['start end', 'end end'],
    });

    return {scrollYProgress, ref};
};

export default function WhatIsKollegScroller({className}: { className?: string }) {
    const scrollProgressIndex0 = useMotionValue(1);
    const {ref: targetRefIndex1, scrollYProgress: scrollProgressIndex1} = useScrollYProgress();
    const {ref: targetRefIndex2, scrollYProgress: scrollProgressIndex2} = useScrollYProgress();
    const {ref: targetRefIndex3, scrollYProgress: scrollProgressIndex3} = useScrollYProgress();
    const isDesktop = useIsDesktop();

    return (
        <div className={className}>
            {/* Wrapper for the same edge + 2 Spalten */}
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-5">
                {/* Left Text-Column  */}
                <div className="">
                    {whatIsCollegData.map((item, index) => (
                        <div key={index} className="z-10">
                            {item.kind === 'hero' ? (
                                /* Slide #1 – special Hero-Text */
                                <>
                                    {/* Hide on mobile */}
                                    <FadeDownOnScroll
                                        duration={1}
                                        delay={0}
                                        className="hidden lg:flex z-10 w-full h-[calc(100vh-theme(spacing.20))] flex-col justify-center px-6"
                                    >
                                        <HeroLeftContent/>
                                    </FadeDownOnScroll>
                                    {/* Show on mobile */}
                                    <div
                                        className="flex lg:hidden z-10 w-full h-[calc(100vh-theme(spacing.20))] flex-col justify-center px-6">
                                        <HeroLeftContent/>
                                    </div>
                                </>
                            ) : (
                                /* Slides #2–#4 – normal Kolleg-Markup */
                                <WhatIsKollegSection
                                    {...item}
                                    ref={
                                        index === 1
                                            ? targetRefIndex1
                                            : index === 2
                                                ? targetRefIndex2
                                                : index === 3
                                                    ? targetRefIndex3
                                                    : null
                                    }
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* 2️⃣  Right Sticky-Column  */}
                <div className="hidden lg:block z-10">
                    <div className="sticky top-20 h-[calc(100vh-theme(spacing.20))]">
                        {/* Animate Images */}
                        {isDesktop && (
                            <>
                                <ImageScrollSlider
                                    progressList={[
                                        scrollProgressIndex0,
                                        scrollProgressIndex1,
                                        scrollProgressIndex2,
                                        scrollProgressIndex3,
                                    ]}
                                    images={whatIsCollegData.map((i) => `${import.meta.env.BASE_URL}images/${i.image}`)}
                                />

                                {/* Circle */}
                                <div
                                    className="absolute bottom-[60px] w-[500px] h-[500px] rounded-full bg-[#1b95cc33]"/>

                                {/* Chat-Bubbles */}
                                <HeroChatBubble position="top-[50%] left-0" delayOffset={0} entries={chatEntriesLeft}/>
                                <HeroChatBubble position="bottom-[60px] right-0" delayOffset={1500}
                                                entries={chatEntriesRight}/>

                                {/* Scroll-Hint */}
                                <div className="absolute bottom-0 left-0 -translate-x-1/2 -ml-[0.625rem] h-[60px]">
                                    <div
                                        className="px-8 py-4 text-sm animate-bounce pointer-events-none">
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
    ({title, description, classNames}, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    '' + 'z-10 w-full h-[calc(100vh-theme(spacing.20))] flex flex-col justify-center',
                    // Background color for debugging purposes
                    // classNames.container
                )}
            >
                {/* Fade-In Animation Desktop */}
                <FadeDownOnScroll className="px-6 hidden lg:block" duration={1} delay={0}>
                    <div className="lg:text-left self-center text-center">
                        <h1 className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-8 leading-tight">
              <span className="relative inline-block text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl">
                <span className="relative z-[1] text-primary">{title}</span>
                <UnderlineBrush
                    className="hidden lg:block absolute left-0 bottom-0 z-0 w-full"
                    fillColor="#BBF451"
                    bottomOffset={8}
                />
              </span>
                        </h1>

                        <p className="relative z-[1] text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            {description}
                        </p>
                    </div>
                </FadeDownOnScroll>

                {/* No Fade-In Animation Mobile */}
                <div className="px-6 block lg:hidden">
                    <div className="lg:text-left self-center text-center">
                        <h1 className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-8 leading-tight">
              <span className="relative inline-block text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl">
                <span className="relative z-[1] text-primary">{title}</span>
                <UnderlineBrush
                    className="hidden lg:block absolute left-0 bottom-0 z-0 w-full"
                    fillColor="#BBF451"
                    bottomOffset={8}
                />
              </span>
                        </h1>

                        <p className="relative z-[1] text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        );
    },
);
