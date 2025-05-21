'use client'

import { motion } from 'framer-motion'

interface ChatBubbleProps {
    sender: string
    time: string
    text: string
    position?: string // z.B. "top-[15%] left-[5%]" oder "bottom-[20%] right-[10%]"
    delay?: number
    scale?: number
    image: string
}

const chatVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.3 + i * 0.3, duration: 0.5 },
    }),
}

export default function HeroChatBubble({
                                           sender,
                                           time,
                                           text,
                                           position = 'top-0 left-0',
                                           delay = 0,
                                           scale = 0.95,
                                           image
                                       }: ChatBubbleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, scale }}
            transition={{ delay, duration: 0.4 }}
            className={`absolute ${position} z-20`}
        >
            <div className="flex items-start gap-2">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={`/images/${image}`}
                    alt={`${sender} Avatar`}
                />
                <div className="flex flex-col w-full max-w-[220px] p-2 border border-gray-200 bg-white/70 backdrop-blur-md rounded-e-xl rounded-es-xl shadow-sm">
                    <div className="flex items-center space-x-1">
                        <span className="text-[10px] font-semibold">{sender}</span>
                        <span className="text-[10px] text-gray-500">{time}</span>
                    </div>
                    <p className="text-xs py-1">{text}</p>
                    <span className="text-[10px] text-gray-400">Zugestellt</span>
                </div>
            </div>
        </motion.div>
    )
}