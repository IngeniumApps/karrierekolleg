import {motion, useMotionValue, useScroll, useTransform} from "framer-motion";
import {forwardRef, useRef} from "react";
import {whatIsCollegData} from "../../constants/whatIsCollegData.ts";
import UnderlineBrush from "@components/visual/animation/UnderlineBrush.tsx";
import clsx from "clsx";
import type {MotionValue} from "motion";
import FadeDownOnScroll from "@components/visual/animation/FadeDownOnScroll.tsx";

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

export default function WhatIsCollegScroller() {
    const {ref: targetRefIndex1, scrollYProgress: scrollProgressIndex1} = useScrollYProgress();
    const {ref: targetRefIndex2, scrollYProgress: scrollProgressIndex2} = useScrollYProgress();

    const scrollProgressIndex0 = useMotionValue(1);

    return (
        <>
            <section>
                <div className="hidden lg:block h-screen sticky top-0 right-0 w-[50vw] ml-auto z-10">
                    <div className="absolute inset-0">
                        {/* mask */}
                        {whatIsCollegData.map((item, index) => {
                            return (
                                <WipeContainer
                                    key={index}
                                    alt={item.alt}
                                    imageUrl={`${item.image}`}
                                    scrollYProgress={index === 0 ? scrollProgressIndex0 : index === 1 ? scrollProgressIndex1 : scrollProgressIndex2 }
                                />
                            );
                        })}
                    </div>
                    <div className="absolute bottom-0 left-0 -translate-x-1/2 z-20 h-[60px]">
                        <div className="bg-white text-primary font-bold border border-primary
                        px-8 py-4 rounded-full shadow-md text-center text-sm animate-bounce pointer-events-none">
                            ↓ Scroll weiter
                        </div>
                    </div>
                </div>

                <div className="lg:-mt-[100vh]">
                    {whatIsCollegData.map((item, index) => {
                        return (
                            <>
                                <FadeDownOnScroll className="z-10" duration={1} delay={1}>
                                    <WhatIsCollegSection
                                        key={index}
                                        {...item}
                                        ref={index === 1 ? targetRefIndex1 : index === 2 ? targetRefIndex2 : null}
                                    />
                                </FadeDownOnScroll>
                            </>
                        )
                    })}
                </div>
            </section>

            <DummyContent/>
        </>
    );
}

const WhatIsCollegSection = forwardRef<HTMLDivElement, (typeof whatIsCollegData)[number]>(
    ({title, description, classNames, image, alt}, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(`z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 h-full min-h-screen lg:pt-36 pt-26`,
                    //classNames.container
                )}
            >
                <div className="flex flex-col h-full min-h-0 overflow-hidden justify-center px-6">
                    <div className="lg:text-left self-center text-center">
                        <h1 className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-8 leading-tight text-gray-900">
                            <span className="relative inline-block text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="relative z-[1] text-primary">{title}</span>
              <UnderlineBrush
                  className="hidden lg:block absolute left-0 bottom-0 z-0 w-full"
                  fillColor="#BBF451"
                  bottomOffset={8}
              />
            </span>
                        </h1>

                        <p className="relative z-[1] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        );
    });

const WipeContainer = ({
                           alt,
                           imageUrl,
                           scrollYProgress
                       }: {
    alt: string;
    imageUrl: string;
    scrollYProgress: MotionValue<number>;
}) => {

    const transformedMask = useTransform(scrollYProgress, [0, 1], ["100% 0%", "100% 100%"]);

    return (
        <motion.div className={clsx(
            "absolute inset-0",
            "[mask-image:linear-gradient(rgba(0,0,0,1),rgba(0,0,0,1))]",
            "bg-white",
            "[mask-size:100%_0%]",
            "[mask-position:center_bottom]",
            "[mask-repeat:no-repeat]"
        )}
                    style={{
                        maskSize: transformedMask
                    }}>
            <img src={`${import.meta.env.BASE_URL}images/${imageUrl}`} alt={alt} className="w-full h-full object-cover"/>
        </motion.div>
    )
}