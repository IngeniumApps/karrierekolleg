import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { chatEntriesLeft } from "../../constants/chatEntries.ts";
import {ArrowLeftIcon} from "../../assets/icons/ArrowLeftIcon.tsx";
import {ArrowRightIcon} from "../../assets/icons/ArrorRightIcon.tsx"; // Pfad ggf. anpassen

const CARD_SIZE_LG = 365;
const CARD_SIZE_SM = 290;

const BORDER_SIZE = 2;
const CORNER_CLIP = 50;
const CORNER_LINE_LEN = Math.sqrt(CORNER_CLIP ** 2 + CORNER_CLIP ** 2);

const ROTATE_DEG = 2.5;
const STAGGER = 15;
const CENTER_STAGGER = -65;
const SECTION_HEIGHT = 600;

export const Testimonials = () => {
    const [cardSize, setCardSize] = useState(CARD_SIZE_LG);

    // 💬 Statt TESTIMONIAL_DATA: Mapping aus deinen chatEntries
    const [testimonials, setTestimonials] = useState(() =>
        chatEntriesLeft.map((entry, i) => ({
            tempId: i,
            testimonial: entry.text,
            by: entry.sender,
            imgSrc: `/images/${entry.image}`, // falls Bilder in /public/images/
        }))
    );

    const handleMove = (position) => {
        const copy = [...testimonials];
        if (position > 0) {
            for (let i = position; i > 0; i--) {
                const firstEl = copy.shift();
                if (!firstEl) return;
                copy.push({ ...firstEl, tempId: Math.random() });
            }
        } else {
            for (let i = position; i < 0; i++) {
                const lastEl = copy.pop();
                if (!lastEl) return;
                copy.unshift({ ...lastEl, tempId: Math.random() });
            }
        }
        setTestimonials(copy);
    };

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 640px)");
        const setSize = () => setCardSize(mq.matches ? CARD_SIZE_LG : CARD_SIZE_SM);
        setSize();
        mq.addEventListener("change", setSize);
        return () => mq.removeEventListener("change", setSize);
    }, []);

    return (
        <div
            className="relative w-full overflow-hidden"
            style={{height: SECTION_HEIGHT}}
        >
            <div className="absolute inset-0 z-0 backdrop-glass"></div>
            {testimonials.map((t, idx) => {
                const position = testimonials.length % 2
                    ? idx - (testimonials.length + 1) / 2
                    : idx - testimonials.length / 2;

                return (
                    <TestimonialCard
                        key={t.tempId}
                        testimonial={t}
                        handleMove={handleMove}
                        position={position}
                        cardSize={cardSize}
                    />
                );
            })}

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-8">
                <button
                    onClick={() => handleMove(-1)}
                    className="grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-accent hover:text-black"
                >
                    {/* ← */}
                    <ArrowLeftIcon/>
                </button>
                <button
                    onClick={() => handleMove(1)}
                    className="grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-accent hover:text-black"
                >
                    {/* → */}
                    <ArrowRightIcon/>
                </button>
            </div>
        </div>
    );
};

const TestimonialCard = ({position, testimonial, handleMove, cardSize }) => {
    const isActive = position === 0;

    return (
        <motion.div
            initial={false}
            onClick={() => handleMove(position)}
            className={`absolute left-1/2 top-1/2 cursor-pointer border-primary p-8 text-black transition-colors duration-500 rounded-4xl ${
                isActive ? "z-10 bg-primary" : "z-0 bg-white"
            }`}
            style={{
                borderWidth: BORDER_SIZE,
            }}
            animate={{
                width: cardSize,
                height: cardSize,
                x: `calc(-50% + ${position * (cardSize / 1.5)}px)`,
                y: `calc(-50% + ${
                    isActive ? CENTER_STAGGER : position % 2 ? STAGGER : -STAGGER
                }px)`,
                rotate: isActive ? 0 : position % 2 ? ROTATE_DEG : -ROTATE_DEG,
            }}
            transition={{
                type: "spring",
                mass: 3,
                stiffness: 400,
                damping: 50,
            }}
        >
            <img
                src={testimonial.imgSrc}
                alt={`Bild von ${testimonial.by}`}
                className="mb-4 h-14 w-12 bg-neutral-600 object-cover object-top rounded-md"
                style={{
                    boxShadow: isActive ? "3px 3px 0px #fff" : "none",
                }}
            />
            <h3
                className={`text-base sm:text-xl ${
                    isActive ? "text-white" : "text-black"
                }`}
            >
                "{testimonial.testimonial}"
            </h3>
            <p
                className={`absolute bottom-8 left-8 right-8 mt-2 text-sm font-bold italic ${
                    isActive ? "text-accent" : "text-neutral-700"
                }`}
            >
                – {testimonial.by}
            </p>
        </motion.div>
    );
};