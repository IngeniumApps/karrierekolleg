'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {chatEntriesLeft, chatEntriesRight} from '../../constants/chatEntries.ts';
import { ArrowLeftIcon } from '../../assets/icons/ArrowLeftIcon.tsx';
import { ArrowRightIcon } from '../../assets/icons/ArrorRightIcon.tsx';

const CARD_SIZE_LG = 365;
const CARD_SIZE_SM = 290;
const BORDER_SIZE = 2;
const ROTATE_DEG = 2.5;
const STAGGER = 15;
const CENTER_STAGGER = -65;

interface Testimonial {
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string;
}

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (pos: number) => void;
  cardSize: number;
}

export const Testimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState<number>(CARD_SIZE_LG);

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() =>
      [...chatEntriesLeft, ...chatEntriesRight].map((entry, i) => ({
      tempId: i,
      testimonial: entry.text,
      by: entry.sender,
      imgSrc: `${import.meta.env.BASE_URL}images/${entry.image}`,
    })),
  );

  const handleMove = (position: number) => {
    const copy = [...testimonials];
    if (position > 0) {
      for (let i = position; i > 0; i--) {
        const first = copy.shift();
        if (!first) return;
        copy.push({ ...first, tempId: Math.random() });
      }
    } else {
      for (let i = position; i < 0; i++) {
        const last = copy.pop();
        if (!last) return;
        copy.unshift({ ...last, tempId: Math.random() });
      }
    }
    setTestimonials(copy);
  };

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const updateSize = () => setCardSize(mq.matches ? CARD_SIZE_LG : CARD_SIZE_SM);
    updateSize();
    mq.addEventListener('change', updateSize);
    return () => mq.removeEventListener('change', updateSize);
  }, []);

  return (
    <div className="relative lg:h-[600px] h-[500px] overflow-x-hidden"
        // style={{ height: SECTION_HEIGHT }}
    >
      {testimonials.map((t, idx) => {
        const position =
          testimonials.length % 2
            ? idx - Math.floor(testimonials.length / 2)
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
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-8">
        <button
          onClick={() => handleMove(-1)}
          aria-label="Vorherige Meinung"
          role="button"
          className="grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-primary hover:text-white"
        >
          <ArrowLeftIcon />
        </button>
        <button
          onClick={() => handleMove(1)}
          aria-label="Nächste Meinung"
          role="button"
          className="mb-6 grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-primary hover:text-white"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isActive = position === 0;

  return (
    <motion.div
      initial={false}
      onClick={() => handleMove(position)}
      //  // class="max-w-7xl z-10 p-8 lg:p-12 mt-12 mb-24 rounded-2xl shadow-xl border border-white/30 bg-white/60 backdrop-blur-sm"
      className={`absolute left-1/2 top-1/2 cursor-pointer border-primary p-8 text-black transition-colors duration-500 rounded-2xl ${
        isActive ? 'z-10 bg-white' : 'z-0 shadow-xl border border-white/30 bg-white backdrop-blur-sm'
      }`}
      style={{
        borderWidth: BORDER_SIZE,
      }}
      animate={{
        width: cardSize,
        height: cardSize,
        x: `calc(-50% + ${position * (cardSize / 1.5)}px)`,
        y: `calc(-50% + ${isActive ? CENTER_STAGGER : position % 2 ? STAGGER : -STAGGER}px)`,
        rotate: isActive ? 0 : position % 2 ? ROTATE_DEG : -ROTATE_DEG,
      }}
      transition={{
        type: 'spring',
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
    >
      <img
        src={testimonial.imgSrc}
        alt={`Portrait von ${testimonial.by}`}
        className="mb-4 h-14 w-12 bg-neutral-600 object-cover object-top rounded-md"
        style={{ boxShadow: isActive ? '3px 3px 0px #fff' : 'none' }}
      />
      <h3 className={`text-sm sm:text-xl ${isActive ? 'text-gray-900' : 'text-black'}`}>
        &quot;{testimonial.testimonial}&quot;
      </h3>
      <p
        className={`absolute bottom-8 left-8 right-8 mt-2 text-sm font-bold ${
          isActive ? 'text-gray-900' : 'text-neutral-700'
        }`}
      >
        – {testimonial.by}
      </p>
    </motion.div>
  );
};
