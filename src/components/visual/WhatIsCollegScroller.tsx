import {motion, useMotionValue, useMotionValueEvent, useScroll, useTransform} from "framer-motion";
import {forwardRef, useRef, useState} from "react";
import {whatIsCollegData} from "../../constants/whatIsCollegData.ts";
import UnderlineBrush from "@components/visual/animation/UnderlineBrush.tsx";
import clsx from "clsx";
import FadeDownOnScroll from "@components/visual/animation/FadeDownOnScroll.tsx";
import {chatEntriesLeft, chatEntriesRight} from "../../constants/chatEntries.ts";
import HeroChatBubble from "@components/visual/HeroChatBubbles.tsx";
import HeroLeftContent from "@components/visual/HeroLeftContent.tsx";
import type {Slide} from "../../constants/whatIsCollegData.ts";
import ImageScrollSlider from "@components/visual/animation/ImageScrollSlider.tsx";

type CollegSlide = Extract<Slide, { kind: 'colleg' }>;

const DummyContent = () => {
    return (
        <div className="h-screen bg-gray-500 border-2">
        </div>
    );
}

const useScrollYProgress = () => {
    const ref = useRef(null)
    /* ["start end", "end end"]:
        - scrollProgress starts when the start of the target meets end of the container.
        - scrollProgress ends when the end of the target meets end of the container.
    */
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    })

    return {scrollYProgress, ref}
}

export default function WhatIsCollegScroller({className}: { className?: string }) {
    const scrollProgressIndex0 = useMotionValue(1);
    const {ref: targetRefIndex1, scrollYProgress: scrollProgressIndex1} = useScrollYProgress();
    const {ref: targetRefIndex2, scrollYProgress: scrollProgressIndex2} = useScrollYProgress();
    const {ref: targetRefIndex3, scrollYProgress: scrollProgressIndex3} = useScrollYProgress();

    const [activeIndex, setActiveIndex] = useState(0);

    useMotionValueEvent(scrollProgressIndex1, "change", (v) => {
        if (v > 0.5) setActiveIndex(1);
    });
    useMotionValueEvent(scrollProgressIndex2, "change", (v) => {
        if (v > 0.5) setActiveIndex(2);
    });
    useMotionValueEvent(scrollProgressIndex3, "change", (v) => {
        if (v > 0.5) setActiveIndex(3);
    });

    return (
        <div className={className}>
            {/* Wrapper sorgt für gleiche Ränder + 2 Spalten */}
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-5">

                {/* 1️⃣  Linke Text-Spalte  */}
                <div className="">
                    {whatIsCollegData.map((item, index) => (
                        <FadeDownOnScroll key={index} className="z-10" duration={1} delay={1}>
                            {item.kind === 'hero' ? (
                                /* Slide #1 – spezieller Hero-Text */
                                <div className="z-10 w-full h-[calc(100vh-theme(spacing.20))] flex flex-col justify-center px-6">
                                    <HeroLeftContent />
                                </div>
                            ) : (
                                /* Slides #2–#4 – normales Colleg-Markup */
                                <WhatIsCollegSection
                                    {...item}
                                    ref={
                                        index === 1 ? targetRefIndex1 :
                                            index === 2 ? targetRefIndex2 :
                                                index === 3 ? targetRefIndex3 : null
                                    }
                                />
                            )}
                        </FadeDownOnScroll>
                    ))}
                </div>

                {/* 2️⃣  Rechte Sticky-Spalte  */}
                <div className="hidden lg:block z-10">
                    <div className="sticky top-20 h-[calc(100vh-theme(spacing.20))]">

                        {/* Mask-Bilder */}
                        <ImageScrollSlider
                            progressList={[
                                scrollProgressIndex0,
                                scrollProgressIndex1,
                                scrollProgressIndex2,
                                scrollProgressIndex3,
                            ]}
                            images={whatIsCollegData.map((i) => `${import.meta.env.BASE_URL}images/${i.image}`)}
                        />

                        {/* 🔵 Kreis */}
                        <div className="absolute bottom-[60px] w-[500px] h-[500px] rounded-full bg-[#1b95cc33]" />

                        {/* 💬 Chat-Bubbles */}
                        <HeroChatBubble position="top-[50%] left-0" delayOffset={0}  entries={chatEntriesLeft} />
                        <HeroChatBubble position="bottom-[60px] right-0" delayOffset={1500} entries={chatEntriesRight} />

                        {/* Scroll-Hint */}
                        <div className="absolute bottom-0 left-0 -translate-x-1/2 -ml-[0.625rem] h-[60px]">
                            <div className="
                          px-8 py-4 text-sm animate-bounce
                          pointer-events-none">
                                ↓ Scroll weiter
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

const WhatIsCollegSection = forwardRef<HTMLDivElement, CollegSlide>(
    ({title, description, classNames}, ref) => {
        return (
            <div
                ref={ref}
                className={clsx("" +
                    "z-10 w-full h-[calc(100vh-theme(spacing.20))] flex flex-col justify-center",
                    // Backgroundcolor for debugging purposes
                    // classNames.container
                )}
            >
                <div className="px-6">
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
    });