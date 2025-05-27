import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeDownOnScroll from "@components/visual/animation/FadeDownOnScroll.tsx";

export const Benefits = () => {
    return (
        <div className="bg-white">
            <TextParallaxContent
                imgUrl="https://images.unsplash.com/photo-1584697964403-e3f4b4142956?auto=format&fit=crop&w=2560&q=80"
                subheading="Lorem ipsum dolor sit amet"
                heading="USP 1"
            >
                <FadeDownOnScroll>
                    <ExampleContent
                        title="USP 1"
                        paragraphs={[
                            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
                            "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                        ]}
                    />
                </FadeDownOnScroll>
            </TextParallaxContent>

            <TextParallaxContent
                imgUrl="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=2560&q=80"
                subheading="Lorem ipsum dolor sit amet"
                heading="USP 2"
            >
                <FadeDownOnScroll>
                    <ExampleContent
                        title="USP 2"
                        paragraphs={[
                            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
                            "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                        ]}
                    />
                </FadeDownOnScroll>
            </TextParallaxContent>

            <TextParallaxContent
                imgUrl="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=2560&q=80"
                subheading="Lorem ipsum dolor sit amet"
                heading="USP 3"
            >
                <FadeDownOnScroll>
                    <ExampleContent
                        title="USP 3"
                        paragraphs={[
                            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
                            "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                        ]}
                    />
                </FadeDownOnScroll>
            </TextParallaxContent>
        </div>
    );
};

const IMG_PADDING = 12;


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
            <div className="relative h-[150vh]">
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

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <motion.div
            style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: `calc(100vh - ${IMG_PADDING * 2}px)`,
                top: IMG_PADDING,
                scale,
            }}
            ref={targetRef}
            className="sticky z-0 overflow-hidden rounded-3xl"
        >
            <motion.div
                className="absolute inset-0 bg-neutral-950/70"
                style={{ opacity }}
            />
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
    const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

    return (
        <motion.div
            style={{ y, opacity }}
            ref={targetRef}
            className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
        >
            <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
                {subheading}
            </p>
            <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
        </motion.div>
    );
};

interface ExampleContentProps {
    title: string;
    paragraphs: string[];
}


const ExampleContent = ({ title, paragraphs }: ExampleContentProps) => (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
        <h2 className="col-span-1 text-3xl font-bold md:col-span-4">{title}</h2>
        <div className="col-span-1 md:col-span-8">
            {paragraphs.map((text, idx) => (
                <p
                    key={idx}
                    className="mb-4 text-xl text-neutral-600 md:text-2xl last:mb-8"
                >
                    {text}
                </p>
            ))}
        </div>
    </div>
);