import { motion, useMotionValueEvent, useTransform } from "framer-motion";
import {useEffect, useState} from "react";
import type { MotionValue } from "framer-motion";

export default function ImageScrollSlider({
                                              images,
                                              progressList,
                                          }: {
    images: string[];
    progressList: MotionValue<number>[];
}) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Berechne Bildindex abhängig vom Scrollfortschritt
    //const imgIndex = useTransform(scrollYProgress, [0, 1], [0, images.length - 1]);

    useEffect(() => {
        const unsubscribes = progressList.map((progress, i) =>
            progress.on("change", (v) => {
                if (v > 0.5) {
                    setActiveIndex(i);
                }
            })
        );

        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
    }, [progressList]);

    const x = `-${activeIndex * 100}%`;

    // const x = useTransform(imgIndex, (index) => `-${Math.round(index) * 100}%`);
    //
    // useMotionValueEvent(imgIndex, "change", (latest) => {
    //     setActiveIndex(Math.round(latest));
    // });

    return (
        <div className="absolute inset-0 overflow-hidden z-10 rounded-xl">
            <motion.div
                className="flex h-full w-full"
                style={{ x }}
                transition={{
                    type: "spring",
                    mass: 3,
                    stiffness: 300,
                    damping: 40,
                }}
            >
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="w-full h-full shrink-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${img})`,
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}
