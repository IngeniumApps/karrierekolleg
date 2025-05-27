import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeDownOnScroll from "@components/visual/animation/FadeDownOnScroll.tsx";

export const Benefits = () => {
    return (
        <div className="relative w-full bg-transparent overflow-hidden">

            {/* 🔮 Gradient-Hintergrund */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(ellipse at top right, #1b95cc44, transparent 90%)",
                    willChange: "transform",
                }}
            />

            {/* 🧊 Glass-Overlay */}
            <div className="absolute inset-0 z-0 backdrop-glass" />

            {/* 💡 Inhalt */}
            <div className="relative z-10">
                <TextParallaxContent
                    imgUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2560&q=80"
                    subheading="Lorem ipsum dolor sit amet"
                    heading="USP 1"
                >
                    <FadeDownOnScroll duration={1}>
                        <ExampleContent
                            title="USP 1"
                            paragraphs={[
                                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
                                "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum.",
                            ]}
                        />
                    </FadeDownOnScroll>
                </TextParallaxContent>

                <TextParallaxContent
                    imgUrl="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=2560&q=80"
                    subheading="Lorem ipsum dolor sit amet"
                    heading="USP 2"
                >
                    <FadeDownOnScroll duration={1}>
                        <ExampleContent
                            title="USP 2"
                            paragraphs={[
                                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
                                "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum.",
                            ]}
                        />
                    </FadeDownOnScroll>
                </TextParallaxContent>

                <TextParallaxContent
                    imgUrl="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=2560&q=80"
                    subheading="Lorem ipsum dolor sit amet"
                    heading="USP 3"
                >
                    <FadeDownOnScroll duration={1}>
                        <ExampleContent
                            title="USP 3"
                            paragraphs={[
                                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
                                "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum.",
                            ]}
                        />
                    </FadeDownOnScroll>
                </TextParallaxContent>
            </div>
        </div>
    );
};

const IMG_PADDING = 0;

interface TextParallaxContentProps {
    imgUrl: string;
    subheading: string;
    heading: string;
    children: React.ReactNode;
}

const TextParallaxContent = ({
                                 imgUrl,
                                 subheading,
                                 heading,
                                 children,
                             }: TextParallaxContentProps) => {
    return (
        <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
            <div className="relative h-[100vh]">
                <StickyImage imgUrl={imgUrl} />
                <OverlayCopy heading={heading} subheading={subheading} />
            </div>
            {children}
        </div>
    );
};

interface StickyImageProps {
    imgUrl: string;
}

const StickyImage = ({ imgUrl }: StickyImageProps) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "9999px"]);

    return (
        <motion.div
            ref={targetRef}
            style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: `calc(100vh - ${IMG_PADDING * 2}px)`,
                top: IMG_PADDING,
                scale,
                borderRadius
            }}
            className="sticky z-0 overflow-hidden shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.3)]"
        >
            {/* Farbverlauf: Übergang von Bild ins Blau des Headers */}
            <motion.div
                className="absolute inset-0 z-10"
                style={{
                    background: `linear-gradient(to top, rgba(44,111,160,0.6), rgba(44,111,160,0.9))`,
                    opacity,
                }}
            />
            {/* Lesbarkeit auf kleinen Screens */}
            <div className="absolute inset-0 md:hidden bg-black/40 z-0" />
        </motion.div>
    );
};

interface OverlayCopyProps {
    subheading: string;
    heading: string;
}

const OverlayCopy = ({ subheading, heading }: OverlayCopyProps) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
    const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [1, 1, 1]);

    return (
        <motion.div
            style={{ y, opacity }}
            ref={targetRef}
            className="absolute left-0 top-0 z-20 flex h-screen w-full flex-col items-center justify-center text-white px-4"
        >
            <p className="mb-2 text-center text-xl tracking-wide text-accent md:mb-4 md:text-3xl">
                {subheading}
            </p>
            <p className="text-center text-4xl font-bold tracking-tight  drop-shadow-lg md:text-7xl">
                {heading}
            </p>
        </motion.div>
    );
};

interface ExampleContentProps {
    title: string;
    paragraphs: string[];
}

const ExampleContent = ({ title, paragraphs }: ExampleContentProps) => (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 pb-24 pt-12 md:grid-cols-12">
        <h2 className="col-span-1 text-3xl font-bold md:col-span-4">{title}</h2>
        <div className="col-span-1 md:col-span-8">
            {paragraphs.map((text, idx) => (
                <p
                    key={idx}
                    className="mb-6 text-base sm:text-lg md:text-xl leading-relaxed last:mb-0 max-w-2xl"
                >
                    {text}
                </p>
            ))}
        </div>
    </div>
);