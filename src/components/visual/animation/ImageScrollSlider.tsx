import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { MotionValue } from "framer-motion";

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

        const unsubscribes = progressList.map((progress) =>
            progress.on("change", updateIndex)
        );

        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
    }, [progressList]);

    return (
        <div className="absolute inset-0 overflow-hidden z-10 rounded-xl">
            <div className="relative w-full h-full">
                {images.map((img, idx) => (
                    // <motion.div
                    //     key={idx}
                    //     className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                    //     style={{
                    //         backgroundImage: `url(${img})`,
                    //         opacity: activeIndex === idx ? 1 : 0,
                    //     }}
                    //     transition={{ duration: 3, ease: "easeInOut" }}
                    // />
                    <picture>
                        <source media="(max-width: 1023px)" srcSet="" />
                        <motion.img
                            key={idx}
                            src={img}
                            alt=""
                            loading="eager"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                            style={{ opacity: activeIndex === idx ? 1 : 0 }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                        />
                    </picture>
                ))}
            </div>
        </div>
    );
}
