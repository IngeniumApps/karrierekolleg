'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';

type Props = {
    name: string;
    topic: string;
    school: string;
    link: string;
    color: string;
    image: string;
};

export default function CollegeCardOptional({
                                        name,
                                        topic,
                                        school,
                                        link,
                                        color,
                                        image,
                                    }: Props) {
    return (
        <motion.a
            href={link}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="group block w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            aria-label={`Mehr erfahren über ${name} an der ${school}`}
        >
            {/* 📸 Bild */}
            <div className="relative">
                <img
                    src={image}
                    alt={`Symbolbild für ${topic}`}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
                {/* 🏷 Farb-Badge */}
                <span
                    className={clsx(
                        "absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full shadow transition-colors duration-300 group-hover:brightness-110",
                        color,
                        color === "bg-ortwein" ? "text-gray-800" : "text-white"
                    )}
                >
          {topic}
        </span>
            </div>

            {/* 📄 Textbereich */}
            <div className={`bg-white backdrop-blur-md h-full p-5 rounded-b-2xl`}>
                <h3 className="text-lg font-bold mb-1">{name}</h3>
                <p className="text-sm text-gray-600">{school}</p>
            </div>
        </motion.a>
    );
}